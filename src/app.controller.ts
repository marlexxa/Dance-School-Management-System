import { Controller, Get, HttpException, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard) //it will run local strategy before post request
  @Post('auth/login')
  async login(@Request() request) {
    //return this.authService.login(request.user);
  }
}
