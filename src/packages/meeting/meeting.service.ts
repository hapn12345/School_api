import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { Meeting } from "./models/meeting.schema";

@Injectable()
export class MeetingService {
    constructor(
        @InjectRepository(Meeting)
        private meetingRepos: Repository<Meeting>
    ) { }

    async findAll(): Promise<Meeting[]> {
        return await this.meetingRepos.find();
    }

    async findMany({
        query
    }): Promise<Meeting[]> {
        return await this.meetingRepos.find({
            where: query,
        });
    }

    async findOne(id): Promise<Meeting> {
        return await this.meetingRepos.findOne({
            where: id,
            relations: ["class", "teacher", "class.parrent"]
        });
    }

    async create(meeting: Meeting): Promise<Meeting> {
        return await this.meetingRepos.save(meeting);
    }

    async update(updateData: Meeting, id): Promise<Meeting> {
        try {
            const meeting = await this.meetingRepos.findOne(id);
            if (!meeting) {
                throw new NotFoundException('MeetingNotFound');
            }
            const updateMeeting = await this.meetingRepos.save({
                ...meeting,
                ...updateData
            })
            return updateMeeting
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async delete(id): Promise<DeleteResult> {
        try {
            const meeting = await this.meetingRepos.findOne(id);
            if (!meeting) {
                throw new NotFoundException('MeetingNotFound')
            }
            return await this.meetingRepos.delete(id);
        } catch (error) {
            return Promise.reject(error)
        }
    }
}