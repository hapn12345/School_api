import { Module } from "@nestjs/common";
import { CloudinaryController } from "./images.controller";
import { CloudinaryService } from "./images.service";

@Module({
    providers: [CloudinaryService],
    controllers: [CloudinaryController]
})

export class CloudinaryModule { }