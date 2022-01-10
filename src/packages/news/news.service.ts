import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { News } from "./models/news.schema";

@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(News)
        private feeRepos: Repository<News>,
    ) { }

    async findMany({
        query
    }): Promise<News[]> {
        const res = await this.feeRepos.find({
            where: query,
        })
        return res
    }

    async findOne(id): Promise<News> {
        return await this.feeRepos.findOne(id)
    }

    async create(data: News): Promise<News> {

        return await this.feeRepos.save(data)
    }

    async update(updateData: News, id): Promise<News> {
        try {
            const fee = await this.feeRepos.findOne(id)
            if (!fee) {
                throw new NotFoundException('NewsNotFound')
            }

            const updateNews = await this.feeRepos.save({
                ...fee,
                ...updateData
            })
            return updateNews
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async delete(id): Promise<DeleteResult> {
        try {
            const fee = await this.feeRepos.findOne(id)
            if (!fee) {
                throw new NotFoundException('NewsNotFound')
            }
            return await this.feeRepos.delete(id)
        } catch (error) {
            return Promise.reject(error)
        }
    }
}