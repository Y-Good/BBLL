import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from 'src/entities/video.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) {}

  async findAll() {
    return await this.videoRepository
      .createQueryBuilder('video')
      .leftJoinAndSelect('video.user', 'user')
      .addSelect('video.createDate')
      .orderBy('video.view', 'DESC')
      .limit(4)
      .getMany();
  }
}
