import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { scopes } from "src/constants/scopes";
import { Scopes } from "src/middlewares/authz";
import { NewsService } from "./news.service";
import { News } from "./models/news.schema";

@Controller('news')
export class NewsController {
    constructor(
        private newsService: NewsService,
    ) { }

    @Post('')
    async create(@Body() news: News) {
        return await this.newsService.create(news)
    }

    @Put(':id')
    async update(@Body() updateNews: News, @Param() { id }) {
        return await this.newsService.update(updateNews, id);
    }
    @Delete(':id')
    async delete(@Param() id) {
        return await this.newsService.delete(id);
    }
    @Get(':id')
    async findOne(@Param() id) {
        return await this.newsService.findOne(id)
    }
    
    @Get('')
    async findFeeMonth(@Query() query) {
        return await this.newsService.findMany({
            query,
        })
    }
}