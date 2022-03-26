import { Module } from '@nestjs/common';
import { WsService } from './ws.service';
import { WsGateway } from './ws.gateway';
import { UserModule } from '../user/user.module';
import { WsController } from './ws.controller';
import { VideoModule } from '../video/video.module';

@Module({
  imports: [UserModule, VideoModule],
  controllers: [WsController],
  providers: [WsGateway, WsService],
  exports: [WsService],
})
export class WsModule {}
