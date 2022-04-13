import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { compares, encrypt } from 'src/utils/common.utils';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePwd } from './dto/pwd-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

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
  async updateUser(updateUserDto: UpdateUserDto, userId: number) {
    let isHasNickname = await this.userRepository.findOne({
      where: { nickname: updateUserDto.nickname },
    });
    if (isHasNickname != null) throw new ConflictException('昵称已存在');
    let user = await this.userRepository.findOne(userId);
    if (updateUserDto.birthday != null)
      updateUserDto.birthday = new Date(updateUserDto.birthday);
    Object.keys(updateUserDto).forEach((key) => {
      if (updateUserDto[key] != null) {
        user[key] = updateUserDto[key];
      }
    });
    await this.userRepository.save(user);
    return await this.userRepository.findOne(userId);
  }

  ///修改头像
  async updateAvatar(url: string, userId: number) {
    let user = await this.userRepository.findOne(userId);
    user.avatar = url;
    return await this.userRepository.save(user);
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

  ///个人信息
  async getProfile(userId: number) {
    return await this.userRepository.findOne({ where: { id: userId } });
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
      if (!token) return null;
      const id = this.jwtService.verify(token.replace('Bearer ', ''));
      return id;
    } catch (error) {
      return null;
    }
  }
}
