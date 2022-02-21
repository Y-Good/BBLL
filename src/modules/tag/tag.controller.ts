import { Body, Controller, Get, Post } from '@nestjs/common';
import { TagService } from './tag.service';
import {CreateTagDto} from './dto/create-tag.dto';

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
  getAllTag(){
    return this.tagService.findAllTag();
  }
}
