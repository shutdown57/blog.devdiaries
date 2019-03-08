import { IsString } from 'class-validator';

import { UserRO, UserDTO } from 'src/user/dto/user.dto';

export class PostDTO {

  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsString()
  body: string;

  // @IsString()
  // user: User;
}

export class PostRO {
  id?: string;
  slug: string;
  title: string;
  body: string;
  user?: UserRO;
  created: Date;
  updated: Date;
}
