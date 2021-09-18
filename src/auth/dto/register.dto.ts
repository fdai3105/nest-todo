import { IsEmail, IsNotEmpty, IsPhoneNumber, Length } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @Length(8)
  pass: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  readonly phone: string;
}
