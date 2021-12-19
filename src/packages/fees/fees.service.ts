import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { Fee } from "./models/fees.schema";

@Injectable()
export class FeeService {
    constructor(
        @InjectRepository(Fee)
        private feeRepos: Repository<Fee>,
    ) { }

    async findMany({
        query
    }): Promise<Fee[]> {
        const res = await this.feeRepos.find({
            where: query,
            relations: ['studentID']
        })
        return res
    }

    async findOne(id): Promise<Fee> {
        return await this.feeRepos.findOne(id)
    }

    async create(data: Fee): Promise<Fee> {

        return await this.feeRepos.save(data)
    }

    async update(updateData: Fee, id): Promise<Fee> {
        try {
            const fee = await this.feeRepos.findOne(id)
            if (!fee) {
                throw new NotFoundException('FeeNotFound')
            }

            const updateFee = await this.feeRepos.save({
                ...fee,
                ...updateData
            })
            return updateFee
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async delete(id): Promise<DeleteResult> {
        try {
            const fee = await this.feeRepos.findOne(id)
            if (!fee) {
                throw new NotFoundException('FeeNotFound')
            }
            return await this.feeRepos.delete(id)
        } catch (error) {
            return Promise.reject(error)
        }
    }
    getBusinessDatesCount(startDate, endDate) {
        let count = 0;
        const curDate = new Date(startDate.getTime());
        while (curDate <= endDate) {
            const dayOfWeek = curDate.getDay();
            if(dayOfWeek !== 0 && dayOfWeek !== 6) count++;
            curDate.setDate(curDate.getDate() + 1);
        }
        return count;
    }
}