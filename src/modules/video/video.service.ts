import { BadRequestException, Injectable } from '@nestjs/common';
import { OmitType } from '@nestjs/mapped-types';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/entities/tag.entity';
import { User } from 'src/entities/user.entity';
import { Video } from 'src/entities/video.entity';
import { Repository } from 'typeorm';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) { }

  async create(createVideoDto: CreateVideoDto, id: number) {
    createVideoDto.upId = id;
    const { tags: oldTag, ...newDto } = createVideoDto;
    let tags: Tag[] = await this.tagRepository.findByIds(createVideoDto.tags);
    let video = { tags, ...newDto };

    return await this.videoRepository.save(video);
  }

  async findAll(): Promise<Video[]> {
    return await this.videoRepository.find();
  }

  async update(vid: number, upId: number, updateVideoDto: UpdateVideoDto) {
    let video = await this.videoRepository.findOne({ where: [{ id: vid }, { upId: upId }] });
    return await this.videoRepository.save(video);
  }

  ///点赞
  async thumbUp(videoId: number, userId: number) {
    try {
      let user = await this.userRepository.findOne(userId);
      let video = await this.videoRepository.findOne(videoId, { relations: ['users'] });
      video.users.map(e => {
        e.id === user.id
          ? video.users.unshift(user)
          : video.users.push(user);
      })

      video.thumbUp = video.users.length;
      return await this.videoRepository.save(video)
    } catch (error) {
      throw new BadRequestException(error);
    }

  }
  ///点赞列表
  async getThumbUpList(videoId: number) {
    return await this.videoRepository.find({ relations: ['users'], where: { id: videoId } });
  }

  ///排行
  getVideoRank() {
    return this.videoRepository.find({ order: { thumbUp: "ASC" } });
  }
}
