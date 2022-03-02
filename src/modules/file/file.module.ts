import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { VideoModule } from '../video/video.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [VideoModule, UserModule],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule { }
