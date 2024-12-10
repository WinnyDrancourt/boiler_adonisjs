import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class PasswordResetToken extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  @column.dateTime()
  declare expiredAt: DateTime

  @column()
  declare userId: string
  @column()
  declare value: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  get isValid() {
    return this.expiredAt > DateTime.now()
  }
}
