import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import * as moment from 'moment';
import { VideoService } from '../video/video.service';
import * as MAO from 'multer-aliyun-oss';
import { AllowAnon } from 'src/common/decorators/allow-anon.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ReqUser } from 'src/common/interfaces/req-user.interface';
import { FileType } from 'src/common/enums/file.enum';
import { UserService } from '../user/user.service';
const date = moment(new Date()).format("YYYY-MM-DD");
@Controller('file')
export class FileController {
  constructor(private readonly userService: UserService, private readonly videoService: VideoService) { }

  @Post('upload')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'avatar', maxCount: 1 },
    { name: 'video', maxCount: 1 },
    { name: 'cover', maxCount: 1 }],
    {
      storage: MAO({
        config: {
          accessKeyId: "LTAI5tEG4Xi9GReTZc7mWs8V",
          accessKeySecret: "OyWgqeFNLyJtkEwI3GJCZIT9VBbr6x",
          region: "oss-cn-beijing",
          bucket: "nmsbnmsbmsjcllm"
        },
        destination: (req, file, cb) => {
          let fileType: string;
          switch (file.fieldname) {
            case FileType.AVATAR:
              fileType = FileType.AVATAR;
              break;
            case FileType.COVER:
              fileType = FileType.COVER;
              break;
            default:
              fileType = FileType.VIDEO;
              break;
          }
          cb(null, fileType);
        }
      })
    })
  )
  async uploadAll(@UploadedFiles() files: {
    avatar: Express.Multer.File,
    video: Express.Multer.File,
    cover: Express.Multer.File,
  }, @CurrentUser() user: ReqUser) {

    return await this.userService.updateAvatar(files.avatar[0].url, user.id);
    // return files;
  }
}
