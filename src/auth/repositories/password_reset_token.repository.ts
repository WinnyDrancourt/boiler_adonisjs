import { DateTime } from 'luxon'
import { UserDTO } from '#auth/dtos/user.dto'
import { UserRepository } from '#auth/repositories/user.repository'
import PasswordResetToken from '#models/password_reset_token'

export class PasswordResetTokenRepository {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async expirePasswordResetTokens(user: UserDTO): Promise<void> {
    const fullUser = await this.userRepository.findById(user.id)
    if (!fullUser) {
      throw new Error('User does not exist')
    }
    await fullUser
      .related('passwordResetToken')
      .query()
      .where('expiredAt', '>=', DateTime.now().toSQL())
      .update({
        expiredAt: DateTime.now().toSQL(),
        updatedAt: DateTime.now().toSQL(),
      })
  }

  async createPasswordResetToken(user: UserDTO, value: string, expiredAt: DateTime): Promise<void> {
    const fullUser = await this.userRepository.findById(user.id)
    if (!fullUser) {
      throw new Error('User does not exist')
    }
    await fullUser.related('passwordResetToken').create({
      value,
      expiredAt,
    })
  }

  async findByValueWithUser(value: string): Promise<PasswordResetToken | null> {
    return await PasswordResetToken.query().where('value', value).preload('user').first()
  }
}
