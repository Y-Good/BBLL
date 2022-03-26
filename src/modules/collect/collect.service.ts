import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { CollectEnum } from 'src/common/enums/collect.enum';
import { Collect } from 'src/entities/collect.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { VideoService } from '../video/video.service';

@Injectable()
export class CollectService {
  constructor(
    @InjectRepository(Collect)
    private readonly collectRepository: Repository<Collect>,

    private readonly videoService: VideoService,

    private readonly userService: UserService,
  ) {}

  async create(videoId: number, followId: number, userId: number) {
    const user = await this.userService.getProfile(userId);
    const follow = await this.userService.getProfile(followId);
    const video = await this.videoService.getVideoInfo(videoId);
    let collect: Collect;
    if (follow != null) {
      collect = await this.collectRepository.findOne({
        where: { user: userId, follow: followId, type: CollectEnum.USER },
      });
    } else if (videoId != null) {
      collect = await this.collectRepository.findOne({
        where: { user: userId, video: videoId, type: CollectEnum.VIDEO },
      });
    }
    let res: Collect;

    if (collect == null) {
      let newCollect = new Collect();
      newCollect.user = user;
      newCollect.follow = follow;
      newCollect.video = video;
      newCollect.type = follow != null ? CollectEnum.USER : CollectEnum.VIDEO;
      res = await this.collectRepository.save(newCollect);
    } else {
      res = await this.collectRepository.remove(collect);
    }

    return res != null;
  }

  async findByType(type: CollectEnum, userId: number) {
    return await this.collectRepository.find({
      where: { type: type, user: userId },
      relations: [
        type == CollectEnum.USER ? 'follow' : 'video',
        // type == CollectEnum.VIDEO ? 'video.user' : '',
        ...(type == CollectEnum.VIDEO ? ['video.user'] : []),
      ],
    });
  }

  async getIsFollow(followId: number, userId: number) {
    let res = await this.collectRepository.findOne({
      where: { type: CollectEnum.USER, user: userId, follow: followId },
    });
    return res != null;
  }

  ///动态
  async findTrend(day: number, userId: number) {
    let res = [];
    let select = [];
    let collect = await this.collectRepository.find({
      where: { type: CollectEnum.USER, user: userId },
      relations: ['follow', 'follow.videos'],
    });
    for (let index = 0; index < collect.length; index++) {
      const videos = collect[index].follow.videos;
      if (videos.length != 0) {
        for (let i = 0; i < videos.length; i++) {
          //相差天数
          let diffDay = moment(new Date()).diff(
            moment(videos[i].createDate),
            'days',
          );
          //发布视频时间大于关注日期才添加
          if (videos[i].createDate > collect[index].createDate) {
            let user: any;
            if (day != null && diffDay <= day) {
              user = collect[index].follow;
              user.video = videos[i];
              delete user['videos'];
              select.push(user);
            }
            user = collect[index].follow;
            user.video = videos[i];
            delete user['videos'];
            res.push(user);
          }
        }
      }
    }

    return day != null ? select : res;
  }

  /* 数量 */
  async getCount(userId: number) {
    let fans = await this.collectRepository.find({
      where: { follow: userId, type: CollectEnum.USER },
    });
    let follow = await this.collectRepository.find({
      where: { user: userId, type: CollectEnum.USER },
    });

    return { fans: fans.length.toString(), follow: follow.length.toString() };
  }
}
