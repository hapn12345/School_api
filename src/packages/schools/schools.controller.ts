import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { School } from "./models/schools.schema";
import { SchoolService } from "./schools.service";

@Controller('schools')

export class SchoolController {
    constructor(private schoolService: SchoolService) { }

    @Get('')
    async findAll() {
        return await this.schoolService.findAll();
    }

    @Get(':id')
    async findOne(@Param() id) {
        return await this.schoolService.findOne(id);
    }

    @Put(':id')
    async update(@Body() school: School, @Param() id) {
        return await this.schoolService.update(school, id);
    }

    @Post('')
    async create(@Body() school: School) {
        return await this.schoolService.create(school);
    }

    @Delete(':id')
    async delete(@Param() id) {
        return await this.schoolService.delete(id);
    }
}