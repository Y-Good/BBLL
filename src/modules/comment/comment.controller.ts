import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() dto, @CurrentUser() user: any) {
    return await this.commentService.create(dto, user.id);
  }


  @Get()
  async getCommentList(@Query('videoId') videoId: number) {    
    return await this.commentService.getCommentList(videoId);
  }

  ///删除评论


}
