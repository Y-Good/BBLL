import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { compares } from 'src/utils/common.utils';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

  async validate(number: string, password: string): Promise<any> {

    const user = await this.userService.findPassword(number);
console.log(user);

    if (!user) {
      throw new UnauthorizedException('无账号');
    }
    // // 注：实际中的密码处理应通过加密措施
    if (await compares(password, user.password)) {
      const { password, ...userInfo } = user;
      return userInfo;
    } else {
      return null;
    }
  }

  async login(user: User): Promise<any> {
    console.log("1");
    
    const { id, number } = user;
    return {
      token: this.jwtService.sign({ id, number })
    };
  }
}
