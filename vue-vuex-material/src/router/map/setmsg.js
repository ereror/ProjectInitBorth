const msgManager = r => require.ensure([], () => r(require('@/views/msgManager')), 'msgManager')
const advM = r => require.ensure([], () => r(require('@/views/msgManager/adviceManager')), 'adviceManager')
const goup = r => require.ensure([], () => r(require('@/views/msgManager/goupManager')), 'goup')
export default {
  name: 'msgmanager',
  path: '/msgmanager',
  component: msgManager,
  redirect: '/msgmanager/advm',
  children: [{
    path: 'advm',
    name: 'advm',
    component: advM
  }, {
    path: 'goup',
    name: 'goup',
    component: goup
  }],
  meta: {
    requiresAuth: false
  }
}
