import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { School } from "./models/schools.schema";
import { SchoolController } from "./schools.controller";
import { SchoolService } from "./schools.service";

@Module({
    imports: [TypeOrmModule.forFeature([School])],
    controllers: [SchoolController],
    providers: [SchoolService],
    exports: [SchoolService]
})

export class SchoolModule { }