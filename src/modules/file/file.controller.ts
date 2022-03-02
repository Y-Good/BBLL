import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import * as moment from 'moment';
import { VideoService } from '../video/video.service';
import * as MAO from 'multer-aliyun-oss';
import { AllowAnon } from 'src/common/decorators/allow-anon.decorator';
const date = moment(new Date()).format("YYYY-MM-DD");
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService, private readonly videoService: VideoService) { }

  @Post('upload')
  @AllowAnon()
  @UseInterceptors(FileInterceptor('file', {
    storage: MAO({
      config: {
        accessKeyId: "LTAI5tEG4Xi9GReTZc7mWs8V",
        accessKeySecret: "OyWgqeFNLyJtkEwI3GJCZIT9VBbr6x",
        region: "oss-cn-beijing",
        bucket: "nmsbnmsbmsjcllm"
      },
      destination: (req, file, cb) => {
        cb(null, 'avatar');
      }
    })
  })
  )
  uploadAll(@UploadedFile('file') files: any,) {
    console.log(files);
    return files;
  }
}
