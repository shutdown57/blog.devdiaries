import { IsString } from 'class-validator';

export class PostDTO {

  @IsString()
  readonly id: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly body: string;

  @IsString()
  readonly author: string;
}

export class PostRO {
  id: string;
  title: string;
  body: string;
  author?: string;
  created: Date;
  updated: Date;
}
