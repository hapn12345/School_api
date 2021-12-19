import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { Class } from "./models/classes.schema";

@Injectable()
export class ClassService {
    constructor(
        @InjectRepository(Class)
        private classRepos: Repository<Class>
    ) { }

    async findAll(): Promise<Class[]> {
        return await this.classRepos.find()
    }

    async findMany({
        query
    }): Promise<Class[]> {
        return await this.classRepos.find({
            where: query
        })
    }

    async findOne(id): Promise<Class> {
        return await this.classRepos.findOne(id)
    }

    async create(data: Class): Promise<Class> {
        return await this.classRepos.save(data)
    }

    async update(updateData: Class, id): Promise<Class> {
        try {
            const oneClass = await this.classRepos.findOne(id)
            if (!oneClass) {
                throw new NotFoundException('ClassNotFound')
            }
            const updateClass = await this.classRepos.save({
                ...oneClass,
                ...updateData
            })
            return updateClass
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async delete(id): Promise<DeleteResult> {
        try {
            const oneClass = await this.classRepos.findOne(id)
            if (!oneClass) {
                throw new NotFoundException('ClassNotFound')
            }
            return await this.classRepos.delete(id)
        } catch (error) {
            return Promise.reject(error)
        }
    }
}