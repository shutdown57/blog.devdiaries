import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from './post.entity';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository()
    private readonly postRepository: Repository<Post>,
  ) {}

  async getPosts(): Promise<Post[]> {
    return await this.postRepository.find();
  }

  async getPost(postID): Promise<Post> {
    let id = Number(postID);
    return await this.postRepository.findOne({id: id});
  }

  async addPost(post): Promise<Post> {
    let newPost = new Post();
    newPost.title = post.title;
    newPost.body = post.body;
    newPost.user = post.user;
    newPost.slug = post.slug;
    await this.postRepository.save(newPost);
    return await this.postRepository.find();
  }

  async deletePost(postID): Promise<Post> {
    let id = Number(postID);
    let post = await this.postRepository.findOne({id: id});
    await this.postRepository.remove(post);
    return await this.postRepository.find();
  }
}
