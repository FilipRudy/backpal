import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignUpDto } from './dto/sign-up.dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto/sign-in.dto';
import { AuthType } from './enums/auth-type.enum';
import { Auth } from './decorators/auth.decorator';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { VerifyUserDto } from './dto/verify-user.dto';
import { RecoverPasswordDto } from './dto/recover-password.dto';
import { ResendActivationEmailDto } from './dto/resend-activation-email.dto';
@Auth(AuthType.None)
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(
    @Res({ passthrough: true }) response: Response,
    @Body() signInDto: SignInDto,
  ) {
    return this.authService.signIn(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-tokens')
  refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('verify-user')
  verifyUser(@Query() verifyUserDto: VerifyUserDto) {
    return this.authService.verifyUser(verifyUserDto);
  }
  @HttpCode(HttpStatus.OK)
  @Post('recover-user-password')
  recoverUserPassword(@Body() recoverPasswordDto: RecoverPasswordDto) {
    return this.authService.recoverUserPassword(recoverPasswordDto.email);
  }
  @HttpCode(HttpStatus.OK)
  @Post('resend-activation-email')
  resendActivationEmail(
    @Body() resendActivationEmail: ResendActivationEmailDto,
  ) {
    return this.authService.resendActivationEmail(resendActivationEmail.email);
  }
}
