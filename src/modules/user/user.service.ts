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

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.userRepository.save(createUserDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    return "12";
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
  async updatePwd(updatePwd: UpdatePwd) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where('user.id=:id', { id: updatePwd.id })
        .getOne();

      const result = await compares(updatePwd.oldPwd, user.password);

      if (result) {
        user.password = await encrypt(updatePwd.newPwd);
        await this.userRepository.save(user);
        return "修改成功";
      } else {
        throw '旧密码错误';
      }

    } catch (error) {
      throw new ConflictException(error);
    }
  }

  async dianzan(userId: number, videoId: number) {
    let user = await this.userRepository.findOne(userId)
    // let video=await this.videoRepository.find({where:{id:videoId}})
    let video = await this.videoRepository.findOne(videoId)

    user.videos.push(video)
    this.userRepository.save(user)
  }

  async findDianzan(videoId: number) {
    return await this.videoRepository.createQueryBuilder('video')
      .where('video.id=:id', { id: videoId })
      .leftJoinAndSelect('video.users', 'u')
      .getMany()
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
    let user = await this.userRepository.find({
      where: { 'id': userId },
      relations: ['historyVideos'],
    });
    // let video=await this.videoRepository.find({where:{id:videoId}})
    let historyVideos = await this.videoRepository.findOne(videoId)

    user[0].historyVideos.push(historyVideos)
    console.log(user);

    this.userRepository.save(user)
  }

  async getUserInfo(userId: number) {
    return await this.userRepository.find({
      where: { 'id': userId },
      relations: ['historyVideos'],
    });
  }

}
