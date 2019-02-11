import { LoggingInterceptor } from './shared/logging.interceptor';
import { HttpErrorFilter } from './shared/http-error.filter';
import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule],
  controllers: [AppController],
  providers: [AppService, {provide: APP_FILTER, useClass: HttpErrorFilter}, {provide: APP_INTERCEPTOR, useClass: LoggingInterceptor}],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
