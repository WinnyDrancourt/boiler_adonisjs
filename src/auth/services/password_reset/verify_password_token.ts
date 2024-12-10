import encryption from '@adonisjs/core/services/encryption'
import { PasswordResetTokenRepository } from '#auth/repositories/password_reset_token.repository'

type Params = {
  encryptedValue: string
}

export default class VerifyPasswordResetToken {
  static async handle({ encryptedValue }: Params) {
    const passwordResetTokenRepository = new PasswordResetTokenRepository()
    const value = encryption.decrypt(encryptedValue)
    if (typeof value !== 'string') {
      throw new Error('Invalid encrypted value')
    }
    const token = await passwordResetTokenRepository.findByValueWithUser(value)
    if (!token) {
      return {
        isValid: false,
        token: null,
        user: null,
      }
    }
    return {
      isValid: token.isValid,
      token,
      user: token.user,
    }
  }
}
