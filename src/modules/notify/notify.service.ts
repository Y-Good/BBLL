import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notify } from 'src/entities/notify.entity';
import { Repository } from 'typeorm';
import { CreateNotifyDto } from './dto/create-notify.dto';
import { UpdateNotifyDto } from './dto/update-notify.dto';

@Injectable()
export class NotifyService {
  constructor(
    @InjectRepository(Notify)
    private readonly notifyRepository: Repository<Notify>,
  ) {}

  create(createNotifyDto: CreateNotifyDto) {
    return 'This action adds a new notify';
  }

  async findAll(userId: number) {
    return await this.notifyRepository.find({
      relations: ['fromUser', 'toUser', 'video'],
      where: { toUser: userId },
    });
  }
}
