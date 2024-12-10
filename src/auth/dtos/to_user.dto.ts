import { LoginUserDTO, UserDTO } from '#auth/dtos/user.dto'

export function toUserDTO(user: any): UserDTO {
  if (!user) {
    return null as unknown as UserDTO
  }
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    avatar: user.avatar ?? null,
  }
}

export function toLoginUserDTO(user: any): LoginUserDTO {
  if (!user) {
    return null as unknown as LoginUserDTO
  }
  return {
    email: user.email,
    password: user.password,
    remember: user.remember,
  }
}
