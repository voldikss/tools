import { Controller, Get, HttpStatus, Res } from '@nestjs/common'
import { Response } from 'express'
import { PublicResource } from 'src/decorators/access.decorator'

@Controller('api/v1/server-sent-events')
export class ServerSentEventsController {
  @PublicResource()
  @Get()
  async send(@Res() res: Response) {
    res.status(HttpStatus.OK).header('content-type', 'text/event-stream;charset=utf-8')
    await this._send(res)
  }

  async _send(res: Response) {
    let i = 0
    const handler = setInterval(() => {
      if (i === 4) {
        console.log('stopping...')
        res.write(`event: bye\ndata: bye-bye\n\n`)
        res.end()
        clearInterval(handler)
      } else {
        console.log('sending...')
        res.write(`data: ${i}\n\n`)
        i++
      }
    }, 1000)
  }
}
