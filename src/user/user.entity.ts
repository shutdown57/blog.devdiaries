import {
  Entity, OneToOne, Column,
  PrimaryGeneratedColumn, OneToMany,
  UpdateDateColumn, CreateDateColumn, BeforeInsert, ManyToOne,
} from 'typeorm';

import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { Post } from '../post/post.entity';
import { Profile } from '../profile/profile.entity';
import { Role } from 'src/role/role.entity';
import { UserRO } from './dto/user.dto';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 16 })
  username: string;

  @Column({ length: 32 })
  password: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @OneToMany(type => Post, post => post.user)
  posts: Post[];

  @OneToOne(type => Profile, profile => profile.user, { cascade: true })
  profile: Profile;

  @ManyToOne(type => Role, role => role.name)
  role: Role;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  toResponseObject(showToken: boolean = true): UserRO {
    const { id, created, username, updated, token } = this;
    const responseObject: UserRO = { id, username, created, updated };
    if (showToken) {
      responseObject.token = token;
    }
    return responseObject;
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

  private get token(): string {
    const { id, username } = this;
    return jwt.sign({ id, username }, process.env.SECRET, { expiresIn: '7d' });
  }

  async getRole(): Promise<string> {
    return '';
  }
}
