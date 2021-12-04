import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { jwtContants } from './jwt.contants';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 获取请求header token值
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtContants.secret,
      ignoreExpiration: false
    } as StrategyOptions);
  }


  
  async validate(payload: any): Promise<any> {
    let date = new Date().getTime();
    if (payload.exp * 1000 < date) {
      throw new HttpException({
        error: 'token过期',
        statusbar: HttpStatus.FORBIDDEN
      }, 403)
    } else {

      //payload：jwt-passport认证jwt通过后解码的结果
      return { number: payload.number};
    }
  }
}