import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AllowAnon } from 'src/common/decorators/allow-anon.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ReqUser } from 'src/common/interfaces/req-user.interface';
import { Comment } from 'src/entities/comment.entity';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateSecondCommentDto } from './dto/create-second-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @CurrentUser() user: any,
  ): Promise<Comment> {
    return await this.commentService.create(createCommentDto, user.id);
  }

  @Get()
  @AllowAnon()
  ///获取视频评论列表
  async getCommentList(@Query('videoId') videoId: number) {
    return await this.commentService.getCommentList(videoId);
  }

  ///删除评论
  @Get('remove')
  async removeComment(@Query('commentId') commentId: number) {
    return await this.commentService.removeComment(commentId);
  }

  ///获取我的评论
  @Get('my')
  async getMyComment(@CurrentUser() user: ReqUser) {
    return await this.commentService.getMyComment(user.id);
  }

  ///dianz
  @Get('thumbUp')
  async thumbUp(
    @Query('commentId') commentId: number,
    @CurrentUser() user: any,
  ) {
    return await this.commentService.thumbUp(commentId, user.id);
  }

  @Get('isThumbUp')
  async getIsThumbUp(
    @Query('commentId') commentId: number,
    @CurrentUser() user: ReqUser,
  ) {
    return await this.commentService.isThumbUpVideo(commentId, user.id);
  }

  ///二级评论
  @Post('second')
  async createSecondComment(
    @Body() secondDto: CreateSecondCommentDto,
    @CurrentUser() user: ReqUser,
  ) {
    return await this.commentService.createSecondComment(secondDto, user.id);
  }

  @Get('second')
  async getSecondComment(@Query('parentId') parentId: number) {
    return await this.commentService.findSecondComment(parentId);
  }
}
