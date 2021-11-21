import { PartialType } from '@nestjs/mapped-types';
import { CreateBarrageDto } from './create-barrage.dto';

export class UpdateBarrageDto extends PartialType(CreateBarrageDto) {}
