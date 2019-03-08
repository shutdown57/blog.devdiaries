import { IsNotEmpty } from 'class-validator';

import { PostRO } from '../../post/dto/post.dto';
import { RoleRO } from '../../role/dto/role.dto';
import { ProfileRO } from '../../profile/dto/profile.dto';

export class UserDTO {

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

export class UserRO {
  id?: string;
  username: string;
  created: Date;
  updated: Date;
  token?: string;
  posts?: PostRO[];
  profile?: ProfileRO;
  role?: RoleRO;
}
