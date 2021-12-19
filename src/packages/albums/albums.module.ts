import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlbumService } from "./album.service";
import { AlbumController } from "./albums.controller";
import { Album } from "./models/album.schema";

@Module({
    imports: [TypeOrmModule.forFeature([Album])],
    providers: [AlbumService],
    controllers: [AlbumController]
})

export class AlbumModule { }