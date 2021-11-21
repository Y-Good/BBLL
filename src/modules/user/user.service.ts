import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
) { }

 async create(createUserDto: CreateUserDto):Promise<User> {
    return await this.userRepository.save(createUserDto);
  }

async login(loginUserDto:CreateUserDto){
return "12";
}

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  async findPassword(number: string) {
    return this.userRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where('user.number=:number', { number: number })
        .getOne()
}
}
