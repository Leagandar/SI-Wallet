import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly surname: string;

  @IsNotEmpty()
  readonly username: string;

  @IsEmail()
  readonly email: string;
  
  @IsNotEmpty()
  password: string;
}