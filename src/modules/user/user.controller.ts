import { Controller, Post, Body, UseGuards, Req, Get, Query, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePwd } from './dto/pwd-user.dto';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { AllowAnon } from 'src/common/decorators/allowAnon.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) { }

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    this.userService.createUser(createUserDto);
  }

  @AllowAnon()
  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Req() req: any) {
    return this.authService.login(req.user);
  }

  @Post('update')
  async update(@Body() updateUserDto: UpdateUserDto) {
    if (updateUserDto) await this.userService.updateUser(updateUserDto);
  }

  @Get("search")
  async search(@Query() query: any) {
    return await this.userService.searchUser(query.key);
  }

  @Get()
  async getAllUserList() {
    return await this.userService.findAll();
  }


  ///修改密码
  @Post('updatePwd')
  async updatePwd(@Body() updatePwd: UpdatePwd) {
    return await this.userService.updatePwd(updatePwd);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('dianzan')
  async dianzan(@Query('videoId') videoId, @CurrentUser() user) {
    // this.userService.dianzan(user.id,videoId);
    return await this.userService.findDianzan(videoId)
  }




  ///忘记密码

}
