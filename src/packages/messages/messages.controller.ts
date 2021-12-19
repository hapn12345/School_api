import { Body, Controller, Delete, Get, Param, Request, Post, Put, UseGuards, Query } from "@nestjs/common";
import { MessageService } from "./messages.service";
import { Message } from "./models/messages.schema";
import { MessageDto } from "./models/messages.dto";
import { AuthGuard } from "@nestjs/passport";
import { SocketGateway } from "../socket/socket.service";

@Controller('messages')
export class MessageController {
    constructor(
        private messageService: MessageService,
        private socketGateway: SocketGateway,
    ) { }

    @Get('conversations/:userId')
    @UseGuards(AuthGuard('jwt'))
    async findAll(
        @Request() { user },
        @Param() { userId },
        @Query() { skip }
    ) {

        const currentUserId = user.userId

        const messages = await this.messageService.findMany({
            query: {
                userId,
                currentUserId,
                skip: Number(skip)
            }
        })

        return messages
    }

    @Get(':id')
    async findOne(@Param() id) {
        return await this.messageService.findOne(id)
    }

    @Put(':id')
    async update(@Body() message: Message, @Param() id) {
        return await this.messageService.update(message, id)
    }

    @Post('')
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() message: MessageDto, @Request() { user }) {

        const sender = user.userId;

        const newMessage = await this.messageService.create({ ...message, sender });

        const data = await this.messageService.findOne(newMessage.id);

        if (sender === message.target) {
            this.socketGateway.server.to(message.target).emit('message', data);

            return data
        }

        this.socketGateway.server.to(message.target).emit('message', data);

        this.socketGateway.server.to(message.target).emit('notification', data);

        this.socketGateway.server.to(sender).emit('message', data);

        return data
    }

    @Delete(':id')
    async delete(@Param() id) {
        return await this.messageService.delete(id)
    }
}