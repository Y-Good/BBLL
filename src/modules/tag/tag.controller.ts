import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TagService } from './tag.service';
import {CreateTagDto} from './dto/create-tag.dto';
import { AllowAnon } from 'src/common/decorators/allow-anon.decorator';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  //创建
  @Post()
  createTag(@Body() tagDto:CreateTagDto){
    this.tagService.createTag(tagDto.tag);
  }

  //获取
  @Get()
  @AllowAnon()
  getAllTag(){
    return this.tagService.findAllTag();
  }

  ///获取视频标签
  // @Get(':videoId')
  // @AllowAnon()
  // async getVideoTag(@Param('videoId') videoId:number){
  //   return await this.tagService.findAllTag([videoId]);
  // }
}
