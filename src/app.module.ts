import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterMiddleware } from './middlewares/register.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { FileModule } from './modules/file/file.module';
import { VideoModule } from './modules/video/video.module';


@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, VideoModule, AuthModule, FileModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RegisterMiddleware)
      .forRoutes({ path: 'user/create', method: RequestMethod.POST });
  }
}
