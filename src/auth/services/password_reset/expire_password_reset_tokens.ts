import { PasswordResetTokenRepository } from '#auth/repositories/password_reset_token.repository'
import { UserDTO } from '#auth/dtos/user.dto'

type Params = {
  user: UserDTO
}

export default class ExpirePasswordResetTokens {
  static async handle({ user }: Params) {
    const passwordResetTokenRepository = new PasswordResetTokenRepository()
    await passwordResetTokenRepository.expirePasswordResetTokens(user)
  }
}
