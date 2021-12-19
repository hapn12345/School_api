import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { Participant } from "./models/participant.schema";

@Injectable()
export class ParticipantService {
    constructor(
        @InjectRepository(Participant)
        private participantRepos: Repository<Participant>
    ) { }

    // async findAll(): Promise<Participant[]> {
    //     return await this.participantRepos.find();
    // }

    async findOne(id): Promise<Participant> {
        return await this.participantRepos.findOne(id);
    }

    async findMany({
        query,
    }): Promise<Participant[]> {
        return await this.participantRepos.find({
            where: query,
            relations: ['studentID']
        });
    }

    async create(participant: Participant): Promise<Participant> {
        return await this.participantRepos.save(participant);
    }

    async update(updateData: Participant, id): Promise<Participant> {
        try {
            const participant = await this.participantRepos.findOne(id)
            if (!participant) {
                throw new NotFoundException('ParticipantNotFound')
            }
            const updateParticipant = await this.participantRepos.save({
                ...participant,
                ...updateData
            })
            return updateParticipant
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async delete(id): Promise<DeleteResult> {
        try {
            const participant = await this.participantRepos.findOne(id)
            if (!participant) {
                throw new NotFoundException('ParticipantNotFound')
            }
            return await this.participantRepos.delete(id)

        } catch (error) {
            return Promise.reject(error)
        }
    }
}