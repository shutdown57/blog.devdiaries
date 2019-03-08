import { IsNotEmpty } from 'class-validator';

export class ProfileDTO {

  @IsNotEmpty()
  name: string;
}

export class ProfileRO {
  id?: string;
  name: string;
}
