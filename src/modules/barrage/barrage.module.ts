import { Module } from '@nestjs/common';
import { BarrageService } from './barrage.service';
import { BarrageController } from './barrage.controller';

@Module({
  controllers: [BarrageController],
  providers: [BarrageService]
})
export class BarrageModule {}
