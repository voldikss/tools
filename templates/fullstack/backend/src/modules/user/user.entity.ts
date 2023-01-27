import { Column, Entity } from 'typeorm'

import { BaseEntity, BasePopulateSpec } from '../base/base.entity'

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column()
  username!: string

  @Column({ select: false })
  password!: string

  @Column({ nullable: true })
  email?: string
}

export class UserPopulateSpec extends BasePopulateSpec {}
