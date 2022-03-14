import { Controller, Get, Post, Body } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ReqUser } from 'src/common/interfaces/req-user.interface';

@Controller('notify')
export class NotifyController {
  constructor(private readonly notifyService: NotifyService) {}

  @Get()
  async findAll(@CurrentUser() user: ReqUser) {
    return await this.notifyService.findAll(user.id);
  }

  @Get('/unread')
  async getUnReadCount(@CurrentUser() user: ReqUser) {
    return await this.notifyService.unreadCount(user.id);
  }

  @Get('/mark')
  async allRead(@CurrentUser() user: ReqUser) {
    this.notifyService.markRead(user.id);
  }
}
