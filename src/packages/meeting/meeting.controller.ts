import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Meeting } from "./models/meeting.schema";
import { MeetingService } from "./meeting.service";

@Controller('meeting')

export class MeetingController {
    constructor(private schoolService: MeetingService) { }

    @Get('')
    async findAll() {
        return await this.schoolService.findAll();
    }

    @Get(':id')
    async findOne(@Param() id) {
        return await this.schoolService.findOne(id);
    }

    @Put(':id')
    async update(@Body() school: Meeting, @Param() id) {
        return await this.schoolService.update(school, id);
    }

    @Post('')
    async create(@Body() school: Meeting) {
        return await this.schoolService.create(school);
    }

    @Delete(':id')
    async delete(@Param() id) {
        return await this.schoolService.delete(id);
    }
}