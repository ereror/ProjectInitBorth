const usermanager = r => require.ensure([], () => r(require('@/views/userManager')), 'usermanager')
const userset = r => require.ensure([], () => r(require('@/views/userManager/userManager')), 'userset')
const userInfo = r => require.ensure([], () => r(require('@/views/userManager/userInfo')), 'userInfo')
const roomlist = r => require.ensure([], () => r(require('@/views/userManager/roomlist')), 'roomlist')

export default {
  name: 'usermanager',
  path: '/usermanager',
  component: usermanager,
  redirect: '/usermanager/userset',
  children: [{
    path: 'userset',
    name: 'userset',
    component: userset
  }, {
    path: 'userInfo',
    name: 'userInfo',
    component: userInfo
  }, {
    path: 'roomlist',
    name: 'roomlist',
    component: roomlist
  }],
  meta: {
    requiresAuth: false
  }
}
