import { Injectable } from '@nestjs/common';
const NodeMediaServer = require('node-media-server');

@Injectable()
export class AppService {
  getHello() {
let hjhh:string="ss"
    const config = {
      rtmp: {
        port: 1935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 60
      },
      http: {
        port: 8000,
        allow_origin: '*'
      }
    };

    var nms = new NodeMediaServer(config)
    nms.run();
  }
}
