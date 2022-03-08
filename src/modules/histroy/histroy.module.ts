import { Module } from '@nestjs/common';
import { HistroyService } from './histroy.service';
import { HistroyController } from './histroy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Histroy } from 'src/entities/histroy.entity';
import { Video } from 'src/entities/video.entity';
import { UserModule } from '../user/user.module';
import { VideoModule } from '../video/video.module';

@Module({
  imports: [TypeOrmModule.forFeature([Histroy,Video]), UserModule, VideoModule],
  controllers: [HistroyController],
  providers: [HistroyService],
})
export class HistroyModule {}
