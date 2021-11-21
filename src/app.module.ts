import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegisterMiddleware } from './middlewares/register.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { UserController } from './modules/user/user.controller';
import { UserModule } from './modules/user/user.module';
import { VideoModule } from './modules/video/video.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '0000',
    database: 'live',
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
  }), UserModule, VideoModule,AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RegisterMiddleware)
      .exclude({ path: 'user/create', method: RequestMethod.POST })
      .forRoutes(UserController);
      
  }
}
