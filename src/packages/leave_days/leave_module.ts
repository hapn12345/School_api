import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentModule } from "../students/students.module";
import { LeavedayController } from "./leave_days.controller";
import { LeaveDayService } from "./leave_days.service";
import { LeaveDay } from "./models/leave_days.schema";

@Module({
    imports: [
        TypeOrmModule.forFeature([LeaveDay]),
        StudentModule
    ],
    providers: [LeaveDayService],
    controllers: [LeavedayController],
    exports: [LeaveDayService]

})

export class LeaveDayModule { }