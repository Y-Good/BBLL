import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { OmitType } from '@nestjs/mapped-types';
import { InjectRepository } from '@nestjs/typeorm';
import { NotifyType } from 'src/common/enums/notify.enum';
import { Tag } from 'src/entities/tag.entity';
import { User } from 'src/entities/user.entity';
import { Video } from 'src/entities/video.entity';
import { Repository } from 'typeorm';
import { NotifyService } from '../notify/notify.service';
import { CreateVideoDto } from './dto/create-video.dto';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @Inject(forwardRef(() => NotifyService))
    private readonly notifyService: NotifyService,
  ) {}

  async create(createVideoDto: CreateVideoDto, id: number) {
    let tags: Tag[] = [];
    let user = await this.userRepository.findOne(id);
    createVideoDto.user = user;
    const { tags: oldTag, ...newDto } = createVideoDto;
    if (createVideoDto.tags != null) {
      tags = await this.tagRepository.findByIds(createVideoDto.tags);
    }

    let video = { tags, ...newDto };
    return await this.videoRepository.save(video);
  }

  async findAll(): Promise<Video[]> {
    return await this.videoRepository
      .createQueryBuilder('video')
      .leftJoinAndSelect('video.user', 'user')
      .leftJoinAndSelect('video.tags', 'tags')
      .leftJoinAndSelect('video.users', 'users')
      .addSelect('video.createDate')
      .getMany();
  }

  // async update(vid: number, upId: number, updateVideoDto: UpdateVideoDto) {
  //   let video = await this.videoRepository.findOne({ where: [{ id: vid }, { upId: upId }] });
  //   return await this.videoRepository.save(video);
  // }

  ///点赞
  async thumbUp(videoId: number, userId: number) {
    try {
      let user = await this.userRepository.findOne(userId);
      let video = await this.videoRepository.findOne(videoId, {
        relations: ['users'],
      });
      ///有人点赞
      if (video.users.length > 0) {
        // 判断是否点赞
        let isExist = video.users.some((user) => user.id == userId);
        let index = video.users.indexOf(user);
        if (isExist) {
          this.notifyService.create(userId, videoId, null, NotifyType.THUMBUP);
          video.users.push(user);
        } else {
          video.users.splice(index, 1);
        }
      } else {
        //通知
        this.notifyService.create(userId, videoId, null, NotifyType.THUMBUP);
        video.users.push(user);
      }
      video.thumbUp = video.users.length.toString();
      let res = await this.videoRepository.save(video);
      /* 有问题 */
      return res != null;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  ///点赞列表
  async getThumbUpList(videoId: number) {
    return await this.videoRepository.findOne({
      relations: ['users'],
      where: { id: videoId },
    });
  }

  ///wode 是否点赞
  async isThumbUpVideo(videoId: number, userId: number) {
    let user = await this.userRepository.findOne(userId, {
      relations: ['thumbUpVideo'],
    });
    return user.thumbUpVideo.some((video) => video.id == videoId);
  }

  ///排行
  getVideoRank() {
    return this.videoRepository.find({ order: { thumbUp: 'ASC' } });
  }

  ///获取视频信息
  async getVideoInfo(videoId: any) {
    let video = await this.videoRepository.findOne({
      where: { id: videoId },
      relations: ['user'],
    });

    return video;
  }

  ///我的视频
  async getMyVideo(userId: number) {
    return await this.videoRepository
      .createQueryBuilder('video')
      .leftJoinAndSelect('video.user', 'user')
      .addSelect('video.createDate')
      .where('user.id=:id', { id: userId })
      .getMany();
  }

  ///删除
  async removeVideo(videoId: number) {
    let video = await this.videoRepository.findOne(videoId);
    let res = await this.videoRepository.remove(video);
    return res != null;
  }
}
