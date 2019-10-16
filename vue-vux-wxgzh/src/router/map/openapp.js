const openapp = r => require.ensure([], () => r(require('@/views/wechat/openapp')), 'openapp')

export default {
  name: 'openapp',
  path: '/openapp',
  component: openapp,
  meta: {
    requiresAuth: false
  }
}
