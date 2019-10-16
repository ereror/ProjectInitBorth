const index = r => require.ensure([], () => r(require('@/views/wechat/earnings/')), 'earnings')

const earnings = r => require.ensure([], () => r(require('@/views/wechat/earnings/earnings')), 'earnings')

const persondetail = r => require.ensure([], () => r(require('@/views/wechat/earnings/persondetail')), 'earnings')

const circleearnings = r => require.ensure([], () => r(require('@/views/wechat/earnings/circleearnings')), 'circleearnings')

export default {
  name: 'earnings',
  path: '/earnings',
  component: index,
  redirect: '/earnings/index',
  children: [{
    path: 'index',
    name: 'earningsIndex',
    component: earnings
  }, {
    path: 'persondetail',
    name: 'persondetail',
    component: persondetail
  }, {
    path: 'circleearnings',
    name: 'circledetail',
    component: circleearnings
  }]
}
