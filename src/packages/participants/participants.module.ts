import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Participant } from "./models/participant.schema";
import { ParticipantService } from "./participant.service";
import { ParticipantController } from "./participants.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Participant])],
    providers: [ParticipantService],
    controllers: [ParticipantController]
})

export class ParticipantModule { }