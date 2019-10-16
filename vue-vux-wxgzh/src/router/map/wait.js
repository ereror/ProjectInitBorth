const wait = r => require.ensure([], () => r(require('@/views/wechat/help/wait')), 'wait')

export default {
  name: 'wait',
  path: '/wait',
  component: wait
}
