import { Controller, Get, Query } from '@nestjs/common';
import { AllowAnon } from 'src/common/decorators/allow-anon.decorator';
import { SearchType } from 'src/common/enums/search.enum';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @AllowAnon()
  async getSearch(@Query('key') key: string, @Query('type') type: SearchType) {
    return await this.searchService.findAll(key, type);
  }

  @Get('user')
  @AllowAnon()
  async userSearch(@Query('key') key: string) {
    return await this.searchService.findUser(key);
  }
}
