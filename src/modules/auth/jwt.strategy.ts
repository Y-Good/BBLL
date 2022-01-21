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
      //payload：jwt-passport认证jwt通过后解码的结果
      return { id:payload.id, number: payload.number};
  }
}