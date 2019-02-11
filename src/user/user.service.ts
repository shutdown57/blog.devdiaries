import { UserDTO, UserRO } from './dto/user.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async index(): Promise<UserRO[]> {
    const users = await this.userRepository.find();
    return users.map(user => user.toResponseObject(false));
  }

  async show(userID: string): Promise<UserRO> {
    const user = await this.userRepository.findOne({id: userID});
    return user.toResponseObject();
  }

  async register(data: UserDTO): Promise<UserRO> {
    const {username} = data;
    let user = await this.userRepository.findOne({where: {username}});
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    user =  await this.userRepository.create(data);
    await this.userRepository.save(user);
    return user.toResponseObject();
  }

  async login(data: UserDTO) {
    const {username, password} = data;
    const user = await this.userRepository.findOne({where: {username}});
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }
    return user.toResponseObject();
  }

  async delete(userID: string): Promise<UserRO> {
    const user = await this.userRepository.findOne({where: {userID}});
    await this.userRepository.remove(user);
    return user.toResponseObject();
  }
}
