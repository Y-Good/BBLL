import { BadRequestException, Injectable } from '@nestjs/common';
import { OmitType } from '@nestjs/mapped-types';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Video } from 'src/entities/video.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createVideoDto: CreateVideoDto) {
    return await this.videoRepository.save(createVideoDto);
  }

  async findAll(): Promise<Video[]> {
    return await this.videoRepository.find();
  }

  async update(vid: number, upId: number, updateVideoDto: UpdateVideoDto) {
    let video = await this.videoRepository.findOne({ where: [{ id: vid }, { upId: upId }] });
    return await this.videoRepository.save(video);
  }

  ///创建点赞
  async thumbUp(videoId: number, userId: number) {
    try {
      let user = await this.userRepository.findOne(userId);
      let video = await this.videoRepository.findOne(videoId, { relations: ['users'] });

      video.users.push(user);
      return await this.videoRepository.save(video)
    } catch (error) {
      throw '操作失败';
    }

  }
  ///点赞列表
  async getThumbUpList(videoId: number) {
    return await this.videoRepository.find({ relations: ['users'], where: { id: videoId } });
  }
}
