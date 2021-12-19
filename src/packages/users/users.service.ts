import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { CreateUserInteface, FindOneUserQuery } from "./models/users.interface";
import { User } from "./models/users.schema";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async create(user: CreateUserInteface): Promise<User> {
        return await this.userRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findOne(query: FindOneUserQuery): Promise<User> {
        return await this.userRepository.findOne({
            where: query
        });
    }

    async findMany(userId): Promise<User[]> {
        const user = await this.userRepository.find({
            where: userId
        });

        return user;
    }

    async update(updateData: User, id): Promise<User> {
        try {
            const user = await this.userRepository.findOne(id);
            if (!user) {
                throw new NotFoundException('UserNotFound')
            }
            const updatedUser = await this.userRepository.save({
                ...user,
                ...updateData
            })
            return updatedUser
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async delete(id): Promise<DeleteResult> {
        try {
            const user = await this.userRepository.findOne(id);
            if (!user) {
                throw new NotFoundException('UserNotFound')
            }
            return await this.userRepository.delete(id);
        } catch (error) {
            return Promise.reject(error)
        }

    }

}