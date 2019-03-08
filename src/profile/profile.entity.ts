import {
  Entity, OneToOne, Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn, CreateDateColumn,
} from 'typeorm';

import { User } from '../user/user.entity';

@Entity('profile')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 50 })
  family: string;

  @Column({ length: 120, unique: true })
  email: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @OneToOne(type => User, user => user.profile)
  user: User;
}
