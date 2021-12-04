import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
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
      return await this.userRepository.find({nickname:Like(`%${key}%`)});
    } catch (error) {
      throw new ConflictException(error);
    }
  }
}
