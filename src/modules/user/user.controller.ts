import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { ApiBody, ApiCreatedResponse, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags("用户相关接口")
@Controller('user')
export class UserController{
  constructor(private readonly userService: UserService, private readonly authService: AuthService) { }

  @ApiOperation({summary:"创建用户"})
  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({summary:"用户登录"})
  @ApiBody({type:LoginUserDto})
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req:any) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Req() req){
    // return req;
  }

}
