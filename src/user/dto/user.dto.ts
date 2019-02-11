import { IsNotEmpty } from 'class-validator';

export class UserDTO {

  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly password: string;
}

export class UserRO {
  id: string;
  username: string;
  created: Date;
  updated: Date;
  token?: string;
}
