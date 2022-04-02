import { forwardRef, Module } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { NotifyController } from './notify.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notify } from 'src/entities/notify.entity';
import { Comment } from 'src/entities/comment.entity';
import { UserModule } from '../user/user.module';
import { VideoModule } from '../video/video.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notify, Comment]),
    UserModule,
    forwardRef(() => VideoModule),
  ],
  controllers: [NotifyController],
  providers: [NotifyService],
  exports: [NotifyService],
})
export class NotifyModule {}
