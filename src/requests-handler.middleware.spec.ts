import { RequestsHandlerMiddleware } from './requests-handler.middleware';

describe('RequestsHandlerMiddleware', () => {
  it('should be defined', () => {
    expect(new RequestsHandlerMiddleware()).toBeDefined();
  });
});
