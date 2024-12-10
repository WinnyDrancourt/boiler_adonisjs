import router from '@adonisjs/core/services/router'
import { middleware } from '#boot/kernel'

const RegisterController = () => import('#auth/controllers/register.controller')
const LoginController = () => import('#auth/controllers/login.controller')
const LogoutController = () => import('#auth/controllers/logout.controller')
const ForgotPasswordsController = () => import('#auth/controllers/forgot_passwords.controller')

router
  .group(() => {
    router.get('/register', [RegisterController, 'render']).as('register.render')
    router.post('/register', [RegisterController, 'execute']).as('register.execute')
    router.get('/login', [LoginController, 'render']).as('login.render')
    router.post('/login', [LoginController, 'execute']).as('login.execute')
  })
  .as('auth')
  .use(middleware.guest())

router.post('/logout', [LogoutController, 'execute']).as('logout.execute').use(middleware.auth())

router
  .group(() => {
    router.get('/', [ForgotPasswordsController, 'index']).as('index')
    router.post('/', [ForgotPasswordsController, 'send']).as('send')
    router.get('/reset/:value', [ForgotPasswordsController, 'reset']).as('reset')
    router.post('/reset', [ForgotPasswordsController, 'update']).as('update')
  })
  .prefix('/forgot-password')
  .as('forgot_password')
  .use(middleware.guest())
