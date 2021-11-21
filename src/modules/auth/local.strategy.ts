import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            numberField: 'number',
            passwordField: 'password',
        } as IStrategyOptions);

    }

    async validate(number: string, password: string): Promise<User> {
        console.log(number);
        const user = await this.authService.validate(number, password);
        if (user) {
            return user;
        }
        else {
            throw new UnauthorizedException('密码错误');
        }
    }
}