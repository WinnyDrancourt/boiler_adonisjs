import type { HttpContext } from '@adonisjs/core/http'
import { registerValidators } from '#auth/validators/auth.validator'
import { RegisterUserDTO } from '#auth/dtos/user.dto'
import { RegisterServices } from '#auth/services/register.services'

export default class RegisterController {
  private registerService: RegisterServices

  constructor() {
    this.registerService = new RegisterServices()
  }

  async render({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  async execute({ request, response }: HttpContext) {
    const data = await request.validateUsing(registerValidators)
    const registerUserDTO: RegisterUserDTO = {
      username: data.username,
      email: data.email,
      password: data.password,
    }
    await this.registerService.register(registerUserDTO)
    return response.redirect().toPath('/')
  }
}
