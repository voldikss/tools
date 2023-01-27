import { Injectable, OnApplicationBootstrap } from '@nestjs/common'
import ws from 'ws'

@Injectable()
export class ChatV2Server implements OnApplicationBootstrap {
  // protected readonly wss: ws.Server
  // protected readonly clients = new Set<ws.Server>()

  constructor() {
    // this.wss = new ws.Server({ port: 8081 })
  }

  onApplicationBootstrap() {
    // this.wss
    //   .on('connection', () => {
    //     console.log('websocket connected')
    //     // this.wsClients.add(this.ws)
    //   })
    //   .on('message', (message) => {
    //     console.log('received', message)
    //     this.clients.forEach(client => {
    //     })
    //   })
    //   .on('close', () => {
    //
    //   })
  }
}
