import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { jwtContants } from './jwt.contants';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Global()
@Module({
  imports: [UserModule, PassportModule, JwtModule.register({
    secret: jwtContants.secret,
    signOptions:{
      expiresIn: '30d',
    }
  }),],
  providers: [AuthService, LocalStrategy,JwtStrategy],
  exports:[AuthService]
})
export class AuthModule { }
