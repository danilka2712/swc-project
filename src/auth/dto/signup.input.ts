import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignupInput {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
