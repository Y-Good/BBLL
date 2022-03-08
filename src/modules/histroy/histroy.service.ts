import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Histroy } from 'src/entities/histroy.entity';
import { Video } from 'src/entities/video.entity';
import { arrayBuffer } from 'stream/consumers';
import { Repository } from 'typeorm/repository/Repository';
import { UserService } from '../user/user.service';
import { VideoService } from '../video/video.service';

@Injectable()
export class HistroyService {
  constructor(
    @InjectRepository(Histroy)
    private readonly histroyRepository: Repository<Histroy>,
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
    private readonly userService: UserService,
  ) {}

  async findAll(userId: number) {
    let res = await this.histroyRepository.find({
      where: { user: userId },
      relations: ['video','video.user','user'],
    });
    return res.reverse();
  }

  ///创建历史记录
  async createHistroy(videoId: number, userId: number) {
    const allHistroy = await this.findAll(userId);

    const flag = allHistroy.some(({ video: { id } }) => id == videoId);

    if (flag) return false;

    const user = await this.userService.getProfile(userId);
    const video = await this.videoRepository.findOne(videoId);
    let history = new Histroy();
    history.user = user;
    history.video = video;
    let res = await this.histroyRepository.save(history);
    this.findVideoView(videoId);
    return res != null;
  }

  ///获取视频观看次数
  async findVideoView(videoId: number) {
    const res = await this.histroyRepository.find({
      where: { video: videoId },
    });
    let video = await this.videoRepository.findOne(videoId);
    video.view = res.length;
    this.videoRepository.save(video);
  }
}
