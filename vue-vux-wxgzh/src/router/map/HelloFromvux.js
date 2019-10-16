const hellovux = r => require.ensure([], () => r(require('@/views/hello/HelloFromVux')), 'hellovux')

export default {
  name: 'home',
  path: '/home',
  component: hellovux,
  meta: {
    requiresAuth: false
  }
}
