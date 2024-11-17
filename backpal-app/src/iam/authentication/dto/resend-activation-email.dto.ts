import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResendActivationEmailDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
