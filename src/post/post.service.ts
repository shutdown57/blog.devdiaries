import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from './post.entity';
import { PostDTO, PostRO } from './dto/post.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  private postToResponseObject(post: Post) {
    const responseObject: any = {
      ...post,
      user: post.user ? post.user.toResponseObject(false) : null,
    };
    return responseObject;
  }

  private ownership(post: Post, userID: string) {
    if (post.user.id !== userID) {
      throw new HttpException('Incorrect User', HttpStatus.UNAUTHORIZED);
    }
  }

  async index(): Promise<PostRO[]> {
    const posts = await this.postRepository.find({ relations: ['user'] });
    if (!posts) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return posts.map(post => this.postToResponseObject(post));
  }

  async show(postID: string): Promise<PostRO> {
    const post = await this.postRepository.findOne({ id: postID });
    if (!post) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return this.postToResponseObject(post);
  }

  async create(userID: string, data: PostDTO): Promise<PostRO> {
    const user = await this.userRepository.findOne({ where: { id: userID } });
    const post = await this.postRepository.create({ ...data, user: user });
    await this.postRepository.save(post);
    return { ...post, user: post.user.toResponseObject(false) };
  }

  async update(id: string, data: Partial<PostDTO>): Promise<PostRO> {
    let post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    await this.postRepository.update({ id }, data);
    post = await this.postRepository.findOne({ where: { id } });
    return this.postToResponseObject(post);
  }

  async delete(id: string): Promise<PostRO> {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    await this.postRepository.delete(post);
    return this.postToResponseObject(post);
  }
}
