import { Controller, Get, Query } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CollectEnum } from 'src/common/enums/collect.enum';
import { CollectService } from './collect.service';

@Controller('collect')
export class CollectController {
  constructor(private readonly collectService: CollectService) {}

  @Get()
  async createCollect(
    @Query('videoId') videoId: number,
    @Query('liveId') liveId: number,
    @CurrentUser() user: any,
  ) {
    let collectType: CollectEnum =
      videoId != null ? CollectEnum.VIDEO : CollectEnum.LIVE;
    let collectId: number = videoId != null ? videoId : liveId;
    return await this.collectService.create(collectId, user.id, collectType);
  }

  ///获取用户收藏列表或者关注
  @Get('list')
  async getCollectList(@Query('type') type: string, @CurrentUser() user: any) {
    return await this.collectService.findByType(type, user.id);
  }

  ///取消收藏
  @Get('cancel')
  cancelCollect(@Query('videoId') videoId: number, @CurrentUser() user: any) {
    return this.collectService.cancel(videoId, user.id, CollectEnum.VIDEO);
  }
}
