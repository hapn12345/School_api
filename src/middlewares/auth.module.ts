import { Module } from "@nestjs/common";
import { UserAccessModule } from "src/packages/user_access/user_access.module";
import { UserModule } from "../packages/users/users.module";
import { JWTStrategy } from "./strategys/jwt.strategy";
import { LocalStrategy } from "./strategys/local.strategy";

@Module({
    imports: [
        UserModule,
        UserAccessModule,
    ],
    exports: [
        JWTStrategy,
        LocalStrategy,
    ],
    providers: [
        JWTStrategy,
        LocalStrategy,
    ]
})

export class AuthModule { }