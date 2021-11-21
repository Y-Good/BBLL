import { Injectable } from '@nestjs/common';
import { CreateBarrageDto } from './dto/create-barrage.dto';
import { UpdateBarrageDto } from './dto/update-barrage.dto';

@Injectable()
export class BarrageService {
  create(createBarrageDto: CreateBarrageDto) {
    return 'This action adds a new barrage';
  }

  findAll() {
    return `This action returns all barrage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} barrage`;
  }

  update(id: number, updateBarrageDto: UpdateBarrageDto) {
    return `This action updates a #${id} barrage`;
  }

  remove(id: number) {
    return `This action removes a #${id} barrage`;
  }
}
