import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import * as moment from 'moment';
import { join } from 'path';

const date = moment(new Date()).format("YYYY-MM-DD");

@Injectable()
export class FileService {
    async saveVideo(file:any){        
        const writeImage = createWriteStream(join(__dirname, '..',`../../public/videos/${date}`, `${file.originalname}`))
        writeImage.write(file.buffer)
    }
}
