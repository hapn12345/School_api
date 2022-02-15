import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { MenuService } from "./menu.service";
import { Menu } from "./models/menu.schema";
import { IMenu } from "./models/menu.interface";
@Controller('menu')
export class MenuController {
    constructor(private classService: MenuService) { }

    @Get('')
    async findAll() {
        return await this.classService.findAll()
    }

    @Get(':id')
    async findOne(@Param() id) {
        return await this.classService.findOne(id)
    }

    @Get('/class/:id')
    async findByClassID(@Param() id) {
        return await this.classService.getMenuByClassID(id)
    }

    @Post('')
    async create(@Body() oneMenu: IMenu) {
        return await this.classService.create(oneMenu)
    }

    @Put(':id')
    async update(@Body() updateMenu: IMenu, @Param() id) {
        return await this.classService.update(updateMenu, id);
    }

    @Delete(':id')
    async delete(@Param() id) {
        return await this.classService.delete(id);
    }
}