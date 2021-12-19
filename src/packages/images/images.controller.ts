import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { CloudinaryService } from "./images.service";

@Controller('images')

export class CloudinaryController {
    constructor(private cloudinaryService: CloudinaryService) { }

    @Post('/')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@UploadedFile() file: Express.Multer.File) {
        try {
            const image = await this.cloudinaryService.uploadFile(file.buffer.toString('base64'))
            console.log('iamge', image)
            return image.url
        } catch (error) {
            return error
        }
    }

    @Post('/multiple')
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'thumbnail', maxCount: 1 },
            { name: 'slideOne', maxCount: 1 },
            { name: 'slideTwo', maxCount: 1 },
            { name: 'slideThree', maxCount: 1 },
            { name: 'slideFour', maxCount: 1 },
        ])
    )
    async uploadMultipleImage(@UploadedFiles() { thumbnail, slideOne, slideTwo, slideThree, slideFour }) {
        try {
            const promise = []
            const listIndex = []

            if (thumbnail?.length && thumbnail[0].buffer) {
                promise.push(
                    this.cloudinaryService.uploadFile(thumbnail[0].buffer.toString('base64'))
                )
                listIndex.push(0)
            }

            if (slideOne?.length && slideOne[0].buffer) {
                promise.push(
                    this.cloudinaryService.uploadFile(slideOne[0].buffer.toString('base64'))
                )
                listIndex.push(1)
            }

            if (slideTwo?.length && slideTwo[0].buffer) {
                promise.push(
                    this.cloudinaryService.uploadFile(slideTwo[0].buffer.toString('base64'))
                )
                listIndex.push(2)
            }

            if (slideThree?.length && slideThree[0].buffer) {
                promise.push(
                    this.cloudinaryService.uploadFile(slideThree[0].buffer.toString('base64'))
                )
                listIndex.push(3)
            }

            if (slideFour?.length && slideFour[0].buffer) {
                promise.push(
                    this.cloudinaryService.uploadFile(slideFour[0].buffer.toString('base64'))
                )
                listIndex.push(4)
            }

            const listImages = await Promise.all(promise)

            return { listImages, listIndex }
        } catch (error) {
            return error
        }
    }
}
