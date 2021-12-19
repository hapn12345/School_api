import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClassModule } from "../classes/classes.module";
import { NewsController } from "./news.controller";
import { NewsService } from "./news.service";
import { News } from "./models/news.schema";

@Module({
    imports: [
        ClassModule,
        TypeOrmModule.forFeature([News]),
    ],
    providers: [NewsService],
    controllers: [NewsController],
    exports: [NewsService]
})

export class NewsModule { }