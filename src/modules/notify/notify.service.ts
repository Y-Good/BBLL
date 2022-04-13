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
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @Inject(forwardRef(() => VideoService))
    private readonly videoServide: VideoService,
    private readonly userServide: UserService,
  ) {}

  async create(
    userId: number,
    videoId?: number,
    commentId?: number,
    type?: NotifyType,
  ) {
    let notify = new Notify();
    let video = await this.videoServide.getVideoInfo(videoId);
    let fromUser = await this.userServide.getProfile(userId);
    let comment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: ['replyUser', 'user'],
    });

    notify.fromUser = fromUser;
    notify.video = video;
    notify.type = type;
    notify.comment = comment;
    if (type == NotifyType.COMMENT) {
      if (comment.level == 1) {
        notify.toUser = video.user;
      }
      if (comment.level == 2) {
        notify.toUser = comment.replyUser;
      }
    }
    if (type == NotifyType.THUMBUP) {
      if (comment != null) {
        notify.toUser = comment.user;
      } else {
        notify.toUser = video.user;
      }
    }

    return this.notifyRepository.save(notify);
  }

  async findAll(userId: number) {
    return await this.notifyRepository
      .createQueryBuilder('notify')
      .leftJoinAndSelect('notify.fromUser', 'fromUser')
      .leftJoinAndSelect('notify.toUser', 'toUser')
      .leftJoinAndSelect('notify.video', 'video')
      .leftJoinAndSelect('notify.comment', 'comment')
      .where(
        new Brackets((qb) => {
          qb.where(
            new Brackets((qbs) => {
              qbs
                .where('notify.type=:type', { type: NotifyType.COMMENT })
                .andWhere('comment.level!=2');
            }),
          ).orWhere('ISNULL(notify.commentId)');
        }),
      )
      .andWhere('fromUser.id!=:userId', { userId: userId })
      .andWhere('toUser.id=:userId', { userId: userId })
      .addSelect('notify.createDate')
      .orderBy('notify.createDate', 'DESC')
      .getMany();
  }

  //全部标记已读
  markRead(userId: number) {
    this.notifyRepository
      .createQueryBuilder('notify')
      .update()
      .set({ isRead: 1 })
      .where('toUser=:userId', { userId: userId })
      .execute();
  }

  //统计未读
  async unreadCount(userId: number) {
    let res = await this.notifyRepository.find({
      where: { toUser: userId, isRead: 0 },
    });
    return res.length;
  }
}
