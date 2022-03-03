import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  Param,
  Request,
} from '@nestjs/common';
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
  findAll() {
    return this.videoService.findAll();
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

  @Get('getThumbUp')
  async getThumbUpList(@Query('videoId') videoId: number) {
    return await this.videoService.getThumbUpList(videoId);
  }

  ///视频排行
  @Get('rank')
  @AllowAnon()
  async getVideoRank() {
    return await this.videoService.getVideoRank();
  }

  ///获取视频信息
  @Get('info')
  async getVideoInfo(
    @Query('videoId') videoId: number,
    @CurrentUser() user: ReqUser,
  ) {
    this.userService.createHistory(videoId, user.id);
    return await this.videoService.getVideoInfo(videoId);
  }

  //我发布的视频
  @Get('my')
  async getMyVideo(@CurrentUser() user: ReqUser) {
    return await this.videoService.getMyVideo(user.id);
  }
}
