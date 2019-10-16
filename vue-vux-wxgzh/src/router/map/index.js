// 登录
import helloRoutes from './hello'
import helloVuxRoutes from './HelloFromvux.js'
import wechatRoutes from './wechat'
import openappRoutes from './openapp'
import waitRoutes from './wait'
import wechatcircle from './wechatcircle'
import userproxy from './userproxy'
import earnings from './earnings'
import snatch from './snatch'
import activity from './activity'

let homeRoute = {
  name: 'index',
  path: '/',
  component: require('@/views/index/index')
}

let downloadRoute = {
  name: 'download',
  path: '/download/:open?',
  component: require('@/views/index/download')
}

let downloadios = {
  path: '/downloadios',
  name: 'downloadios',
  component: require('@/views/index/downloadios')
}
/** 首页路由 **/
let duobao = {
  name: 'duobao',
  path: '/duobao',
  component: require('@/views/index/duobao')
}

let joinusRoute = {
  name: 'joinus',
  path: '/joinus',
  component: require('@/views/index/joinus')
}

let companyprofRoute = {
  name: 'companyprof',
  path: '/companyprof',
  component: require('@/views/index/companyprof')
}

let parentcareRoute = {
  name: 'parentcare',
  path: '/parentcare',
  component: require('@/views/index/parentcare')
}

/** 首页路由 **/

let notFoundRoute = {
  name: 'NotFound',
  path: '*',
  meta: {
    requiresAuth: false
  },
  component: require('@/views/404')
}

export default [
  homeRoute,
  joinusRoute,
  companyprofRoute,
  parentcareRoute,
  downloadRoute,
  downloadios,
  duobao,
  helloRoutes,
  helloVuxRoutes,
  wechatRoutes,
  openappRoutes,
  waitRoutes,
  wechatcircle,
  userproxy,
  earnings,
  snatch,
  activity,
  // 404请务必放在最后
  notFoundRoute
]
