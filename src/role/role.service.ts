import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from './role.entity';
import { RoleRO, RoleDTO } from './dto/role.dto';
import { userRoles } from './role.seed';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) { }

  async indexRole(): Promise<RoleRO[]> {
    const roles = await this.roleRepository.find();
    if (!roles) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return roles;
  }

  async indexUser() { }

  async show(name: string): Promise<RoleRO> {
    const role = await this.roleRepository.findOne({ where: { name } });
    if (!role) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return role;
  }

  async create(data: RoleDTO): Promise<RoleRO> {
    let role = await this.roleRepository.findOne({ where: { name: data.name } });
    if (role) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }
    role = await this.roleRepository.create(data);
    await this.roleRepository.save(role);
    return role;
  }

  async seed() {
    for (let i = 0; i < userRoles.length; i++) {
      if (this.roleRepository.findOne({ where: { name: userRoles[i].name } })) {
        continue;
      }
      let role = await this.roleRepository.create(userRoles[i]);
      await this.roleRepository.save(role);
    }
  }
}
