import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { scopes } from "src/constants/scopes";
import { Scopes } from "src/middlewares/authz";
import { ClassService } from "../classes/classes.service";
import { StudentService } from "../students/students.service";
import { LeaveDayService } from "../leave_days/leave_days.service"
import { FeeService } from "./fees.service";
import { Fee, FeePayload } from "./models/fees.schema";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository,MoreThan, LessThan } from "typeorm";

@Controller('fees')
export class FeeController {
    constructor(
        private feeService: FeeService,
        private classService: ClassService,
        private studentService: StudentService,
        private leaveDayService: LeaveDayService,
    ) { }

    @Get(':id')
    async findOne(@Param() id) {
        return await this.feeService.findOne(id)
    }

    @Get('/student/:id')
    @UseGuards(new Scopes([[scopes.PER_READ_FEES]]))
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    async findStudentFee(@Param() id) {
        return await this.feeService.findMany({
            query: {
                studentID: id
            }
        })
    }

    @Get('')
    @UseGuards(new Scopes([[scopes.TEACHER_READ_FEES]]))
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    async findFeeMonth(@Query() query) {
        return await this.feeService.findMany({
            query,
        })
    }

    @Post('')
    async create(@Body() feepayload: FeePayload) {
        const { studentID, month } = feepayload;

        
        const classID = (await this.studentService.findOne(studentID)).id
        const classOfStudent = (await this.classService.findOne(classID))

        var date = new Date(month);
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        let businessDatesCount = this.feeService.getBusinessDatesCount(firstDay, lastDay)        
        let leaveDay = await this.leaveDayService.getDaysOff(
           {
            query: {
                firstDay,
                lastDay,
                studentID
            }
           }
        );
        
        let daysOff =  0;
        leaveDay.map(x=> daysOff += x.daysOff)
        let fee = Math.round( ( classOfStudent.fee / businessDatesCount) * (businessDatesCount-daysOff))
        const newFee = new Fee()
        newFee.fee = fee;
        newFee.month = month;
        newFee.studentID = studentID;
        newFee.status = "Not Yet"
        newFee.classID = classOfStudent.id.toString()
        return await this.feeService.create(newFee)
    }

    @Put(':id')
    async update(@Body() updateFee: Fee, @Param() { id }) {
        return await this.feeService.update(updateFee, id);
    }

    @Delete(':id')
    async delete(@Param() id) {
        return await this.feeService.delete(id);
    }
}