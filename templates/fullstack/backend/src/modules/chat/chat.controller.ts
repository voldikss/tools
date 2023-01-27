import { Body, Controller, Get, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { PublicResource } from 'src/decorators/access.decorator'

@Controller('api/v1/chat')
export class ChatController {
  protected readonly responseStore: Response[] = []

  @Get()
  @PublicResource()
  async list() {
    return 'abc,def'
  }

  @Post('publish')
  @PublicResource()
  async publish(@Body() message: string) {
    while (this.responseStore.length > 0) {
      const res = this.responseStore.pop()
      if (!res) return
      res.end(message)
    }
  }

  @Get('subscribe')
  @PublicResource()
  async subscribe(@Res() res: Response) {
    this.responseStore.push(res)
  }
}
