import { Controller, Get, Post, Query } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ReqUser } from 'src/common/interfaces/req-user.interface';
import { HistroyService } from './histroy.service';

@Controller('histroy')
export class HistroyController {
  constructor(private readonly histroyService: HistroyService) { }

  @Get()
  async getHistroy(@CurrentUser() user: ReqUser) {
    return await this.histroyService.findAll(user.id);
  }

  @Get('search')
  async searchHistroy(@Query('key') key: string, @CurrentUser() user: ReqUser) {
    return await this.histroyService.findByKey(key, user.id);
  }

  @Post()
  async createHistroy(
    @Query('videoId') videoId: number,
    @CurrentUser() user: ReqUser,
  ) {
    return await this.histroyService.createHistroy(videoId, user.id);
  }

  @Get('delete')
  async delHistroy(
    @Query('histroyId') histroyId: number,
  ) {
    return await this.histroyService.delHistroy(histroyId);
  }
}
