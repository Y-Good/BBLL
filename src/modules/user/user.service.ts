import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Video } from 'src/entities/video.entity';
import { compares, encrypt } from 'src/utils/common.utils';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdatePwd } from './dto/pwd-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
    private readonly jwtService: JwtService,
  ) { }

  async createUser(createUserDto: CreateUserDto) {
    try {
      let res = await this.userRepository.save(createUserDto);
      return res != null;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findPassword(number: string): Promise<User> {
    return this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.number=:number', { number: number })
      .getOne();
  }

  async findUserId(number: string): Promise<User> {
    return await this.userRepository.findOne({ where: { number: number } });
  }

  ///查询用户名、number是否存在
  async findUserByNumberAndNickname(number: string): Promise<User> {
    return await this.userRepository.findOne({ where: { number: number } });
  }

  ///修改用户信息
  async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    try {
      return await this.userRepository.save(updateUserDto);
    } catch (error) {
      throw new ConflictException(error);
    }
  }

  ///用户搜索
  async searchUser(key: string): Promise<User[]> {
    try {
      return await this.userRepository.find({ nickname: Like(`%${key}%`) });
    } catch (error) {
      throw new ConflictException(error);
    }
  }

  ///所有用户
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  ///修改密码
  async updatePwd(updatePwd: UpdatePwd, userId: number) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where('user.id=:id', { id: userId })
        .getOne();

      const result = await compares(updatePwd.oldPwd, user.password);

      if (result) {
        user.password = await encrypt(updatePwd.newPwd);
        await this.userRepository.save(user);
        return true;
      } else {
        throw '旧密码错误';
      }

    } catch (error) {
      throw new ConflictException(error);
    }
  }

  /** 校验 token */
  verifyToken(token: string): string {
    try {
      if (!token) return null
      const id = this.jwtService.verify(token.replace('Bearer ', ''))
      return id
    } catch (error) {
      return null
    }
  }

  async createHistory(videoId: any, userId: any) {
    let user = await this.userRepository.findOne({
      where: { 'id': userId },
      relations: ['historyVideos'],
    });
    let video = await this.videoRepository.findOne(videoId)

    user.historyVideos.push(video)

    this.userRepository.save(user)
  }

  async getUserInfo(userId: number) {
    return await this.userRepository.find({
      where: { 'id': userId },
      relations: ['historyVideos'],
    });
  }

  ///关注
  async getFollowList(userId: number) {
    return await this.userRepository.findOne({ relations: ['follows'], where: { id: userId } })
  }

  ///创建、取消关注
  async createAndCancelFollow(userId: number, followId: number) {
    let user1 = await this.userRepository.findOne(userId, { relations: ['follows'] });
    let user2 = await this.userRepository.findOne(followId);
    let followIndex: number = -1;

    user1.follows.forEach((e, index) => {
      if (e.id == user2.id) {
        followIndex = index;
        return;
      }
    })

    if (followIndex != -1) {
      delete user1.follows[followIndex];
    } else {
      user1.follows.push(user2);
    }
    let res = await this.userRepository.save(user1);
    if (res != null) return true;
  }

}
