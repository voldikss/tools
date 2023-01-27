import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'

import * as ormconfig from '../ormconfig'
import { AppController } from './app.controller'
import { AuthGuard } from './guards/auth.guard'
import { ReqPathLoggerMiddleware } from './middlewares/logger.middleware'
import { AuthModule } from './modules/auth/auth.module'
import { ChatModule } from './modules/chat/chat.module'
import { ChatV2Module } from './modules/chat-v2/chat-v2.module'
import { ServerSentEventsModule } from './modules/server-sent-events/server-sent-events.module'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...ormconfig,
      autoLoadEntities: true,
    }),
    UserModule,
    AuthModule,
    ChatModule,
    ChatV2Module,
    ServerSentEventsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ReqPathLoggerMiddleware).forRoutes('/')
  }
}
