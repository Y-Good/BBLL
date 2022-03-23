import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { AllowAnon } from 'src/common/decorators/allow-anon.decorator';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  //创建
  @Post()
  async createTag(@Body() tagDto: CreateTagDto) {
    return await this.tagService.createTag(tagDto.tag);
  }

  //获取
  @Get()
  @AllowAnon()
  getAllTag() {
    return this.tagService.findAllTag();
  }

  //获取标签相关视频
  @Get('video')
  @AllowAnon()
  async getVideoTag(@Query('tagId') tagId: number) {
    return await this.tagService.findVideoByTag(tagId);
  }
}
