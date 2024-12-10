import vine from '@vinejs/vine'

export const registerValidators = vine.compile(
  vine.object({
    username: vine
      .string()
      .trim()
      .minLength(4)
      .maxLength(25)
      .unique(async (db, value) => {
        const exists = await db.from('users').where('username', value).select('id').first()
        return !exists
      }),
    email: vine
      .string()
      .trim()
      .maxLength(255)
      .email()
      .normalizeEmail()
      .unique(async (db, value) => {
        const exists = await db.from('users').where('email', value).select('id').first()
        return !exists
      }),
    password: vine.string().minLength(8),
  })
)

export const loginValidators = vine.compile(
  vine.object({
    email: vine.string().maxLength(255).email().normalizeEmail(),
    password: vine.string(),
    remember: vine.boolean().optional(),
  })
)

export const updateProfileValidators = vine.compile(
  vine.object({
    username: vine.string().trim().minLength(4).maxLength(25).optional(),
    password: vine.string().minLength(8).optional(),
    avatar: vine.string().url().optional(),
  })
)

export const passwordResetSendValidators = vine.compile(
  vine.object({
    email: vine.string().maxLength(255).email().normalizeEmail(),
  })
)

export const passwordResetValidators = vine.compile(
  vine.object({
    value: vine.string(),
    password: vine.string().minLength(8),
  })
)
