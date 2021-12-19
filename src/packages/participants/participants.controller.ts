import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { Participant } from "./models/participant.schema";
import { ParticipantService } from "./participant.service";

@Controller('participants')
export class ParticipantController {
    constructor(private participantService: ParticipantService) { }

    // @Get('')
    // async findAll() {
    //     return await this.participantService.findAll()
    // }

    @Get('')
    async findHealth(@Query() query) {
        return await this.participantService.findMany({
            query,
        })
    }

    @Get(':id')
    async findOne(@Param() id) {
        return await this.participantService.findOne(id)
    }

    @Put(':id')
    async update(@Body() participant: Participant, @Param() id) {
        return await this.participantService.update(participant, id)
    }

    @Post('')
    async create(@Body() participant: Participant) {
        return await this.participantService.create(participant)
    }

    @Delete(':id')
    async delete(@Param() id) {
        return await this.participantService.delete(id)
    }
}