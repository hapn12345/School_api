import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Meeting } from "./models/meeting.schema";
import { MeetingController } from "./meeting.controller";
import { MeetingService } from "./meeting.service";

@Module({
    imports: [TypeOrmModule.forFeature([Meeting])],
    controllers: [MeetingController],
    providers: [MeetingService],
    exports: [MeetingService]
})

export class MeetingModule { }