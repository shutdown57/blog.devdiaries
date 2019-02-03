import { Entity, Column, ManyToOne,
         PrimaryGeneratedColumn,
         CreateDateColumn,
         UpdateDateColumn
       } from 'typeorm';

import { User } from '../user/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 255})
  slug: string;

  @Column({length: 255})
  title: string;

  @Column({type: 'text'})
  body: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(type => User, user => user.posts)
  user: User;
}
