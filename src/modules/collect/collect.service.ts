import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { collectTypes } from 'src/common/enums/collect.enum';
import { Collect } from 'src/entities/collect.entity';
import { Video } from 'src/entities/video.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CollectService {

  constructor(
    @InjectRepository(Collect)
    private readonly collectRepository: Repository<Collect>,
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) { }

  async create(videoId: number, userId: number, type: collectTypes) {
    let collect = new Collect();
    let video = await this.videoRepository.findOne(videoId);
    collect.userId = userId;
    collect.type = type;
    collect.video = video;
    return this.collectRepository.save(collect);
  }


  findByType(type: string, userId: number) {
    return this.collectRepository.find({
      where: { 'type': type, 'userId': userId },
      relations: ['video'],
    });
  }

  ///取消
  async cancel(videoId: number, userId: number, type: collectTypes) {
    try {
      let collect = await this.collectRepository.findOne({
        where: { 'type': type, 'userId': userId, 'videoId': videoId }
      })
      let res = await this.collectRepository.delete(collect);
      if (res != null) {
        return '操作成功';
      }
    } catch (error) {
      throw new BadRequestException(error);

    }

  }
}
