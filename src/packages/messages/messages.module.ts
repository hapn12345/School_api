import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SocketModule } from "../socket/socket.module";
import { UserModule } from "../users/users.module";
import { MessageController } from "./messages.controller";
import { MessageService } from "./messages.service";
import { Message } from "./models/messages.schema";

@Module({
    imports: [
        TypeOrmModule.forFeature([Message]),
        UserModule,
        SocketModule
    ],
    providers: [MessageService],
    controllers: [MessageController]
})

export class MessageModule { }