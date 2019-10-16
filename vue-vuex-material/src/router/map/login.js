const userLogin = r => require.ensure([], () => r(require('@/views/login')), 'login')

export default {
  name: 'login',
  path: '/login',
  component: userLogin,
  meta: {
    requiresAuth: false
  }
}
