import { LoginUserDTO, RegisterUserDTO } from '#auth/dtos/user.dto'
import User from '#models/user'

export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return User.findBy('email', email)
  }

  async findById(userId: string): Promise<User | null> {
    return User.findBy('id', userId)
  }

  async findByCredentials(data: LoginUserDTO): Promise<User | null> {
    return await User.verifyCredentials(data.email, data.password)
  }

  async create(data: RegisterUserDTO): Promise<User> {
    const user = new User()
    user.username = data.username
    user.email = data.email
    user.password = data.password

    await user.save()
    return user
  }

  async updateResetPassword(user: User, password: string): Promise<void> {
    await user.merge({ password }).save()
  }
}
