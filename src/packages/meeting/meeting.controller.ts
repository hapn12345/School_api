import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Meeting } from "./models/meeting.schema";
import { MeetingService } from "./meeting.service";

@Controller('meeting')

export class MeetingController {
    constructor(private meetingService: MeetingService) { }

    @Get('')
    async findAll() {
        return await this.meetingService.findAll();
    }

    @Get(':id')
    async findOne(@Param() id) {
        return await this.meetingService.findOne(id);
    }

    @Put(':id')
    async update(@Body() meeting: Meeting, @Param() id) {
        return await this.meetingService.update(meeting, id);
    }

    @Post('')
    async create(@Body() meeting: Meeting) {
        return await this.meetingService.create(meeting);
    }

    @Delete(':id')
    async delete(@Param() id) {
        return await this.meetingService.delete(id);
    }
}