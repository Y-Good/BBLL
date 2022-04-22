import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from 'src/entities/video.entity';
import { User } from 'src/entities/user.entity';
import { CollectModule } from '../collect/collect.module';

@Module({
  imports: [TypeOrmModule.forFeature([Video, User]), CollectModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule { }
