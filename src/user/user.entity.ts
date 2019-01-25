import { Entity, OneToOne, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Post } from '../post/post.entity';
import { Profile } from '../user/profile.entity';

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

  @OneToOne(type => Profile, profile => profile.user)
  profile: Profile;

  @Column({type: "datetime", default: Date})
  created: Date;

  @OneToMany(type => Post; post => post.user)
  posts: Post[];
}
