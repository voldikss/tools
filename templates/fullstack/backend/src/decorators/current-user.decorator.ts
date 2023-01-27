import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { Request } from '../types'

export const CurrentUser = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>()
  return request.user
})
