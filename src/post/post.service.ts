import { Injectable, HttpException } from '@nestjs/common';

import { Posts } from '../mocks/post.mock';

@Injectable()
export class PostService {
    posts = Posts;

    getPosts(): Promise<any> {
        return new Promise(resolver => {
            resolve(this.posts);
        });
    }

    getPost(postID): Promise<any> {
        let id = Number(postID);
        return new Promise(resolver => {
            const post = this.posts.find(post => post.id === id);
            if (!post) {
                throw new HttpException('Post does not exists!', 404);
            }
            resolve(post);
        });
    }

    addPost(post): Promise<any> {
        return new Promise(resolver => {
            this.posts.push(post);
            resolve(this.posts);
        });
    }

    deletePost(postID): Promise<any> {
        let id = Number(postID);
        return new Promise(resolver => {
            let index = this.posts.findIndex(post => post.id === id);
            if (index === -1) {
                throw new HttpException('Post does not exists!', 404);
            }
            this.posts.splice(1, index);
            resolve(this.posts);
        });
    }
}
