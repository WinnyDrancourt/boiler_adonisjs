import { HttpContext } from '@adonisjs/core/http'
import { AuthServices } from '#auth/services/auth.services'

export default class LogoutController {
  private readonly authServices: AuthServices

  constructor() {
    this.authServices = new AuthServices()
  }

  async execute({ auth, response, session }: HttpContext) {
    await this.authServices.logout(auth)
    session.flash('success', 'Logout successful.')
    return response.redirect().toPath('/')
  }
}
