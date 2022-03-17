import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ReqUser } from 'src/common/interfaces/req-user.interface';
import { WsService } from './ws.service';

@WebSocketGateway(3003, { transports: ['websocket'] })
export class WsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;
  constructor() {}

  private logger: Logger = new Logger('ChatGateway');

  socketList: any = {};

  userId: string;
  videoId: string;

  afterInit(server: any) {
    this.logger.log('websocket init ...');
  }
  handleConnection(socket: Socket) {
    this.userId = socket.handshake.query.userId as string;
    this.videoId = socket.handshake.query.videoId as string;
    this.socketList[this.userId] = socket.id;

    socket.join(this.videoId); ///加入房间
    ///在线人数
    this.wss
      .to(this.videoId)
      .emit('online', Object.keys(this.socketList).length);
    ///进入消息
    this.wss.to(this.videoId).emit('join', this.userId + '进入房间');
    console.log('id:' + socket.id + '进入');
  }

  handleDisconnect(socket: Socket) {
    if (this.socketList.hasOwnProperty(this.userId)) {
      //删除
      delete this.socketList[this.userId];
    }

    this.wss
      .to(this.videoId)
      .emit('online', Object.keys(this.socketList).length);
  }

  @SubscribeMessage('msg')
  async handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ) {
    this.wss.to(this.videoId).emit('room', data); ///房间消息
  }
}
