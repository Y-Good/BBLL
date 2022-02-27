import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from 'src/entities/comment.entity';
import { Video } from 'src/entities/video.entity';
import { User } from 'src/entities/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
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
    return this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .where('videoId=:videoId', { videoId: videoId })
      .getMany();
  }

  ///评论
  async create(createCommentDto: CreateCommentDto, userId: number): Promise<boolean> {
    const { videoId, content } = createCommentDto;
    let comment = new Comment();
    let video = await this.videoRepository.findOne(videoId);
    let user = await this.userRepository.findOne(userId);
    comment.content = content;
    comment.video = video;
    comment.user = user;
    let res = await this.commentRepository.save(comment);
    return res != null;
  }

  ///我的评论
  async getMyComment(userId: number) {
    const{comments} =await this.userRepository.findOne({
        relations: ['comments', 'comments.video','comments.user'],
        where: { id: userId },
      });
     return comments;
  }

  ///删除
  async removeComment(commentId: number) {
    if (commentId == null) return false;
    let comment = await this.commentRepository.findOne(commentId);
    let res = await this.commentRepository.remove(comment);
    return res != null;
  }
}
