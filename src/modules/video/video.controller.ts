import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/common/decorators/current.user.decorator';
import { JwtService } from '@nestjs/jwt';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService, private readonly jwtService: JwtService) { }

  @Post('create')
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videoService.create(createVideoDto);
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
  @UseGuards(AuthGuard('jwt'))
  @Get('thumbUp')
  async thumbUp(@Query('videoId') videoId: number, @CurrentUser() user: any) {
    return await this.videoService.thumbUp(videoId, user.id);
  }


  @Get('getThumbUp')
  async getThumbUpList(@Query('videoId') videoId: number,) {
    return await this.videoService.getThumbUpList(videoId);
  }
}
