import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AllowAnon } from 'src/common/decorators/allow-anon.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ReqUser } from 'src/common/interfaces/req-user.interface';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @CurrentUser() user: any,
  ): Promise<boolean> {
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
}
