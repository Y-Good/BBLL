import { Module } from '@nestjs/common';
import { CollectService } from './collect.service';
import { CollectController } from './collect.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collect } from 'src/entities/collect.entity';
import { Video } from 'src/entities/video.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Collect,Video])],
  controllers: [CollectController],
  providers: [CollectService]
})
export class CollectModule {}
