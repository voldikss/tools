import 'reflect-metadata'

import { SetMetadata } from '@nestjs/common'

const PublicAPIToken = Symbol('public-api-token')

export function PublicResource() {
  return (target: {}, key: string, descriptor: PropertyDescriptor) => {
    SetMetadata(PublicAPIToken, true)(target, key, descriptor)
  }
}

export function isPublicClass(ctxClass: object) {
  return Reflect.getMetadata(PublicAPIToken, ctxClass)
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isPublicHandler(ctxHandler: Function) {
  return Reflect.getMetadata(PublicAPIToken, ctxHandler)
}
