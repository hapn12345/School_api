import { Body, Controller, InternalServerErrorException, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FireBaseService } from "./firebase.service";

@Controller('firebase')
export class FirebaseController {
    constructor(
        private fbService: FireBaseService,
    ) { }

    @Post('')
    @UseGuards(AuthGuard('jwt'))
    async subcribeTokenToTopic(@Body() { token }, @Request() { user }) {
        try {
            const userID = user.userId;
            return await this.fbService.subscribeTokenToTopic({
                tokens: [token],
                topic: `user_${userID}`
            });
        } catch (error) {
            return new InternalServerErrorException(error)
        }
    }

    @Post('testPushNotification')
    @UseGuards(AuthGuard('jwt'))
    async sendNotification(@Body() { token }, @Request() { user }) {
        try {
            const topic = 'user_08571390-a779-4bfd-8457-c1a5f276ac85'
            return await this.fbService.sendMessageToTopic({
                topic,
                notification: {
                    body: 'hi',
                    title: 'i am testing',
                    click_action: 'no action'
                }
            })
        } catch (error) {
            return new InternalServerErrorException(error)
        }
    }

}