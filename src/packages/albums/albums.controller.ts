import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { AlbumService } from "./album.service";
import { Album } from "./models/album.schema";

@Controller('albums')
export class AlbumController {
    constructor(private albumService: AlbumService) { }

    @Get('')
    async findAll() {
        return await this.albumService.findAll()
    }

    @Get(':id')
    async findOne(@Param() id) {
        return await this.albumService.findOne(id)
    }

    @Get('/class/:id')
    async findByClassID(@Param() id) {
        return await this.albumService.getAlbumByClassID(id)
    }

    @Put(':id')
    async update(@Body() album: Album, @Param() id) {
        const listImg = await this.albumService.findOne(id);

        const { images } = listImg;

        const { images: updateImages, ...updateData } = album;

        images.push(...updateImages);

        return await this.albumService.update({
            images,
            ...updateData
        }, id)
    }

    @Post('')
    async create(@Body() album: Album) {
        return await this.albumService.create(album)
    }

    @Delete(':id')
    async delete(@Param() id) {
        return await this.albumService.delete(id)
    }
}