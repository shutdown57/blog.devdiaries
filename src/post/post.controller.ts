import {
  Controller, Get,
  Param, Post,
  Body, Delete, UsePipes, Put
} from '@nestjs/common';

import { PostService } from './post.service';
import { PostDTO } from './dto/post.dto';
import { ValidationPipe } from './../shared/validation.pip';

@Controller('api/post')
export class PostController {
  constructor(private readonly postService: PostService) { }

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
  @UsePipes(new ValidationPipe())
  async create(@Body() data: PostDTO) {
    const post = await this.postService.create(data);
    return post;
  }

  @Put(':id')
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
