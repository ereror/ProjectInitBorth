const wechat = r => require.ensure([], () => r(require('@/views/wechat/wechat')), 'wechat')

export default {
  name: 'wechat',
  path: '/wechat',
  component: wechat,
  meta: {
    requiresAuth: false
  }
}
