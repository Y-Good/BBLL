import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';
import { compares } from 'src/utils/common.utils';
import { LoginUserDto } from '../user/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

  async validate(number: string, password: string): Promise<any> {

    const user = await this.userService.findPassword(number);

    if (!user) throw new ConflictException('账号或密码错误');

    // // 注：实际中的密码处理应通过加密措施
    if (await compares(password, user.password)) {
      const { password, ...userInfo } = user;
      return userInfo;
    } else {
      return null;
    }
  }

  async login(loginUser: LoginUserDto): Promise<any> {

    if (!loginUser.number) return;
    const { id, number } = await this.userService.findUserId(loginUser.number);
    if (!id || !number) throw new InternalServerErrorException("数据为空");
    return {
      token: this.jwtService.sign({ id, number })
    };
  }
}
