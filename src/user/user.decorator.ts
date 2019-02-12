
import { createRouteParamDecorator } from '@nestjs/common';

export const UserDC = createRouteParamDecorator((data, request) => {
  return data ? request.user[data] : request.user;
});
