import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { UsersService } from './users.service';
import { RtcRequest } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Server, Socket } from "socket.io"

@WebSocketGateway({ cors: true })
export class UsersGateway {
  constructor(private readonly usersService: UsersService) { }


  @WebSocketServer()
  server: Server;

  @SubscribeMessage('offer')
  offer(
    @MessageBody() rtcRequest: RtcRequest,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log('Offer received:', rtcRequest);
    socket.broadcast.emit(rtcRequest?.sender, rtcRequest); // send offer to all other connected clients
  }

  @SubscribeMessage('answer')
  asnwer(
    @MessageBody() rtcRequest: RtcRequest,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log('Answer received:', rtcRequest);
    socket.broadcast.emit(rtcRequest?.sender, rtcRequest); // send answer to all other connected clients
  }

  @SubscribeMessage('ice-candidate')
  candidate(
    @MessageBody() rtcRequest: RtcRequest,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log('ICE candidate received:', rtcRequest);
    socket.broadcast.emit(rtcRequest?.sender, rtcRequest); // send candidate to all other connected clients
  }


}
