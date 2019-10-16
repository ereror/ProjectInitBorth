const we = r => require.ensure([], () => r(require('@/views/wechat/circle')), 'wecle')

const wecle = r => require.ensure([], () => r(require('@/views/wechat/circle/wecle')), 'wecle')

const circleset = r => require.ensure([], () => r(require('@/views/wechat/circle/circleset')), 'circleset')

const circledata = r => require.ensure([], () => r(require('@/views/wechat/circle/circledata')), 'circledata')

const circlepolif = r => require.ensure([], () => r(require('@/views/wechat/circle/polif')), 'circlepolif')

const circlemerber = r => require.ensure([], () => r(require('@/views/wechat/circle/circlemerber')), 'circlemerber')

const circlemerberlist = r => require.ensure([], () => r(require('@/views/wechat/circle/circlemerberlist')), 'circlemerberlist')

const circlehistory = r => require.ensure([], () => r(require('@/views/wechat/circle/circlehistory')), 'circlehistory')

export default {
  name: 'wecle',
  path: '/wecle',
  component: we,
  redirect: '/wecle/circle',
  children: [{
    path: 'circleset',
    name: 'circleset',
    component: circleset
  }, {
    path: 'circle',
    component: wecle
  }, {
    path: 'circledata/:circleId?',
    name: 'circledata',
    component: circledata
  }, {
    path: 'circlehistory/:historyId?',
    name: 'circlehistory',
    component: circlehistory
  }, {
    path: 'circlepolif',
    name: 'circlepolif',
    component: circlepolif
  }, {
    path: 'circlemerber',
    name: 'circlemerber',
    component: circlemerber
  }, {
    path: 'circlemerberlist',
    name: 'circlemerberlist',
    component: circlemerberlist
  }]
}
