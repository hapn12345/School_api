import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { Student } from "./models/students.schema";
import { StudentService } from "./students.service";

@Controller('students')
export class StudentController {
    constructor(private studentService: StudentService) { }

    @Get('')
    async findAll() {
        return await this.studentService.findAll()
    }

    @Get('/class')
    async findByClass(@Query() query) {
        return await this.studentService.findMany({
            query,
        })
    }

    @Post('')
    async create(@Body() student: Student) {
        return await this.studentService.create(student)
    }

    @Get(':id')
    async findOne(@Param() id) {
        return await this.studentService.findOne(id)
    }

    @Put(':id')
    async update(@Body() student: Student, @Param() id) {
        return await this.studentService.update(student, id)
    }

    @Delete(':id')
    async delete(@Param() id) {
        return await this.studentService.delete(id)
    }
}