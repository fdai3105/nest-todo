import { User } from '../../users/entities/user.entity';
import { IsEmail, IsNotEmpty, IsPhoneNumber, Length } from 'class-validator';
import { BeforeInsert } from 'typeorm';
import { hash } from 'typeorm/util/StringUtils';

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
