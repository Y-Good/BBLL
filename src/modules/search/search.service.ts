import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchType } from 'src/common/enums/search.enum';
import { User } from 'src/entities/user.entity';
import { Video } from 'src/entities/video.entity';
import { ILike, Like, Repository } from 'typeorm';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) {}

  async findUser(key: string) {
    return await this.userRepository.findOne({
      where: { nickname: key },
    });
  }

  async findAll(key: string, type: SearchType) {
    let video: Array<any>;
    let user: User | Array<User>;

    switch (type) {
      case SearchType.USER:
        user = await this.userRepository.find({
          where: { nickname: ILike(`%${key}%`) },
          order: {
            nickname: 'ASC',
          },
        });
        return user;
      case SearchType.VIDEO:
        video = await this.videoRepository.find({
          where: { title: ILike(`%${key}%`) },
          relations: ['user'],
          order: {
            view: 'DESC',
            title: 'ASC',
          },
        });
        return video;
      default:
        ///视频
        return await this.videoRepository.find({
          where: { title: ILike(`%${key}%`) },
          relations: ['user'],
          order: {
            title: 'ASC',
          },
        });
    }
  }
}
