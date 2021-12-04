import { Controller, Post, Body, UseGuards, Req, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiHeader, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/entities/user.entity';
import { query } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) { }

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    this.userService.createUser(createUserDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('update')
  async update(@Body() updateUserDto: UpdateUserDto) {
    if (updateUserDto) await this.userService.updateUser(updateUserDto);
  }

  @Get("search")
  async search(@Query() query:any) {
    console.log(query.key);
    return await this.userService.searchUser(query.key);
  }

}
