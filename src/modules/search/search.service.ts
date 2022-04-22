import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchType } from 'src/common/enums/search.enum';
import { User } from 'src/entities/user.entity';
import { Video } from 'src/entities/video.entity';
import { ILike, Like, Repository } from 'typeorm';
import { CollectService } from '../collect/collect.service';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
    private readonly collectService: CollectService
  ) { }

  async findUser(key: string, userId?: number) {
    let user = await this.userRepository.findOne({
      where: { nickname: key },
    });
    if (user == null) return null;
    let isFollow = userId != null ? await this.collectService.getIsFollow(user.id, userId) : false;
    let res = { ...user, ...{ 'isFollow': isFollow } }
    return res;
  }

  async findAll(key: string, type: SearchType, userId?: number) {
    let video: Array<any>;
    let res = [];
    let userList: Array<User>;

    switch (type) {
      case SearchType.USER:
        userList = await this.userRepository.find({
          where: { nickname: ILike(`%${key}%`) },
          order: {
            nickname: 'ASC',
          },
        });
        for (let i = 0; i < userList.length; i++) {
          const user = userList[i];
          let isFollow = userId != null ? await this.collectService.getIsFollow(user.id, userId) : false;

          res.push({ ...user, ...{ 'isFollow': isFollow } })
        }
        return res;
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
