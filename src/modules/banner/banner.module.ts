import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from 'src/entities/video.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Video])],
  controllers: [BannerController],
  providers: [BannerService],
})
export class BannerModule {}
