import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { VideoService } from '../video/video.service';
import * as MAO from 'multer-aliyun-oss';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ReqUser } from 'src/common/interfaces/req-user.interface';
import { FileType } from 'src/common/enums/file.enum';
import { UserService } from '../user/user.service';
import { CreateVideoDto } from '../video/dto/create-video.dto';
import { join, extname } from 'path';
import * as moment from 'moment';
import { checkDirAndCreate } from 'src/utils/file.utils';
import * as multer from 'multer';
import * as crypto from 'crypto';
const date = moment(new Date()).format('YYYY-MM-DD');
@Controller('file')
export class FileController {
  constructor(
    private readonly userService: UserService,
    private readonly videoService: VideoService,
  ) {}

  @Post('upload')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'avatar', maxCount: 1 },
        { name: 'video', maxCount: 1 },
        { name: 'cover', maxCount: 1 },
      ],
      {
        storage: multer.diskStorage({
          destination: (req, file, cb) => {
            let filePath: string;
            let dir: string = `${file.fieldname}s/${date}`;
            filePath = join('public', dir);
            checkDirAndCreate(filePath);
            return cb(null, filePath);
          },
          filename: (req, file, cb) => {
            crypto.pseudoRandomBytes(16, function (err, raw) {
              cb(
                err,
                err
                  ? undefined
                  : `${raw.toString('hex')}${extname(file.originalname)}`,
              );
            });
          },
        }),
        // storage: MAO({
        //   config: {
        //     accessKeyId: 'LTAI5tEG4Xi9GReTZc7mWs8V',
        //     accessKeySecret: 'OyWgqeFNLyJtkEwI3GJCZIT9VBbr6x',
        //     region: 'oss-cn-beijing',
        //     bucket: 'nmsbnmsbmsjcllm',
        //   },
        //   destination: (req, file, cb) => {
        //     let fileType: string;
        //     switch (file.fieldname) {
        //       case FileType.AVATAR:
        //         fileType = FileType.AVATAR;
        //         break;
        //       case FileType.COVER:
        //         fileType = FileType.COVER;
        //         break;
        //       default:
        //         fileType = FileType.VIDEO;
        //         break;
        //     }
        //     cb(null, fileType);
        //   },
        // }),
      },
    ),
  )
  async uploadAll(
    @UploadedFiles()
    files: {
      avatar: Express.Multer.File;
      video: Express.Multer.File;
      cover: Express.Multer.File;
    },
    @Body() createVideoDto: CreateVideoDto,
    @CurrentUser() user: ReqUser,
  ) {
    let file: Express.Multer.File;
    let filePath = {} as any;
    Object.keys(files).forEach((key) => {
      if (files[key] != null) {
        file = files[key];
        let filepath: string = file[0].path.replace(/\\/g, '/');
        let index = filepath.indexOf('/');
        filePath[key] = filepath.substring(index);
      }
    });
    if (file[0].fieldname == FileType.AVATAR) {
      return await this.userService.updateAvatar(filePath.avatar, user.id);
    } else {
      createVideoDto.cover = filePath.cover;
      createVideoDto.url = filePath.video;
      return await this.videoService.create(createVideoDto, user.id);
    }
  }
}
