// 登录
import loginRoutes from './login'
import usermanagerRoutes from './usermanager'
import setpRoutes from './setp'
import setmsgRoutes from './setmsg'

let homeRoute = {
  name: 'home',
  path: '/'
}

let notFoundRoute = {
  name: 'NotFound',
  path: '*',
  meta: {
    requiresAuth: false
  },
  component: require('@/views/404')
  // require('按需加载')
}

export default [
  homeRoute,
  loginRoutes,
  usermanagerRoutes,
  setpRoutes,
  setmsgRoutes,
  // 404请务必放在最后
  notFoundRoute
]
