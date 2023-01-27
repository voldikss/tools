import { Module } from '@nestjs/common'

import { ChatV2Server } from './chat-v2.server'

@Module({
  providers: [ChatV2Server],
})
export class ChatV2Module {}
