import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common'
import { Response } from 'express'

import { PublicResource } from '../../decorators/access.decorator'
import { CurrentUser } from '../../decorators/current-user.decorator'
import { AuthHelper } from '../auth/auth.helper'
import { AUTH_JWT_NAME, AUTH_SESSION_EXPIRES_SECONDS } from '../auth/defines'
import { UserCreateDTO, UserLoginDTO } from './user.dto'
import { User } from './user.entity'
import { UserService } from './user.service'
import { encrypt } from './utils'

@Controller('api/v1/users')
export class UserController {
  constructor(protected readonly userService: UserService, protected readonly authHelper: AuthHelper) {}

  @Get()
  @PublicResource()
  async list() {
    return await this.userService.searchMany({})
  }

  @Post()
  async create(@Body() input: UserCreateDTO) {
    const password = await encrypt(input.password)
    return await this.userService.createOne({ ...input, password })
  }

  @PublicResource()
  @Post('/login')
  async login(@Body() input: UserLoginDTO, @Res() res: Response) {
    const user = await this.userService.login(input)
    const token = this.authHelper.createToken(user.id)
    res.cookie(AUTH_JWT_NAME, token, {
      httpOnly: true,
      maxAge: 1000 * AUTH_SESSION_EXPIRES_SECONDS,
    })
    res.json(user)
  }

  @PublicResource()
  @Post('/register')
  async register(@Body() input: UserCreateDTO, @Res() res: Response) {
    const password = await encrypt(input.password)
    const user = await this.userService.createOne({ ...input, password })
    const token = this.authHelper.createToken(user.id)
    res.cookie(AUTH_JWT_NAME, token, {
      httpOnly: true,
      maxAge: 1000 * AUTH_SESSION_EXPIRES_SECONDS,
    })
  }

  @Get('/logout')
  logout(@Res() res: Response) {
    res.clearCookie(AUTH_JWT_NAME)
  }

  @Get('/me')
  async me(@CurrentUser() user: User) {
    return user
  }

  @Get('/:id')
  async get(@Param('id') id: string) {
    return await this.userService.searchOne({ id })
  }
}
