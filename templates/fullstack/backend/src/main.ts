import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express'
import * as bodyParser from 'body-parser'
import * as config from 'config'
import * as cookieParser from 'cookie-parser'
import * as express from 'express'

import { AppModule } from './app.module'
import { AuthHelper } from './modules/auth/auth.helper'
import { Request } from './types'

async function bootstrap() {
  const instance = express()
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(instance), {
    cors: {
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    },
  })

  instance.use(cookieParser())
  instance.use(bodyParser.urlencoded({ extended: true }))
  instance.use(bodyParser.json())
  instance.use(bodyParser.text())
  instance.use((req: Request, _res, next) => {
    const authHelper = app.get(AuthHelper)
    authHelper.identify(req).then((user) => {
      if (user) req.user = user
      next()
    })
  })

  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
      skipNullProperties: true,
      skipUndefinedProperties: true,
      transform: true,
    }),
  )

  const port = config.get<number>('app.port')
  await app.listen(port)
}
bootstrap()
