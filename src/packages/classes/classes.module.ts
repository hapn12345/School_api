import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClassController } from "./classes.controller";
import { ClassService } from "./classes.service";
import { Class } from "./models/classes.schema";

@Module({
    imports: [TypeOrmModule.forFeature([Class])],
    providers: [ClassService],
    controllers: [ClassController],
    exports: [ClassService]
})

export class ClassModule { }