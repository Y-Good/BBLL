import { BadRequestException, Logger } from '@nestjs/common';
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
import { Room } from 'src/common/interfaces/ws_room.interfaces';
import { getFindKey } from 'src/utils/common.utils';
import { UserService } from '../user/user.service';

@WebSocketGateway(3003, { transports: ['websocket'] })
export class WsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;
  constructor(private readonly userService: UserService) { }

  private logger: Logger = new Logger('ChatGateway');

  socketList: any = {};
  roomList: Array<Room> = [];

  userId: string;
  videoId: any;
  room: string;

  afterInit(server: any) {
    this.logger.log('websocket init ...');
  }
  async handleConnection(socket: Socket) {
    this.userId = socket.handshake.query.userId as string;
    this.videoId = socket.handshake.query.videoId;
    let joinRoom = socket.handshake.query.room as string;
    this.socketList[this.userId] = socket.id;

    console.log('userID:' + this.userId);
    console.log('videoId:' + this.videoId);
    console.log('room:' + joinRoom);
    console.log('------------');

    //房间名
    this.room = joinRoom != null ? joinRoom : socket.id;
    console.log(this.room);

    for (let index = 0; index < this.roomList.length; index++) {
      const e = this.roomList[index];
      if (e.room != this.room) {
        this.wss.emit('error', '房间不存在');
        socket.disconnect();
      }
    }

    socket.join(this.room); ///加入房间

    if (this.videoId != null) {
      this.roomList.push({
        userId: this.userId,
        videoId: this.videoId,
        room: this.room,
      });
    }
    ///在线人数
    // console.log(Object.keys(this.socketList).length);

    this.wss.to(this.room).emit('online', Object.keys(this.socketList).length);

    let user = await this.userService.getProfile(parseInt(this.userId));
    ///进入消息
    this.wss.to(this.room).emit('join', user.nickname + '进入房间');
    // console.log('id:' + socket.id + '进入');
  }

  handleDisconnect(socket: Socket) {
    if (this.socketList.hasOwnProperty(this.userId)) {
      //删除
      this.logger.log('删除' + this.socketList[this.userId]);
      delete this.socketList[this.userId];
      ///删除房间
      let index: number;
      for (let i = 0; i < this.roomList.length; i++) {
        const e = this.roomList[i];
        if ((e.userId = this.userId)) {
          index = i;
        }
      }

      if (index != null) this.roomList.splice(index, 1);
    }
    this.wss.to(this.room).emit('online', Object.keys(this.socketList).length);
  }

  @SubscribeMessage('msg')
  async handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ) {
    let userId = getFindKey(socket.id, this.socketList);
    let user = await this.userService.getProfile(parseInt(userId));

    this.wss.to(this.room).emit('room', { data: data, user: user }); ///房间消息
  }
}
