import { IsNotEmpty } from 'class-validator';

export class UserDTO {

  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly password: string;
}

export class UserRO {
  readonly id: string;
  readonly username: string;
  readonly created: Date;
  readonly updated: Date;
  readonly token?: string;
}
