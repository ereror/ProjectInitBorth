const setmanager = r => require.ensure([], () => r(require('@/views/setManager')), 'setmanager')
const giftset = r => require.ensure([], () => r(require('@/views/setManager/giftlist')), 'giftset')
const giftadd = r => require.ensure([], () => r(require('@/views/setManager/giftadd')), 'giftadd')
const timeset = r => require.ensure([], () => r(require('@/views/setManager/timeset')), 'timeset')
const txset = r => require.ensure([], () => r(require('@/views/setManager/getprize')), 'txset')
const applycode = r => require.ensure([], () => r(require('@/views/setManager/applycode')), 'txcode')
export default {
  name: 'setmanager',
  path: '/setmanager',
  component: setmanager,
  redirect: '/setmanager/giftset',
  children: [{
    path: 'timeset',
    name: 'timeset',
    component: timeset
  }, {
    path: 'giftset',
    name: 'giftset',
    component: giftset
  }, {
    path: 'giftadd/:id?',
    name: 'giftadd',
    component: giftadd
  }, {
    path: 'txset',
    name: 'txset',
    component: txset
  }, {
    path: 'applycode',
    name: 'applycode',
    component: applycode
  }],
  meta: {
    requiresAuth: false
  }
}
