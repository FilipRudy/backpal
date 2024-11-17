import {
  Body,
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { HashingService } from '../hashing/hashing.service';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/sign-up.dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import {
  InvalidatedRefreshTokenError,
  RefreshTokenIdsStorage,
} from './refresh-token-ids.storage/refresh-token-ids.storage';
import { randomUUID } from 'crypto';
import { MailerService } from '@nestjs-modules/mailer';
import * as crypto from 'crypto';
import { VerifyUserDto } from './dto/verify-user.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage,
    private readonly mailService: MailerService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    if (signUpDto.repeatPassword !== signUpDto.password) {
      throw new UnauthorizedException('Passwords do not match');
    }
    try {
      let userId;
      let userExists;

      do {
        userId = crypto.randomBytes(12).toString('hex');
        userExists = await this.usersRepository.findOne({
          where: { userId: userId },
        });
      } while (userExists);

      const user = new User();
      user.email = signUpDto.email;
      user.password = await this.hashingService.hash(signUpDto.password);
      user.verificationCode = crypto.randomBytes(32).toString('hex');
      user.isConfirmed = false;
      user.userId = userId;

      const message = `Confirm your email by clicking the link below http://localhost:3001/confirm?code=${user.verificationCode}`;

      await this.usersRepository.save(user);

      await this.mailService.sendMail({
        from: 'Backpal',
        to: signUpDto.email,
        subject: `Confirm your email`,
        text: message,
      });
    } catch (err) {
      //move the error to separate file to reuse it
      const pgUniqueViolationErrorCode = '23505';
      if (err.code === pgUniqueViolationErrorCode) {
        throw new ConflictException();
      }
      throw err;
    }
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.usersRepository.findOneBy({
      email: signInDto.email,
    });
    if (!user) {
      throw new UnauthorizedException('User does not exists');
    }
    if (user.isConfirmed === false) {
      throw new UnauthorizedException(`User's email is not yet verified`);
    }
    const isEqual = await this.hashingService.compare(
      signInDto.password,
      user.password,
    );
    if (!isEqual) {
      throw new UnauthorizedException('Password does not match');
    }

    return await this.generateTokens(user);
  }

  public async generateTokens(user: User) {
    const refreshTokenId = randomUUID();
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(
        user.id,
        this.jwtConfiguration.accessTokenTtl,
        { email: user.email, role: user.role, userId: user.userId },
      ),
      this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl, {
        refreshTokenId,
      }),
    ]);
    await this.refreshTokenIdsStorage.insert(user.id, refreshTokenId);
    return {
      accessToken,
      refreshToken,
    };
  }
  public async verifyUser(verifyUserDto: VerifyUserDto) {
    const user = await this.usersRepository.findOneBy({
      verificationCode: verifyUserDto.verificationCode,
    });

    if (!user || user.isConfirmed === true) {
      return 'verify_fail';
    }

    try {
      user.isConfirmed = true;
      await this.usersRepository.save(user);
      return 'verify_true';
    } catch (err) {
      throw new Error(err);
    }
  }

  async recoverUserPassword(email: string) {
    try {
      const user = await this.usersRepository.findOneBy({
        email: email,
      });
      if (!user) {
        throw new UnauthorizedException('User does not exists');
      }
      if (user.isConfirmed === false) {
        throw new UnauthorizedException(`User's email is not yet verified`);
      }

      const newPassword = crypto.randomBytes(8).toString('hex');
      user.password = await this.hashingService.hash(newPassword);

      await this.usersRepository.save(user);

      const message = `Your new password is: ${newPassword} and we recommend that you change it as fast as possible`;

      await this.mailService.sendMail({
        from: 'Backpal',
        to: email,
        subject: `Recover your password`,
        text: message,
      });
    } catch (err) {
      throw err;
    }
  }
  async resendActivationEmail(email: string) {
    try {
      const user = await this.usersRepository.findOneBy({
        email: email,
      });
      if (!user) {
        throw new UnauthorizedException('User does not exists');
      }
      if (user.isConfirmed) {
        throw new UnauthorizedException('User is already confirmed');
      }

      const message = `Confirm your email by clicking the link below http://localhost:3001/confirm?code=${user.verificationCode}`;

      await this.usersRepository.save(user);

      await this.mailService.sendMail({
        from: 'Backpal',
        to: email,
        subject: `Confirm your email`,
        text: message,
      });
    } catch (err) {
      throw err;
    }
  }

  async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub, refreshTokenId } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, 'sub'> & { refreshTokenId: string }
      >(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });

      const user = await this.usersRepository.findOneByOrFail({ id: sub });
      const isValid = await this.refreshTokenIdsStorage.validate(
        user.id,
        refreshTokenId,
      );
      if (isValid) {
        await this.refreshTokenIdsStorage.invalidate(user.id);
      } else {
        throw new Error('Refresh token is invalid');
      }
      return this.generateTokens(user);
    } catch (err) {
      if (err instanceof InvalidatedRefreshTokenError) {
        throw new UnauthorizedException('Access denied');
      }
      throw new UnauthorizedException();
    }
  }

  private async signToken<T>(userId: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );
  }
}
