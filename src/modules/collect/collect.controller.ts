import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/common/decorators/current.user.decorator';
import { collectTypes } from 'src/common/enums/collect.enum';
import { CollectService } from './collect.service';

@Controller('collect')
export class CollectController {
  constructor(private readonly collectService: CollectService) { }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async createCollect(
    @Query('videoId') videoId: number,
    @Query('liveId') liveId: number,
    @CurrentUser() user: any
  ) {
    let collectType: collectTypes = videoId != null ? collectTypes.VIDEO : collectTypes.LIVE;
    let collectId: number = videoId != null ? videoId : liveId;
    return await this.collectService.create(collectId, user.id, collectType);
  }


  ///获取用户收藏列表
  @Get('list')
  @UseGuards(AuthGuard('jwt'))
  async getCollectList(@Query('type') type: string, @CurrentUser() user: any) {
    return await this.collectService.findByType(type, user.id);
  }

  ///取消收藏
  @Get('cancel')
  @UseGuards(AuthGuard('jwt'))
  cancelCollect(@Query('videoId') videoId: number, @CurrentUser() user: any) {
    return this.collectService.cancel(videoId, user.id, collectTypes.VIDEO);
  }

}
