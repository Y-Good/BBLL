import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterMiddleware } from './common/middlewares/register.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { FileModule } from './modules/file/file.module';
import { VideoModule } from './modules/video/video.module';
import { CommentModule } from './modules/comment/comment.module';
import { CollectModule } from './modules/collect/collect.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/auth.guard';
import { TagModule } from './modules/tag/tag.module';
import { WsModule } from './modules/ws/ws.module';
import { CategoryModule } from './modules/category/category.module';
import { HistroyModule } from './modules/histroy/histroy.module';
import { NotifyModule } from './modules/notify/notify.module';
import { BannerModule } from './modules/banner/banner.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    VideoModule,
    AuthModule,
    FileModule,
    CommentModule,
    CollectModule,
    TagModule,
    WsModule,
    CategoryModule,
    HistroyModule,
    NotifyModule,
    BannerModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RegisterMiddleware)
      .forRoutes({ path: 'user/create', method: RequestMethod.POST });
  }
}
