import { Controller, Get } from '@nestjs/common';
import { WsGateway } from './ws.gateway';
import { WsService } from './ws.service';

@Controller('ws')
export class WsController {
  constructor(
    private readonly wsService: WsService,
    private readonly wsGateway: WsGateway,
  ) {}

  @Get()
  async findOnline() {
    return await this.wsService.findOnline();
  }

  @Get('room')
  async getAllRoom() {
    return this.wsService.getAllRoom();
  }
}
