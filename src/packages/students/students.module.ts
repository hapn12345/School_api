import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Student } from "./models/students.schema";
import { StudentController } from "./students.controller";
import { StudentService } from "./students.service";

@Module({
    imports: [TypeOrmModule.forFeature([Student])],
    providers: [StudentService],
    controllers: [StudentController],
    exports: [StudentService]
})

export class StudentModule { }