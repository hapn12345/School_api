import { Module } from "@nestjs/common";
import { FirebaseController } from "./firebase.controller";
import { FireBaseService } from "./firebase.service";

@Module({
    providers: [FireBaseService],
    controllers: [FirebaseController],
})

export class FirebaseModule { }