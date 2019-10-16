const index = r => require.ensure([], () => r(require('@/views/wechat/userproxy/')), 'userproxy')
// 我的二维码
const qrcode = r => require.ensure([], () => r(require('@/views/wechat/userproxy/myqrcode')), 'userproxy')

const helpdoc = r => require.ensure([], () => r(require('@/views/wechat/userproxy/helpdoc')), 'userproxy')

const helpdetail = r => require.ensure([], () => r(require('@/views/wechat/userproxy/helpdetail')), 'userproxy')

const shareqrcode = r => require.ensure([], () => r(require('@/views/wechat/userproxy/shareqrcode')), 'userproxy')

const fenli = r => require.ensure([], () => r(require('@/views/wechat/userproxy/fenli')), 'fenli')

const recharge = r => require.ensure([], () => r(require('@/views/wechat/userproxy/recharge')), 'recharge')

const myqrcode = r => require.ensure([], () => r(require('@/views/wechat/userproxy/qrcode')), 'myqrcode')

const newqrcode = r => require.ensure([], () => r(require('@/views/wechat/userproxy/newqrcode')), 'newqrcode')

export default {
  name: 'userproxy',
  path: '/userproxy',
  redirect: '/userproxy/myqrcode',
  component: index,
  children: [{
    path: 'qrcode',
    component: qrcode
  }, {
    path: 'helpdoc',
    component: helpdoc
  }, {
    name: 'helpdetail',
    path: 'helpdetail',
    component: helpdetail
  }, {
    path: 'shareqrcode',
    component: shareqrcode
  }, {
    path: 'fenli',
    component: fenli
  }, {
    path: 'recharge',
    component: recharge
  }, {
    path: 'myqrcode',
    component: myqrcode,
    name: 'myqrcode'
  }, {
    path: 'newqrcode',
    component: newqrcode,
    name: 'newqrcode'
  }]
}
