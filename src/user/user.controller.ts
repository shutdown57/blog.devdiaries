import { Controller, Post, Get, Body, Param, UsePipes, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'src/shared/auth.guard';
import { UserDC } from './user.decorator';
import { ValidationPipe } from './../shared/validation.pip';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {

  constructor(private userService: UserService) {}
  @Get('api/user/:id')
  @UseGuards(new AuthGuard())
  async show(@Param() id: string) {
    return await this.userService.show(id);
  }

  @Get('api/user')
  @UseGuards(new AuthGuard())
  async index(@UserDC() user) {
    return await this.userService.index();
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() data: UserDTO) {
    return await this.userService.login(data);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() data: UserDTO) {
    return await this.userService.register(data);
  }
}
