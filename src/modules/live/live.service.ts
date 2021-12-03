import { Injectable } from '@nestjs/common';
import { CreateLiveDto } from './dto/create-live.dto';
import { UpdateLiveDto } from './dto/update-live.dto';
import * as NodeMediaServer from 'node-media-server';
import { liveConfig } from 'src/config/live.config';
@Injectable()
export class LiveService {
  create(createLiveDto: CreateLiveDto) {
    return 'This action adds a new live';
  }

  findAll() {
    return `This action returns all live`;
  }


  startLiveService(){
    let nms = new NodeMediaServer(liveConfig);
    nms.run();
  }
}
