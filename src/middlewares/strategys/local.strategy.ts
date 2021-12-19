import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../packages/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(
        private readonly usersService: UserService
    ) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne({
            userName: username
        })
        
        if (!user) {
            throw new UnauthorizedException('UserNameNotFound')
        }

        const { password: hashPassword } = user
        // compare hash password with bcrypt

        const isCorrectPassword = await bcrypt.compare(password, hashPassword)

        if (!isCorrectPassword) {
            throw new UnauthorizedException('IncorrectPassword')
        }

        return user;
    }
}