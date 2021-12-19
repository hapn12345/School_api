import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { StudentHealth } from "./models/student_health.schema";

@Injectable()
export class StudentHealthService {
    constructor(
        @InjectRepository(StudentHealth)
        private studentHealthRepos: Repository<StudentHealth>
    ) { }

    async findAll(): Promise<StudentHealth[]> {
        return await this.studentHealthRepos.find();
    }

    async findOne(id): Promise<StudentHealth> {
        return await this.studentHealthRepos.findOne(id);
    }

    async findMany({
        query
    }): Promise<StudentHealth[]> {
        const res = await this.studentHealthRepos.find({
            where: query,
            // relations: ['studentID']
        })
        return res
    }


    async create(studentHealth: StudentHealth): Promise<StudentHealth> {
        return await this.studentHealthRepos.save(studentHealth);
    }

    async update(updateData: StudentHealth, id): Promise<StudentHealth> {
        try {
            const studentHealth = await this.studentHealthRepos.findOne(id)
            if (!studentHealth) {
                throw new NotFoundException('AlbumNotFound')
            }
            const updateStudentHealth = await this.studentHealthRepos.save({
                ...studentHealth,
                ...updateData
            })
            return updateStudentHealth
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async delete(id): Promise<DeleteResult> {
        try {
            const album = await this.studentHealthRepos.findOne(id)
            if (!album) {
                throw new NotFoundException('AlbumNotFound')
            }
            return await this.studentHealthRepos.delete(id)

        } catch (error) {
            return Promise.reject(error)
        }
    }
}