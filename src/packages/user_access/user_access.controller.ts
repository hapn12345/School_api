import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common"
import { UserAccess } from "./models/user_access.schema"
import { UserAccessService } from "./user_access.service"

@Controller('user_access')
export class UserAccessController {
    constructor(private userAccessService: UserAccessService) { }

    @Get('')
    async findAll(): Promise<UserAccess[]> {
        return await this.userAccessService.findMany({
            query: {}
        })
    }

    @Post('')
    async create(@Body() userAccess: UserAccess) {
        return await this.userAccessService.create(userAccess)
    }

    @Put(':id')
    async update(@Body() userAccess: UserAccess, @Param() id) {
        return await this.userAccessService.update(userAccess, id)
    }

    @Delete(':id')
    async delete(@Param() id) {
        return await this.userAccessService.delete(id)
    }
}