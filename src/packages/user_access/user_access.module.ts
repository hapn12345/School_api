import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { UserAccess } from "./models/user_access.schema";
import { UserAccessController } from "./user_access.controller";
import { UserAccessService } from "./user_access.service";


@Module({
    imports: [TypeOrmModule.forFeature([UserAccess])],
    controllers: [UserAccessController],
    providers: [UserAccessService],
    exports: [
        UserAccessService
    ]
})

export class UserAccessModule { }