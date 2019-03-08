import { IsString } from 'class-validator';

export class RoleDTO {

  @IsString()
  name: string;

  @IsString()
  code: number;
}

export class RoleRO {
  id?: string;
  name: string;
  code: number;
  created?: Date;
  updated?: Date;
}
