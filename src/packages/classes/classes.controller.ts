import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ClassService } from "./classes.service";
import { Class } from "./models/classes.schema";

@Controller('classes')
export class ClassController {
    constructor(private classService: ClassService) { }

    @Get('')
    async findAll() {
        return await this.classService.findAll()
    }

    @Get(':id')
    async findOne(@Param() id) {
        return await this.classService.findOne(id)
    }

    @Post('')
    async create(@Body() oneClass: Class) {
        return await this.classService.create(oneClass)
    }

    @Put(':id')
    async update(@Body() updateClass: Class, @Param() id) {
        return await this.classService.update(updateClass, id);
    }
}