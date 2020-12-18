import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsEmail()
  readonly email: string;
  
  @IsNotEmpty()
  password: string;
}