import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken'

@WebSocketGateway()
export class SocketGateway {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('register')
    async subscribeUser(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        const payload: any = await jwt.verify(data.token, 'testsecretasjalsdkalskdlas')

        const { userId } = payload

        client.join(userId)
    }

}