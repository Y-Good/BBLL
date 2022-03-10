import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notify } from 'src/entities/notify.entity';
import { Comment } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { VideoService } from '../video/video.service';
import { NotifyType } from 'src/common/enums/notify.enum';

@Injectable()
export class NotifyService {
  constructor(
    @InjectRepository(Notify)
    private readonly notifyRepository: Repository<Notify>,
    private readonly videoServide: VideoService,
    private readonly userServide: UserService,
  ) {}

  async create(videoId: number, userId: number, comment?: Comment) {
    let notify = new Notify();
    let video = await this.videoServide.getVideoInfo(videoId);
    let fromUser = await this.userServide.getProfile(userId);
    notify.fromUser = fromUser;
    notify.video = video;
    if (comment != null) {
      notify.type = NotifyType.COMMENT;
      notify.comment = comment;
    }
    return this.notifyRepository.save(notify);
  }

  async findAll(userId: number) {
    return await this.notifyRepository
      .createQueryBuilder('notify')
      .leftJoinAndSelect('notify.fromUser', 'fromUser')
      .leftJoinAndSelect('notify.video', 'video')
      .leftJoinAndSelect('video.user', 'user')
      .leftJoinAndSelect('notify.comment', 'comment')
      .where('user.id=:userId', { userId: userId })
      .addSelect('notify.createDate')
      .orderBy('notify.createDate', 'DESC')
      .getMany();
  }
}
