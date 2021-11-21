import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
  }), UserModule, VideoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
