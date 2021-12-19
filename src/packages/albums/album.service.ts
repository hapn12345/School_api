import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { Album } from "./models/album.schema";

@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(Album)
        private albumRepos: Repository<Album>
    ) { }

    async findAll(): Promise<Album[]> {
        return await this.albumRepos.find();
    }

    async getAlbumByClassID(classID): Promise<Album> {
        return await this.albumRepos.findOne({
            where: {
                classID: classID
            }
        });
    }

    async findOne(id): Promise<Album> {
        return await this.albumRepos.findOne(id);
    }

    async create(album: Album): Promise<Album> {
        return await this.albumRepos.save(album);
    }

    async update(updateData: Album, id): Promise<Album> {
        try {
            const album = await this.albumRepos.findOne(id);

            if (!album) {
                throw new NotFoundException('AlbumNotFound');
            }

            const updateAlbum = await this.albumRepos.save({
                ...album,
                ...updateData
            })

            return updateAlbum
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async delete(id): Promise<DeleteResult> {
        try {
            const album = await this.albumRepos.findOne(id)
            if (!album) {
                throw new NotFoundException('AlbumNotFound')
            }
            return await this.albumRepos.delete(id)

        } catch (error) {
            return Promise.reject(error)
        }
    }
}