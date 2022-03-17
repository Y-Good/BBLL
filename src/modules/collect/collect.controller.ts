import { Controller, Get, Query } from '@nestjs/common';
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
  async getCollectList(
    @Query('type') type: CollectEnum,
    @CurrentUser() user: ReqUser,
  ) {
    return await this.collectService.findByType(type, user.id);
  }
}
