import { Controller, Post, Get, Req, Body, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginInput } from "./dto/login.input";
import { SignupInput } from "./dto/signup.input";
import { Public } from "./decorators/public.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("register")
  async signup(@Body() data: SignupInput) {
    const { accessToken, refreshToken } =
      await this.authService.createUser(data);
    return {
      accessToken,
      refreshToken,
    };
  }
  @Public()
  @Post("login")
  async login(@Body() { password, username }: LoginInput) {
    const { accessToken, refreshToken } = await this.authService.login(
      username,
      password,
    );
    return {
      accessToken,
      refreshToken,
    };
  }
  @Get("/profile")
  async profile(@Req() req) {
    return req.user;
  }
}
