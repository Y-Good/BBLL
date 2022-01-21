import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/common/decorators/current.user.decorator';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

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
