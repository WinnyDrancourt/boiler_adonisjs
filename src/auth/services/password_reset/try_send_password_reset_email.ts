import { UserRepository } from '#auth/repositories/user.repository'
import string from '@adonisjs/core/helpers/string'
import encryption from '@adonisjs/core/services/encryption'
import ExpirePasswordResetTokens from '#auth/services/password_reset/expire_password_reset_tokens'
import router from '@adonisjs/core/services/router'
import env from '#boot/env'
import { DateTime } from 'luxon'
import mail from '@adonisjs/mail/services/main'
import { PasswordResetTokenRepository } from '#auth/repositories/password_reset_token.repository'

type Params = {
  email: string
}

export default class TrySendPasswordResetEmail {
  static async handle({ email }: Params) {
    const userRepository = new UserRepository()
    const passwordResetTokenRepository = new PasswordResetTokenRepository()
    const user = await userRepository.findByEmail(email)
    if (!user) return
    const value = string.generateRandom(32)
    const encryptedValue = encryption.encrypt(value)
    await ExpirePasswordResetTokens.handle({ user })
    await passwordResetTokenRepository.createPasswordResetToken(
      user,
      value,
      DateTime.now().plus({ hour: 1 })
    )

    const resetLink = router
      .builder()
      .prefixUrl(env.get('APP_URL'))
      .params({ value: encryptedValue })
      .make('forgot_password.reset')

    await mail.sendLater((message) => {
      message.subject('Reset Your Password').to(user.email).htmlView('emails/forgot_password', {
        user,
        resetLink,
      })
    })
  }
}
