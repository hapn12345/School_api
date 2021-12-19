import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ActivityController } from "./activities.controller";
import { ActivityService } from "./activities.service";
import { Activity } from "./models/activities.schema";

@Module({
    imports: [TypeOrmModule.forFeature([Activity])],
    controllers: [ActivityController],
    providers: [ActivityService]
})

export class ActivityModule { }