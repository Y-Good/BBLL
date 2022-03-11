import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notify } from 'src/entities/notify.entity';
import { Comment } from 'src/entities/comment.entity';
import { Brackets, Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { VideoService } from '../video/video.service';
import { NotifyType } from 'src/common/enums/notify.enum';

@Injectable()
export class NotifyService {
  constructor(
    @InjectRepository(Notify)
    private readonly notifyRepository: Repository<Notify>,
    @Inject(forwardRef(() => VideoService))
    private readonly videoServide: VideoService,
    private readonly userServide: UserService,
  ) {}

  async create(
    userId: number,
    videoId?: number,
    comment?: Comment,
    type?: NotifyType,
  ) {
    let notify = new Notify();
    let video = await this.videoServide.getVideoInfo(videoId);
    let fromUser = await this.userServide.getProfile(userId);
    notify.fromUser = fromUser;
    notify.video = video;
    notify.type = type;
    if (comment != null) {
      notify.comment = comment;
    }
    return this.notifyRepository.save(notify);
  }

  async findAll(userId: number) {
    return await this.notifyRepository
      .createQueryBuilder('notify')
      .leftJoinAndSelect('notify.fromUser', 'fromUser')
      .leftJoinAndSelect('notify.video', 'video')
      .leftJoinAndSelect('video.user', 'user1')
      .leftJoinAndSelect('notify.comment', 'comment')
      .leftJoinAndSelect('comment.user', 'user2')
      .where('fromUser.id!=:userId', { userId: userId })
      .andWhere(
        new Brackets((qb) => {
          qb.where('user1.id=:userId', { userId: userId }).orWhere(
            'user2.id=:userId',
            { userId: userId },
          );
        }),
      )
      .addSelect('notify.createDate')
      .orderBy('notify.createDate', 'DESC')
      .getMany();
  }
}
