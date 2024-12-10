import { UserRepository } from '#auth/repositories/user.repository'
import { toUserDTO } from '#auth/dtos/to_user.dto'
import { UserDTO } from '#auth/dtos/user.dto'

export class UserService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async getUserProfile(userId: string): Promise<UserDTO | null> {
    const user = await this.userRepository.findById(userId)
    return user ? toUserDTO(user) : null
  }
}
