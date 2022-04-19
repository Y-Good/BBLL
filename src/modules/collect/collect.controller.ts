import { Controller, Get, Query } from '@nestjs/common';
import { AllowAnon } from 'src/common/decorators/allow-anon.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CollectEnum } from 'src/common/enums/collect.enum';
import { ReqUser } from 'src/common/interfaces/req-user.interface';
import { CollectService } from './collect.service';

@Controller('collect')
export class CollectController {
  constructor(private readonly collectService: CollectService) {}

  @Get()
  async createCollect(
    @Query('videoId') videoId: number,
    @Query('followId') followId: number,
    @CurrentUser() user: ReqUser,
  ) {
    return await this.collectService.create(videoId, followId, user.id);
  }

  ///获取用户收藏列表或者关注
  @Get('list')
  @AllowAnon()
  async getCollectList(
    @Query('type') type: CollectEnum,
    @Query('userId') userId: number,
  ) {
    return await this.collectService.findByType(type, userId);
  }

  @Get('trend')
  async getTrend(@Query('day') day: number, @CurrentUser() user: ReqUser) {
    return await this.collectService.findTrend(day, user.id);
  }

  @Get('isFollow')
  async getIsFollow(
    @Query('followId') followId: number,
    @CurrentUser() user: ReqUser,
  ) {
    return await this.collectService.getIsFollow(followId, user.id);
  }

  /* 关注、粉丝 */
  @Get('count')
  @AllowAnon()
  async getCount(@Query('userId') userId: number) {
    return await this.collectService.getCount(userId);
  }
}
