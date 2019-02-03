import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';

import { PostController } from './post.controller';
import { PostService } from './post.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { Post } from './post.entity';
// import { Posts } from '../mocks/post.mock';

describe('Post Controller', () => {
    let controller: PostController;
    // let posts = Posts;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PostController],
            providers: [PostService]
        }).compile();

        controller = module.get<PostController>(PostController);
    });

    describe('getPosts', () => {
        it('should return "5 posts with ID, title, body and author"', async () => {
          expect(await controller.getPosts()).toBe(Array);
        });
    });

    describe('getPost', () => {
        it('should return "fisrt post with ID 1"', async () => {
            // const post = posts.find(post => post.id === 1);
            expect(await controller.getPost(1)).toBe(typeof Post);
        });
    });

    describe('addPost', () => {
        it('should return "all post after adding one post"', async () => {
            let newPost = {
                id: 6,
                title: "Post 6",
                body: "Body of post 6",
                author: "Majid Mohamadi"
            };
            // let allPosts = posts.push(newPost);
          expect(await controller.addPost(newPost)).toBe(typeof Object);
        });
    });

    describe('deletePost', () => {
        it('should return "deleted post', async () => {
            let postID = 5;
            expect(await controller.deletePost(postID)).toBe(typeof Object);
        });
    });
});
