import { Module } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { NotifyController } from './notify.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notify } from 'src/entities/notify.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notify])],
  controllers: [NotifyController],
  providers: [NotifyService],
})
export class NotifyModule {}
