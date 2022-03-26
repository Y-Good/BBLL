import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserService } from '../user/user.service';
import { VideoService } from '../video/video.service';
import { WsGateway } from './ws.gateway';
@Injectable()
export class WsService {
  constructor(
    // @Inject(forwardRef(() => WsGateway))
    private readonly wsGateway: WsGateway,

    private readonly userService: UserService,
    private readonly videoService: VideoService,
  ) {}
  findOnline() {
    let user = new User();
    user.videos;
    return;
  }
  async getAllRoom() {
    let roomList = [];
    // console.log(this.wsGateway.roomList);

    for (let index = 0; index < this.wsGateway.roomList.length; index++) {
      const e = this.wsGateway.roomList[index];
      if (e != null) {
        let user = await this.userService.getProfile(parseInt(e.userId));
        let video = await this.videoService.getVideoInfo(parseInt(e.videoId));
        roomList.push({ user: user, video: video, room: e.room });
      }
    }
    // this.wsGateway.roomList.forEach(async (e) => {
    //   let user = await this.userService.getProfile(e.userId);
    //   let video = await this.videoService.getVideoInfo(e.videoId);
    //   roomList.push({ user: user, video: video });
    // });

    return roomList;
  }
}
