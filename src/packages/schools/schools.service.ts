import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { School } from "./models/schools.schema";

@Injectable()
export class SchoolService {
    constructor(
        @InjectRepository(School)
        private schoolRepos: Repository<School>
    ) { }

    async findAll(): Promise<School[]> {
        return await this.schoolRepos.find();
    }

    async findMany({
        query
    }): Promise<School[]> {
        return await this.schoolRepos.find({
            where: query,
        });
    }

    async findOne(id): Promise<School> {
        return await this.schoolRepos.findOne(id);
    }

    async create(school: School): Promise<School> {
        return await this.schoolRepos.save(school)
    }

    async update(updateData: School, id): Promise<School> {
        try {
            const school = await this.schoolRepos.findOne(id);
            if (!school) {
                throw new NotFoundException('SchoolNotFound');
            }
            const updateSchool = await this.schoolRepos.save({
                ...school,
                ...updateData
            })
            return updateSchool
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async delete(id): Promise<DeleteResult> {
        try {
            const user = await this.schoolRepos.findOne(id);
            if (!user) {
                throw new NotFoundException('UserNotFound')
            }
            return await this.schoolRepos.delete(id);
        } catch (error) {
            return Promise.reject(error)
        }
    }
}