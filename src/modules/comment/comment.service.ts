import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from 'src/entities/comment.entity';
import { Video } from 'src/entities/video.entity';
import { User } from 'src/entities/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { NotifyService } from '../notify/notify.service';
import { NotifyType } from 'src/common/enums/notify.enum';
import { CreateSecondCommentDto } from './dto/create-second-comment.dto';
@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly notifyService: NotifyService,
  ) {}

  getCommentList(videoId: number) {
    return this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .where('videoId=:videoId', { videoId: videoId })
      .orderBy('comment.createDate', 'DESC')
      .getMany();
  }

  ///评论
  async create(
    createCommentDto: CreateCommentDto,
    userId: number,
  ): Promise<Comment> {
    const { videoId, content } = createCommentDto;
    let comment = new Comment();
    let video = await this.videoRepository.findOne(videoId);
    let user = await this.userRepository.findOne(userId);
    comment.content = content;
    comment.video = video;
    comment.user = user;
    let res = await this.commentRepository.save(comment);

    ///通知
    this.notifyService.create(userId, videoId, res, NotifyType.COMMENT);
    return res;
  }

  ///我的评论
  async getMyComment(userId: number) {
    // const { comments } = await this.userRepository.findOne({
    //   relations: ['comments', 'comments.video', 'comments.replyUser', 'comments.video.user'],
    //   where: { id: userId },
    // });
    const res = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.comments', 'comments')
      .leftJoinAndSelect('comments.video', 'video')
      .leftJoinAndSelect('comments.replyUser', 'replyUser')
      .leftJoinAndSelect('video.user', 'vuser')
      .addSelect('video.createDate')
      .where('user.id=:userId', { userId: userId })
      .getMany();

    return res[0].comments.reverse();
  }

  ///删除
  async removeComment(commentId: number) {
    if (commentId == null) return false;
    let comment = await this.commentRepository.findOne(commentId);
    let res = await this.commentRepository.remove(comment);
    return res != null;
  }

  ///通知
  async isThumbUpVideo(commentId: number, userId: number) {
    let user = await this.userRepository.findOne(userId, {
      relations: ['thumbUpComment'],
    });
    return user.thumbUpComment.some((comment) => comment.id == commentId);
  }

  ///点赞
  async thumbUp(commentId: number, userId: number) {
    try {
      let user = await this.userRepository.findOne(userId);
      let comment = await this.commentRepository.findOne(commentId, {
        relations: ['users'],
      });

      if (comment.users.length > 0) {
        comment.users.map((e, index) => {
          if (e.id == userId) comment.users.splice(index, 1);
        });
      } else {
        this.notifyService.create(userId, null, comment, NotifyType.THUMBUP);
        comment.users.push(user);
      }
      ///很辣鸡的统计
      comment.thumbUpCount = comment.users.length;
      let res = await this.commentRepository.save(comment);
      /* 有问题 */
      return res != null;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  ///erji
  async createSecondComment(secondDto: CreateSecondCommentDto, userId: number) {
    let user = await this.userRepository.findOne(userId);
    let video = await this.videoRepository.findOne(secondDto.videoId);
    let parent = await this.commentRepository.findOne(secondDto.parentId, {
      relations: ['secondComment'],
    });
    let comment = new Comment();
    comment.content = secondDto.content;
    comment.user = user;
    comment.level = 2;
    comment.video = video;
    let res = await this.commentRepository.save(comment);
    parent.secondComment.push(res);
    this.notifyService.create(
      userId,
      secondDto.videoId,
      comment,
      NotifyType.THUMBUP,
    );
    this.commentRepository.save(parent);
  }

  ///二级评论查询
  async findSecondComment(parentId: number) {
    let res = await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.secondComment', 'second')
      .leftJoinAndSelect('second.user', 'user')
      .where('comment.id=:id', { id: parentId })
      .orderBy('second.createDate', 'DESC')
      .getMany();
    let comment = await this.commentRepository.findOne(parentId);
    comment.replyCount = res[0].secondComment.length;
    return res[0].secondComment;
  }
}
