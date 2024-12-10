import { Infer } from '@vinejs/vine/types'
import { passwordResetValidators } from '#auth/validators/auth.validator'
import VerifyPasswordResetToken from '#auth/services/password_reset/verify_password_token'
import { Exception } from '@adonisjs/core/exceptions'
import ExpirePasswordResetTokens from '#auth/services/password_reset/expire_password_reset_tokens'
import { UserRepository } from '#auth/repositories/user.repository'

type Params = {
  data: Infer<typeof passwordResetValidators>
}

export default class ResetPassword {
  static async handle({ data }: Params) {
    const userRepository = new UserRepository()
    const { isValid, user } = await VerifyPasswordResetToken.handle({ encryptedValue: data.value })
    if (!isValid || !user) {
      throw new Exception('Le token est invalide ou expiré', {
        status: 403,
        code: 'E_UNAUTHORIZED',
      })
    }
    await userRepository.updateResetPassword(user, data.password)
    await ExpirePasswordResetTokens.handle({ user: user })
    return user
  }
}
