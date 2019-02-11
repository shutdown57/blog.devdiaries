import { Entity, OneToMany, Column,
         PrimaryGeneratedColumn,
         UpdateDateColumn, CreateDateColumn
       } from 'typeorm';

import { Role } from './role.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  guest: string;
}
