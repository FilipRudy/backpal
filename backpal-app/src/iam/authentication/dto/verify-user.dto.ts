import { IsNotEmpty } from 'class-validator';

export class VerifyUserDto {
  @IsNotEmpty()
  verificationCode: string;
}
