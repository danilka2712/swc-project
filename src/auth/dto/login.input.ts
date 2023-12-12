import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginInput {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
