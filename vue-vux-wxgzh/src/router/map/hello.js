const hello = r => require.ensure([], () => r(require('@/views/hello/Hello')), 'hello')

export default {
  name: 'hello',
  path: '/hello',
  component: hello,
  meta: {
    requiresAuth: false
  }
}
