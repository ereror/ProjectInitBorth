// router配置


//首页
let homeRoute = {
  name: 'home',
  path: '/'
}

// 404
let notFoundRoute = {
  name: 'NotFound',
  path: '*',
  meta: {
    requiresAuth: false
  },
  component: require('@/views/404')
  // require('按需加载')
}

// 用户登录
const userLogin = r => require.ensure([], () => r(require('@/views/login/login')), 'login')

let userLoginRoute = {
  name: 'login',
  path: '/login',
  component: userLogin,
  meta: {
    requiresAuth: false
  }
}

export default {
	menu: [
		homeRoute,
		userLoginRoute,
		notFoundRoute
	]
}