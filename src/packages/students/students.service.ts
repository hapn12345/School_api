import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { Student } from "./models/students.schema";

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private studentRepos: Repository<Student>
    ) { }

    async findAll(): Promise<Student[]> {
        return await this.studentRepos.find();
    }

    async findMany({
        query
    }): Promise<Student[]> {
        return await this.studentRepos.find({
            where: query,
            // relations: ['classID']
        });
    }

    async findOne(id): Promise<Student> {
        console.log(id);
        
        return await this.studentRepos.findOne(id);
    }

    async create(student: Student): Promise<Student> {
        return await this.studentRepos.save(student);
    }

    async update(updateData: Student, id): Promise<Student> {
        try {
            const student = await this.studentRepos.findOne(id)
            if (!student) {
                throw new NotFoundException('StudentNotFound')
            }
            const updateStudent = await this.studentRepos.save({
                ...student,
                ...updateData
            })
            return updateStudent
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async delete(id): Promise<DeleteResult> {
        try {
            const student = await this.studentRepos.findOne(id)
            if (!student) {
                throw new NotFoundException('StudentNotFound')
            }
            return await this.studentRepos.delete(id)

        } catch (error) {
            return Promise.reject(error)
        }
    }
}