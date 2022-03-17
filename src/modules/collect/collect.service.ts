import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CollectEnum } from 'src/common/enums/collect.enum';
import { Collect } from 'src/entities/collect.entity';
import { Video } from 'src/entities/video.entity';
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
    console.log(collect == null);

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
      relations: [type == CollectEnum.USER ? 'follow' : 'video'],
    });
  }
}
