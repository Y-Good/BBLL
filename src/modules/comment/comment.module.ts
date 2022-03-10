import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { Video } from 'src/entities/video.entity';
import { User } from 'src/entities/user.entity';
import { NotifyModule } from '../notify/notify.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Video, User]), NotifyModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
