import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentHealth } from "./models/student_health.schema";
import { StudentHealthController } from "./student_health.controller";
import { StudentHealthService } from "./student_health.service";

@Module({
    imports: [TypeOrmModule.forFeature([StudentHealth])],
    providers: [StudentHealthService],
    controllers: [StudentHealthController]
})

export class StudentHealthModule { }