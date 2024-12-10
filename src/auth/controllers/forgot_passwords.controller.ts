import type { HttpContext } from '@adonisjs/core/http'
import {
  passwordResetSendValidators,
  passwordResetValidators,
} from '#auth/validators/auth.validator'
import TrySendPasswordResetEmail from '#auth/services/password_reset/try_send_password_reset_email'
import VerifyPasswordResetToken from '#auth/services/password_reset/verify_password_token'
import ResetPassword from '#auth/services/password_reset/reset_password'

export default class ForgotPasswordsController {
  #sentSessionKey = 'FORGOT_PASSWORD_SENT'

  async index({ inertia, session }: HttpContext) {
    const isSent = session.flashMessages.has(this.#sentSessionKey)
    return inertia.render('auth/forgot_password/index', { isSent })
  }

  async send({ request, response, session }: HttpContext) {
    const data = await request.validateUsing(passwordResetSendValidators)
    await TrySendPasswordResetEmail.handle(data)

    session.flash(this.#sentSessionKey, true)
    return response.redirect().back()
  }

  async reset({ params, inertia }: HttpContext) {
    const { isValid, user } = await VerifyPasswordResetToken.handle({
      encryptedValue: params.value,
    })
    if (!user) {
      return inertia.render('auth/forgot_password/reset', {
        value: params.value,
        email: null,
        isValid: false,
      })
    }

    return inertia.render('auth/forgot_password/reset', {
      value: params.value,
      email: user.email,
      isValid,
    })
  }

  async update({ request, response, session }: HttpContext) {
    const data = await request.validateUsing(passwordResetValidators)
    await ResetPassword.handle({ data })
    session.flash('success', 'Le mot de passe à bien été modifié')
    return response.redirect().toPath('/login')
  }
}
