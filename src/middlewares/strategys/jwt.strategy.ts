import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Status as RoleStatus } from "../../packages/users/models/users.dto";
import { UserAccessService } from "../../packages/user_access/user_access.service";
import { UserService } from "../../packages/users/users.service";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly userService: UserService,
        private readonly userAccessService: UserAccessService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'testsecretasjalsdkalskdlas',
        })
    }

    async validate(payload: any) {        
        const { userId } = payload

        if (!userId) {
            return false
        }

        const user = await this.userService.findOne({
            id: userId
        })

        if (!user) {
            return false
        }

        const access = await this.userAccessService.findMany({
            query: {
                userId,
                status: RoleStatus.ACTIVE
            }
        })

        return {
            userId,
            roleAccess: access
        }
    }
}