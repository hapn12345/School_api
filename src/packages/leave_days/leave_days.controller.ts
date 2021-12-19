import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { StudentService } from "../students/students.service";
import { LeaveDayService } from "./leave_days.service";
import { LeaveDay } from "./models/leave_days.schema";

@Controller('leave-day')
export class LeavedayController {
    constructor(
        private leavedayService: LeaveDayService,
        private studentService: StudentService,
    ) { }

    @Get('')
    async findAll(
        @Query() query
    ) {
        return await this.leavedayService.findMany({
            query
        })
    }

    @Get(':id')
    async findOne(@Param() id) {
        return await this.leavedayService.findOne(id)
    }

    @Put(':id')
    async update(@Body() leaveDay: LeaveDay, @Param() id) {
        return await this.leavedayService.update(leaveDay, id)
    }

    @Post('')
    async create(@Body() leaveDay: LeaveDay) {        
        const { studentID } = leaveDay;
        const res = await this.studentService.findOne(studentID);
        const fd = new Date(leaveDay.firstDay)
        const ld = new Date(leaveDay.lastDay)
        leaveDay["firstDay"] = fd;
        leaveDay["lastDay"] = ld;

        const daysOff = (ld.getTime() - fd.getTime()) / (1000 * 3600 * 24);
        leaveDay['classID'] = res.classID;
        leaveDay['daysOff'] = Number(daysOff) + 1;
        return await this.leavedayService.create(leaveDay)
    }

    @Delete(':id')
    async delete(@Param() id) {
        return await this.leavedayService.delete(id)
    }
}