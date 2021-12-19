import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, In, Not, Repository } from "typeorm";
import { Activity } from "./models/activities.schema";

@Injectable()
export class ActivityService {
    constructor(
        @InjectRepository(Activity)
        private activityRepos: Repository<Activity>
    ) { }

    async findAll(): Promise<Activity[]> {
        return await this.activityRepos.find();
    }

    async findOne(id): Promise<Activity> {
        return await this.activityRepos.findOne(id);
    }

    async create(activity: Activity): Promise<Activity> {
        return await this.activityRepos.save(activity)
    }

    async update(updateData: Activity, id): Promise<Activity> {
        try {
            const activity = await this.activityRepos.findOne(id);
            if (!activity) {
                throw new NotFoundException('ActivityNotFound');
            }
            const updateActivity = await this.activityRepos.save({
                ...activity,
                ...updateData
            })
            return updateActivity
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async delete(id): Promise<DeleteResult> {
        try {
            const activity = await this.activityRepos.findOne(id);
            if (!activity) {
                throw new NotFoundException('ActivityNotFound');
            }
            return await this.activityRepos.delete(id)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async getHasJoinedActivities({ query }): Promise<any> {
        try {
            const { studentID } = query

            let activityIDsHasJoined = await this.activityRepos.query(`
                SELECT activityID FROM participant where studentID = ?
            `, [studentID])

            activityIDsHasJoined = activityIDsHasJoined.map(each => each.activityID)

            const [joinedActivities, otherActivities] = await Promise.all([
                this.activityRepos.find({
                    where: {
                        id: In(activityIDsHasJoined)
                    }
                }),
                this.activityRepos.find({
                    where: {
                        id: Not(In(activityIDsHasJoined))
                    }
                }),
            ])

            return {
                joinedActivities,
                activities: otherActivities
            }
        } catch (error) {
            return Promise.reject(error)
        }
    }
}