import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../user/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 255})
  slug: string;

  @Column({length: 255})
  title: string;

  @Column('text')
  body: string;

  @Column({type: "datetime", default: Date})
  created: Date;

  @Column({type: "datetime", default: Date})
  updated: Date;

  @ManyToOne(type => User, user => user.posts)
  user: User:
}
