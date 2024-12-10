export interface UserDTO {
  id: string
  username: string
  email: string
  avatar?: string | null
}

export interface RegisterUserDTO {
  username: string
  email: string
  password: string
}

export interface UpdateUserDTO extends Partial<UserDTO> {}

export interface LoginUserDTO {
  email: string
  password: string
  remember: boolean | undefined
}
