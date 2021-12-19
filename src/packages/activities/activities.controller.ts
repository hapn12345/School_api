import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ActivityService } from "./activities.service";
import { Activity } from "./models/activities.schema";

@Controller('activities')
export class ActivityController {
    constructor(private activityService: ActivityService) { }
    @Get('')
    async findAll(
        @Query() { studentID }
    ) {
        return await this.activityService.getHasJoinedActivities({
            query: { studentID }
        });
    }

    @Get(':id')
    async findOne(@Param() id) {
        return await this.activityService.findOne(id);
    }

    @Put(':id')
    async update(@Body() activity: Activity, @Param() id) {
        return await this.activityService.update(activity, id);
    }

    @Post('')
    async create(@Body() activity: Activity) {
        return await this.activityService.create(activity);
    }

    @Delete(':id')
    async delete(@Param() id) {
        return await this.activityService.delete(id);
    }
}