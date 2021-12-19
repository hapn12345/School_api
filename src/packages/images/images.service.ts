import { Inject, Injectable, Post } from "@nestjs/common";
import { v2 as cloudinary } from 'cloudinary'
import { configData } from "../../configs/configs";
@Injectable()
export class CloudinaryService {
    constructor() {
        cloudinary.config({
            cloud_name: configData.CLOUDINARY_NAME,
            api_key: configData.CLOUDINARY_API_KEY,
            api_secret: configData.CLOUDINARY_API_SECRET,
        });
    }

    async uploadFile(buffer) {
        try {
            const image = await cloudinary.uploader.upload(`data:image/jpeg;base64,${buffer}`, {
                folder: 'schoolkids'
            })
            return image
        } catch (error) {
            return Promise.reject(error)
        }
    }
}