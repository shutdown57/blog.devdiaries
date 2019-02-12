
import { createParamDecorator } from '@nestjs/common';

export const UserDC = createParamDecorator((data, request) => {
  return data ? request.user[data] : request.user;
});
