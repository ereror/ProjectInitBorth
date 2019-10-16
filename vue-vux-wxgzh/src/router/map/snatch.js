const snatch = r => require.ensure([], () => r(require('@/views/wechat/snatch')), 'snatch')

const snatchstart = r => require.ensure([], () => r(require('@/views/wechat/snatch/snatchstart')), 'snatchstart')

const snatchcard = r => require.ensure([], () => r(require('@/views/wechat/snatch/snatchcard')), 'snatchcard')

const shareapp = r => require.ensure([], () => r(require('@/views/wechat/snatch/shareapp')), 'shareapp')

const snatchlq = r => require.ensure([], () => r(require('@/views/wechat/snatch/snatchlq')), 'snatchlq')

const sharecircle = r => require.ensure([], () => r(require('@/views/wechat/snatch/sharecircle')), 'sharecircle')

const wxshare = r => require.ensure([], () => r(require('@/views/wechat/snatch/wxshare')), 'wxshare')

const sharepool = r => require.ensure([], () => r(require('@/views/wechat/snatch/sharepool')), 'sharepool')

const sharepoolresult = r => require.ensure([], () => r(require('@/views/wechat/snatch/sharepoolresult')), 'sharepoolresult')
export default {
  name: 'snatch',
  path: '/snatch',
  component: snatch,
  redirect: '/snatch/snatchstart',
  children: [{
    path: 'snatchstart',
    name: 'snatchstart',
    component: snatchstart
  }, {
    path: 'snatchcard/:id?',
    name: 'snatchcard',
    component: snatchcard
  }, {
    path: 'shareapp',
    name: 'shareapp',
    component: shareapp
  }, {
    path: 'snatchlq',
    name: 'snatchlq',
    component: snatchlq
  }, {
    path: 'sharecircle',
    name: 'sharecircle',
    component: sharecircle
  }, {
    path: 'wxshare',
    name: 'wxshare',
    component: wxshare
  }, {
    path: 'sharepool',
    name: 'sharepool',
    component: sharepool
  }, {
    path: 'sharepoolresult/:id?/:name?/:score?',
    name: 'sharepoolresult',
    component: sharepoolresult
  }]
}
