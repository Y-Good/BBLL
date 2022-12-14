import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { AllowAnon } from 'src/common/decorators/allow-anon.decorator';
import { UserService } from '../user/user.service';
import { ReqUser } from 'src/common/interfaces/req-user.interface';

@Controller('video')
export class VideoController {
  constructor(
    private readonly videoService: VideoService,
    private readonly userService: UserService,
  ) {}

  @Post('create')
  create(@Body() createVideoDto: CreateVideoDto, @CurrentUser() user: any) {
    return this.videoService.create(createVideoDto, user.id);
  }

  @Get()
  @AllowAnon()
  findAll(@Query('pageNumber') pageNumber: number) {
    return this.videoService.findAll(pageNumber);
  }

  // @Post('update')
  // async update(@Body() videoUpdateDto: UpdateVideoDto) {
  //   return await this.videoService.update(videoUpdateDto.id, videoUpdateDto);
  // }

  ///点赞了
  @Get('thumbUp')
  async thumbUp(@Query('videoId') videoId: number, @CurrentUser() user: any) {
    return await this.videoService.thumbUp(videoId, user.id);
  }

  @Get('thumbUpList')
  async getThumbUpList(@Query('videoId') videoId: number) {
    return await this.videoService.getThumbUpList(videoId);
  }

  @Get('isThumbUp')
  async getIsThumbUp(
    @Query('videoId') videoId: number,
    @CurrentUser() user: ReqUser,
  ) {
    return await this.videoService.isThumbUpVideo(videoId, user.id);
  }

  @Get('isCollect')
  async getIsCollect(
    @Query('videoId') videoId: number,
    @CurrentUser() user: ReqUser,
  ) {
    return await this.videoService.isCollectVideo(videoId, user.id);
  }

  ///视频排行
  @Get('rank')
  @AllowAnon()
  async getVideoRank() {
    return await this.videoService.getVideoRank();
  }

  ///热门排行
  @Get('hot')
  @AllowAnon()
  async getHot() {
    return await this.videoService.getHot();
  }

  ///获取视频信息
  @Get('info')
  @AllowAnon()
  async getVideoInfo(@Query('videoId') videoId: number) {
    return await this.videoService.getVideoInfo(videoId);
  }

  //我发布的视频
  @Get('my')
  @AllowAnon()
  async getMyVideo(@Query('userId') userId: number) {
    return await this.videoService.getMyVideo(userId);
  }

  @Get('remove')
  async removeVideo(@Query('videoId') videoId: number) {
    return await this.videoService.removeVideo(videoId);
  }
}
