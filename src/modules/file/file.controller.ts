import { Body, Controller, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import * as multer from 'multer';
import { join, extname, basename } from 'path';
import * as moment from 'moment';
import { checkDirAndCreate } from 'src/utils/file.utils';
import { VideoService } from '../video/video.service';
import { CreateVideoDto } from '../video/dto/create-video.dto';
import { AuthGuard } from '@nestjs/passport';
import { nanoid } from 'nanoid';
import { UpdateUserDto } from '../user/dto/update-user.dto';

const date = moment(new Date()).format("YYYY-MM-DD");
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService, private readonly videoService: VideoService) { }

  @Post('upload')
  @UseInterceptors(FileFieldsInterceptor(
    [
      { name: 'video', maxCount: 1 },
      { name: 'cover', maxCount: 1 },
      { name: 'avatar', maxCount: 1 }
    ],
    {
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          let filePath: string;
          if (file.fieldname == 'video') {
            filePath = join(__dirname, '../../../public', `videos/${date}`);
          } else if (file.fieldname == 'cover') {
            filePath = join(__dirname, '../../../public', `covers/${date}`);
          } else if (file.fieldname == 'avatar') {
            filePath = join(__dirname, '../../../public', `avatars/${date}`);
          }
          checkDirAndCreate(filePath);
          return cb(null, filePath)
        },
        filename: (req, file, cb) => {
          return cb(null, nanoid(16) + extname(file.originalname));
        },
      }),
    }
  ))
  uploadAll(
    @UploadedFiles() files: {
      video: Express.Multer.File,
      cover: Express.Multer.File,
      avatar: Express.Multer.File,
    },
    @Body() dto: UpdateUserDto) {
      console.log(files.avatar[0].path);
      
  //  return files.avatar.path;

  }
}
