import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Histroy } from 'src/entities/histroy.entity';
import { Video } from 'src/entities/video.entity';
import { ILike } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { UserService } from '../user/user.service';

@Injectable()
export class HistroyService {
  constructor(
    @InjectRepository(Histroy)
    private readonly histroyRepository: Repository<Histroy>,
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
    private readonly userService: UserService,
  ) { }

  async findAll(userId: number) {
    let res = await this.histroyRepository.find({
      where: { user: userId },
      relations: ['video', 'video.user', 'user'],
      order: { updateDate: 'DESC' },
    });
    return res;
  }

  ///创建历史记录
  async createHistroy(videoId: number, userId: number) {
    const allHistroy = await this.findAll(userId);

    const flag = allHistroy.some(({ video: { id } }) => id == videoId);

    if (flag) {
      let history = await this.histroyRepository.findOne({
        where: { user: userId, video: videoId },
      });
      history.updateDate = new Date();
      this.histroyRepository.save(history);
      return;
    }

    const user = await this.userService.getProfile(userId);
    const video = await this.videoRepository.findOne(videoId);
    if (video == null) return;
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
    video.view = (parseInt(video.view) + 1).toString();
    this.videoRepository.save(video);
  }

  async findByKey(key: string, userId: number) {
    return await this.histroyRepository
      .createQueryBuilder('histroy')
      .leftJoinAndSelect('histroy.video', 'video')
      .leftJoinAndSelect('video.user', 'vuser')
      .leftJoinAndSelect('histroy.user', 'user')
      .where('user.id=:userId', { userId: userId })
      .andWhere('video.title like :key', { key: `%${key}%` })
      .getMany();
  }

  async delHistroy(histroyId: number) {
    let histroy =
      await this.histroyRepository.findOne({ where: { id: histroyId } });
    let res = await this.histroyRepository.remove(histroy);
    return res != null;
  }
}
