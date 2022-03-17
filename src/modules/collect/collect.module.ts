import { Module } from '@nestjs/common';
import { CollectService } from './collect.service';
import { CollectController } from './collect.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collect } from 'src/entities/collect.entity';
import { Video } from 'src/entities/video.entity';
import { VideoModule } from '../video/video.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Collect]), VideoModule, UserModule],
  controllers: [CollectController],
  providers: [CollectService],
})
export class CollectModule {}
