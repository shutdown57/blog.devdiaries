import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from './post.entity';
import { PostDTO, PostRO } from './dto/post.dto';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) { }

  async index(): Promise<PostRO[]> {
    return await this.postRepository.find();
  }

  async show(postID: string): Promise<PostRO> {
    const post = await this.postRepository.findOne({ id: postID });
    if (!post) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return post;
  }

  async create(post): Promise<PostRO[]> {
    const newPost = new Post();
    newPost.title = post.title;
    newPost.body = post.body;
    newPost.user = post.user;
    newPost.slug = post.slug;
    await this.postRepository.save(newPost);
    return await this.postRepository.find();
  }

  async update(id: string, data: Partial<PostDTO>): Promise<PostRO> {
    let post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    await this.postRepository.update({ id }, data);
    post = await this.postRepository.findOne({ where: { id } });
    return post;
  }

  async delete(id: string): Promise<PostRO> {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    await this.postRepository.delete(post);
    return post;
  }
}
