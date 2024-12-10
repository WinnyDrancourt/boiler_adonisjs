import { HttpContext } from '@adonisjs/core/http'
import { loginValidators } from '#auth/validators/auth.validator'
import { AuthServices } from '#auth/services/auth.services'

export default class LoginController {
  private readonly authService: AuthServices

  constructor() {
    this.authService = new AuthServices()
  }

  async render({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async execute({ auth, request, response, session }: HttpContext) {
    const data = await request.validateUsing(loginValidators)
    const user = await this.authService.authenticate(data, auth)
    if (!user) {
      session.flash('error', 'Login failed.')
      return response.redirect().toRoute('/login')
    }
    session.flash('success', 'Login successful.')
    return response.redirect().toPath('/')
  }
}
