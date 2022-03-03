import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Video } from 'src/entities/video.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtContants } from '../auth/jwt.contants';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Video]),
    JwtModule.register({
      secret: jwtContants.secret,
      signOptions: {
        expiresIn: '30d',
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
