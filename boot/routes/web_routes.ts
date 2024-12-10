import router from '@adonisjs/core/services/router'
import { middleware } from '#boot/kernel'

router.on('/').renderInertia('home', { version: 6 })
router.on('/test').renderInertia('test').use(middleware.auth())
