import { Controller, Get } from '@nestjs/common';
import { AllowAnon } from 'src/common/decorators/allow-anon.decorator';
import { BannerService } from './banner.service';

@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Get()
  @AllowAnon()
  async getBanner() {
    return await this.bannerService.findAll();
  }
}
