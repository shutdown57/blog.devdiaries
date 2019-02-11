import {
  Entity, OneToMany, Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn, CreateDateColumn,
} from 'typeorm';

import { User } from '../user/user.entity';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({length: 8})
  name: string;

  @Column()
  code: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @OneToMany(type => User, user => user.role)
  users: User[];
}
