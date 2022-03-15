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
  constructor(private readonly wsService: WsService) {}

  private logger: Logger = new Logger('ChatGateway');
  socketList: any = {};

  afterInit(server: any) {
    this.logger.log('websocket init ...');
  }
  handleConnection(socket: Socket, @CurrentUser() user: ReqUser) {
    let fromUserID: string = socket.handshake.query.uid as string;
    this.socketList[fromUserID] = socket.id;
    // if (fromUserID != '45') {
    socket.join('hhh'); ///加入房间
    // }

    this.wss.to('hhh').emit('people', Object.keys(this.socketList).length);
    console.log('id:' + socket.id + '进入');
  }

  handleDisconnect(socket: Socket) {
    let uid: string = socket.handshake.query.uid as string;
    if (this.socketList.hasOwnProperty(uid)) {
      //删除
      delete this.socketList[uid];
    }

    this.wss.to('hhh').emit('people', Object.keys(this.socketList).length);
  }

  @WebSocketServer() wss: Server;
  @SubscribeMessage('msg')
  async handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ) {
    console.log(data);
    var ss = await this.wss.in('hhh').allSockets();

    ///房间内人数
    let i = 0;
    ss.forEach((e) => i++);
    this.wss.to('hhh').emit('room', data); ///房间消息
  }

  ///进入房间
  @SubscribeMessage('joinRoom')
  async joinRoom(@ConnectedSocket() socket: Socket, @MessageBody() data: any) {
    let count = await this.wss.in('hhh').allSockets();
    this.wss.to('hhh').emit('join', data + '进入房间'); ///房间消息
  }
}
