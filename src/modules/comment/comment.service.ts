import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from 'src/entities/comment.entity';
import { Video } from 'src/entities/video.entity';
import { User } from 'src/entities/user.entity';
@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

   getCommentList(videoId: number) {
    return  this.videoRepository
      .createQueryBuilder('video')
      .leftJoinAndSelect('video.comments', 'comments')
      .leftJoinAndSelect('comments.user', 'user')
      .where('video.id=:videoId', { videoId: videoId })
      .getManyAndCount()
  }

  ///评论
  async create(dto: any, userId: number) {
    let comment = new Comment();
    let video = await this.videoRepository.findOne(dto.videoId);
    let user = await this.userRepository.findOne(userId);
    comment = dto;
    comment.video = video;
    comment.user = user;
    return await this.commentRepository.save(comment);
  }

}
