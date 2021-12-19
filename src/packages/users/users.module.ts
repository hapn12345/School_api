import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { User } from "./models/users.schema";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
import { UserAccessModule } from "../user_access/user_access.module";
import { StudentModule } from "../students/students.module";
import { ClassModule } from "../classes/classes.module";
import { SchoolModule } from "../schools/schools.module";

const UserRepository = TypeOrmModule.forFeature([User])

@Module({
    imports: [
        UserRepository,
        UserAccessModule,
        StudentModule,
        ClassModule,
        SchoolModule
    ],
    controllers: [UserController],
    providers: [
        UserService
    ],
    exports: [
        UserRepository,
        UserService,
    ]
})

export class UserModule { }