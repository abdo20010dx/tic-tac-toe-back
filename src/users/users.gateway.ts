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
    socket.broadcast.emit(rtcRequest?.receiver + '-offer', rtcRequest); // send offer to all other connected clients
  }

  @SubscribeMessage('answer')
  asnwer(
    @MessageBody() rtcRequest: RtcRequest,
    @ConnectedSocket() socket: Socket,
  ) {
    socket.broadcast.emit(rtcRequest?.receiver + '-answer', rtcRequest); // send answer to all other connected clients
  }

  @SubscribeMessage('ice-candidate')
  candidate(
    @MessageBody() rtcRequest: RtcRequest,
    @ConnectedSocket() socket: Socket,
  ) {
    socket.broadcast.emit(rtcRequest?.receiver + '-candidate', rtcRequest); // send candidate to all other connected clients
  }


}
