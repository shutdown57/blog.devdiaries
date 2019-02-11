import { ValidationPipe } from './../shared/validation.pip';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { Controller, Post, Get, Body, Param, UsePipes } from '@nestjs/common';

@Controller()
export class UserController {

  constructor(private userService: UserService) {}
  @Get('api/user')
  async show(@Param() id: string) {
    return await this.userService.show(id);
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
