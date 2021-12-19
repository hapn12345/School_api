import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { FindManyUserAccessInteface, UserAccessInterface } from "./models/user_access.interface";
import { UserAccess } from "./models/user_access.schema";

@Injectable()
export class UserAccessService {
    constructor(
        @InjectRepository(UserAccess)
        private userAccessRepository: Repository<UserAccess>
    ) { }

    async create(userAcess: UserAccessInterface): Promise<UserAccess> {
        return await this.userAccessRepository.save(userAcess);
    }

    async findMany({
        query
    }: FindManyUserAccessInteface): Promise<UserAccess[]> {
        return await this.userAccessRepository.find({
            where: query
        });
    }

    async update(updateData: UserAccess, id): Promise<UserAccess> {
        try {
            const userAccess = await this.userAccessRepository.findOne(id);
            if (!userAccess) {
                throw new NotFoundException('UserAccessNotFound')
            }
            const updatedUserAccess = await this.userAccessRepository.save({
                ...userAccess,
                ...updateData
            })
            return updatedUserAccess
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async delete(id): Promise<DeleteResult> {
        try {
            const userAccess = await this.userAccessRepository.findOne(id);
            if (!userAccess) {
                throw new NotFoundException('UserAccessNotFound')
            }
            return await this.userAccessRepository.delete(id);
        } catch (error) {
            return Promise.reject(error)
        }

    }
}