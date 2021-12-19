import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { Message } from './models/messages.schema';
import { MessageInterface } from './models/message.inteface'

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private messageRepos: Repository<Message>
    ) { }

    async findMany({
        query
    }): Promise<Message[]> {
        const { userId, currentUserId, skip = 0 } = query

        const condition = {
            target: userId,
            sender: currentUserId,
        }

        const orCondition = {
            target: currentUserId,
            sender: userId,
        }

        const messages = await this.messageRepos.find({
            where: [condition, orCondition],
            relations: ['sender', 'target'],
            order: {
                createdAt: 'DESC'
            },
            take: 20,
            skip: skip
        });

        return messages
    }

    async findOne(id): Promise<Message> {
        return await this.messageRepos.findOne({
            where: {
                id
            },
            relations: ['sender', 'target'],
        });
    }

    async create(message: MessageInterface): Promise<Message> {
        return await this.messageRepos.save(message);
    }

    async update(updateData: MessageInterface, id): Promise<Message> {
        try {
            const message = await this.messageRepos.findOne(id)
            if (!message) {
                throw new NotFoundException('MessageNotFound')
            }
            const updateMessage = await this.messageRepos.save({
                ...message,
                ...updateData
            })
            return updateMessage
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async delete(id): Promise<DeleteResult> {
        try {
            const message = await this.messageRepos.findOne(id)
            if (!message) {
                throw new NotFoundException('MessageNotFound')
            }
            return await this.messageRepos.delete(id)

        } catch (error) {
            return Promise.reject(error)
        }
    }
}