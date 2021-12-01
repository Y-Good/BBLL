import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'express';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.save(createUserDto);
  }

  async login(loginUserDto: LoginUserDto) {
    return "12";
  }

  async findPassword(number: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.number=:number', { number: number })
      .getOne()
  }

  async findUserId(number: string): Promise<User> {
    if (number != null) {
      const res = await this.userRepository.findOne({ where: { number: number } });
      if (res == null) throw new HttpException("数据有误", 4001);
      return res;
    }
  }
}
