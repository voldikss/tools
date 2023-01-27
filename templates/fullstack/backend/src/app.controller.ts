import { Controller, Get } from '@nestjs/common'

import { PublicResource } from './decorators/access.decorator'

@Controller()
export class AppController {
  @PublicResource()
  @Get('/api/health')
  health(): string {
    return 'PASS'
  }
}
