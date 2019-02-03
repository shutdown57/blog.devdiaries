import { Entity, OneToOne, Column,
         PrimaryGeneratedColumn, OneToMany,
         UpdateDateColumn, CreateDateColumn
       } from 'typeorm';

import { Post } from '../post/post.entity';
// import { Profile } from '../user/profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 30})
  name: string;

  @Column({length: 50})
  family: string;

  @Column({length: 120, unique: true})
  email: string;

  @Column({length: 32})
  password: string;

  // @OneToOne(type => Profile, profile => profile.user)
  // profile: Profile;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @OneToMany(type => Post, post => post.user)
  posts: Post[];
}
