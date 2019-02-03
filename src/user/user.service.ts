import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUser(userID): Promise<User> {
    let id = Number(userID);
    return await this.userRepository.findOne({id: id});
  }

  async addUser(user): Promise<User> {
    let newUser = new User();
    newUser.name = user.name;
    newUser.family = user.family;
    newUser.email = user.email;
    newUser.password = user.password;
    await this.userRepository.save(newUser);
    return await this.userRepository.findOne({email: newUser.email});
  }

  async deleteUser(userID): Promise<User> {
    let id = Number(userID);
    let user = await this.userRepository.findOne({id: id});
    await this.userRepository.remove(user);
    return user;
  }
}
