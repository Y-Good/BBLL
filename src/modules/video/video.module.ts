import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from 'src/entities/video.entity';
import { User } from 'src/entities/user.entity';
import { jwtContants } from '../auth/jwt.contants';
import { JwtModule } from '@nestjs/jwt';
import { TagModule } from '../tag/tag.module';
import { Tag } from 'src/entities/tag.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Video, User, Tag]), UserModule, JwtModule.register({
    secret: jwtContants.secret,
    signOptions: {
      expiresIn: '30d',
    }
  })],
  controllers: [VideoController],
  providers: [VideoService],
  exports: [VideoService]
})
export class VideoModule { }
