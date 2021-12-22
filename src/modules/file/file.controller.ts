import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import * as multer from 'multer';
import { join } from 'path';
import * as moment from 'moment';
import { checkDirAndCreate } from 'src/utils/file.utils';
const date = moment(new Date()).format("YYYY-MM-DD");
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('video', {
    storage: multer.diskStorage({
      // destination:join(__dirname,'..',`../../public/videos/${date}`),
      destination: (req, file, cb) => {
        // if (file)
        const filePath = join(__dirname, '..', `../../public/videos/${date}`);
        checkDirAndCreate(filePath);
        return  cb(null, filePath)
      },
      filename: (req, file, cb) => {
       return  cb(null, file.originalname);
      },
    }),
  }))
  uploadVideo(@UploadedFile() file: any) {
    console.log(file);
    return file;
    // this.fileService.saveVideo(file);
  }
}
