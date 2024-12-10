import { UserRepository } from '#auth/repositories/user.repository'
import { LoginUserDTO, UserDTO } from '#auth/dtos/user.dto'
import { HttpContext } from '@adonisjs/core/http'
import { toUserDTO } from '#auth/dtos/to_user.dto'
import User from '#models/user'

export class AuthServices {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async validateCredentials(data: LoginUserDTO): Promise<User | null> {
    return this.userRepository.findByCredentials(data)
  }

  async authenticate(data: LoginUserDTO, auth: HttpContext['auth']): Promise<UserDTO | null> {
    const user = await this.validateCredentials(data)
    if (!user) {
      return null
    }
    await auth.use('web').login(user, data.remember)
    return toUserDTO(user)
  }

  async logout(auth: HttpContext['auth']) {
    await auth.use('web').logout()
  }
}
