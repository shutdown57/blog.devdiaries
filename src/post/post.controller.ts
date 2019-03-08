import {
  Controller, Get,
  Param, Post,
  Body, Delete, UsePipes, Put, UseGuards
} from '@nestjs/common';

import { PostService } from './post.service';
import { PostDTO } from './dto/post.dto';
import { ValidationPipe } from './../shared/validation.pip';
import { AuthGuard } from 'src/shared/auth.guard';
import { UserDC } from '../user/user.decorator';

@Controller('api/post')
export class PostController {
  constructor(
    private readonly postService: PostService,
  ) { }

  @Get()
  async index() {
    const posts = await this.postService.index();
    return posts;
  }

  @Get(':postID')
  async show(@Param('postID') postID) {
    const post = await this.postService.show(postID);
    return post;
  }

  @Post()
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  async create(@UserDC('id') user, @Body() data: PostDTO) {
    const post = await this.postService.create(user, data);
    return post;
  }

  @Put(':id')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() data: Partial<PostDTO>) {
    return await this.postService.update(id, data);
  }

  @Delete(':postID')
  async delete(@Param('postID') postID) {
    const posts = await this.postService.delete(postID);
    return posts;
  }
}
