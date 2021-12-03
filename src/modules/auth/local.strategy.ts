import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import { ConflictException, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField : 'number',
            passwordField: 'password',
        } as IStrategyOptions);

    }

    async validate(number: string, password: string): Promise<User> {
        const user = await this.authService.validate(number, password);
        if (user) {
            return user;
        }
        else {
            throw new ConflictException('密码错误');
        }
    }
}