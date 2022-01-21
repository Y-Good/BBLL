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

const date = moment(new Date()).format("YYYY-MM-DD");
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService, private readonly videoService: VideoService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post('upload')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'video', maxCount: 1 }, { name: 'cover', maxCount: 1 }],
    {
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          let filePath: string;
          if (file.fieldname == 'video') {
            filePath = join(__dirname, '../../../public', `videos/${date}`);
          } else if (file.fieldname == 'cover') {
            filePath = join(__dirname, '../../../public', `covers/${date}`);
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
  uploadVideo(
    @UploadedFiles() files: { video: Express.Multer.File, cover: Express.Multer.File },
    @Body() createVideoDto: CreateVideoDto) {
      
    createVideoDto.url = `${date}/${files.video[0].filename}`;
    createVideoDto.cover = `${date}/${files.cover[0].filename}`;
    this.videoService.create(createVideoDto);
    // return files.video;
    // return {
    //   "path": date + '/' + files.video.filename,
    //   "name": file.filename
    // }

  }
}
