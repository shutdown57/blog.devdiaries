import { Controller, Get,
         Param, Post,
         Body, Delete } from '@nestjs/common';

import { PostService } from './post.service';
import { CreatePostDTO } from './dto/create-post.dto';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Get()
    async getPosts() {
        const posts = await this.postService.getPosts();
        return posts;
    }

    @Get(':postID')
    async getPost(@Param('postID') postID) {
        const post = await this.postService.getPost(postID);
        return post;
    }

    @Post()
    async addPost(@Body() createPostDTO: CreatePostDTO) {
        const post = await this.postService.addPost(createPostDTO);
        return post;
    }

    @Delete(':postID')
    async deletePost(@Param('postID') postID) {
        const posts = await this.postService.deletePost(postID);
        return posts;
    }
}
