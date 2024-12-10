import { UserRepository } from '#auth/repositories/user.repository'
import { RegisterUserDTO } from '#auth/dtos/user.dto'
import { HttpContext } from '@adonisjs/core/http'
import { AuthServices } from '#auth/services/auth.services'
import { toLoginUserDTO } from '#auth/dtos/to_user.dto'

export class RegisterServices {
  private userRepository: UserRepository
  private authService: AuthServices

  constructor() {
    this.userRepository = new UserRepository()
    this.authService = new AuthServices()
  }

  async register(data: RegisterUserDTO, auth?: HttpContext['auth']) {
    const user = this.userRepository.create(data)
    const userLogin = toLoginUserDTO(user)
    if (auth) {
      await this.authService.authenticate(userLogin, auth)
    }
    return user
  }
}
