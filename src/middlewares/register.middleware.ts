import { ConflictException, Injectable, NestMiddleware } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { UserService } from 'src/modules/user/user.service';
import { encrypt } from 'src/utils/common.utils';

@Injectable()
export class RegisterMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) { }
  async use(req: any, res: any, next: () => void) {
    let { number, password } = req.body;
    const user = await this.userService.findUserByNumberAndNickname(number);
    if (user) throw new ConflictException("账号重复！");

    req.body.nickname = `User${nanoid(10)}`;
    req.body.password = await encrypt(password);
    next();
  }
}
