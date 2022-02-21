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
import { WsService } from './ws.service';


@WebSocketGateway(3003, { transports: ['websocket'] })
export class WsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly wsService: WsService) { }

  private logger: Logger = new Logger('ChatGateway');
  socketList: any = {};

  afterInit(server: any) {
    this.logger.log('websocket init ...');
  }
  handleConnection(socket: Socket) {
    let fromUserID: string = socket.handshake.query.uid.toString();
    this.socketList[fromUserID] = socket.id;
    console.log("id:" + socket.id + "进入");
  }

  handleDisconnect(socket: Socket) {
    let uid: string = socket.handshake.query.uid.toString();
    if (this.socketList.hasOwnProperty(uid)) {
      //删除
      delete this.socketList[uid];
    }
  }

  @WebSocketServer() wss: Server;
  @SubscribeMessage('msg')
  async handleMessage(@ConnectedSocket() socket: Socket, @MessageBody() data: any) {
    console.log(data);
    console.log(socket);
    console.log('socket');


    // this.wss.to(this.socketList[data.toUserID.toString()]).emit('haha', data);
  }
}