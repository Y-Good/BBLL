import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { AllowAnon } from 'src/common/decorators/allowAnon.decorator';


@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) { }

  @Post('create')
  create(@Body() createVideoDto: CreateVideoDto,@CurrentUser() user:any) {
    return this.videoService.create(createVideoDto,user.id);
  }

  @Get()
  findAll() {
    return this.videoService.findAll();
  }

  @Post('update')
  async update(@Body() videoUpdateDto: UpdateVideoDto) {
    return await this.videoService.update(videoUpdateDto.id, videoUpdateDto.upId, videoUpdateDto);
  }

  ///点赞了
  @Get('thumbUp')
  async thumbUp(@Query('videoId') videoId: number, @CurrentUser() user: any) {
    return await this.videoService.thumbUp(videoId, user.id);
  }


  @Get('getThumbUp')
  async getThumbUpList(@Query('videoId') videoId: number,) {
    return await this.videoService.getThumbUpList(videoId);
  }


  ///视频排行
  @Get('rank')
  @AllowAnon()
  async  getVideoRank() {
    return await this.videoService.getVideoRank();
  }
}
