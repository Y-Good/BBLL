import { Module } from '@nestjs/common';
import { CollectService } from './collect.service';
import { CollectController } from './collect.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collect } from 'src/entities/collect.entity';
import { Video } from 'src/entities/video.entity';
import { UserModule } from '../user/user.module';
import { VideoModule } from '../video/video.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Collect, Video]),
    UserModule,
    VideoModule,
  ],
  controllers: [CollectController],
  providers: [CollectService],
  exports: [CollectService]
})
export class CollectModule { }
