const activity = r => require.ensure([], () => r(require('@/views/activity')), 'activity')

const detaily = r => require.ensure([], () => r(require('@/views/activity/detaily')), 'activityDetail')

const nowd = r => require.ensure([], () => r(require('@/views/activity/nowd')), 'nowd')
const privateCenter = r => require.ensure([], () => r(require('@/views/activity/privateCenter')), 'privateCenter')
const benefitIndex = r => require.ensure([], () => r(require('@/views/myBenefit/benefitIndex')), 'myBenefit')
const quzon = r => require.ensure([], () => r(require('@/views/myBenefit/quzon')), 'myBenefit')
const qunBenefit = r => require.ensure([], () => r(require('@/views/myBenefit/qunBenefit')), 'myBenefit')
const Record = r => require.ensure([], () => r(require('@/views/myBenefit/Record')), 'myBenefit')
const setting = r => require.ensure([], () => r(require('@/views/myBenefit/setting')), 'myBenefit')
// 提现首页
const drawCrash = r => require.ensure([], () => r(require('@/views/personalCenter/drawCrash')), 'myBenefit')
// 数据中心
const agentData = r => require.ensure([], () => r(require('@/views/personalCenter/agentData')), 'agentData')

// 玩家列表
const userlist = r => require.ensure([], () => r(require('@/views/personalCenter/userList')), 'userlist')
const userset = r => require.ensure([], () => r(require('@/views/personalCenter/userset')), 'userset')
// 活跃度
const inActive = r => require.ensure([], () => r(require('@/views/myBenefit/inActive')), 'myBenefit')
//
const memberDetail = r => require.ensure([], () => r(require('@/views/myBenefit/memberDetail')), 'myBenefit')
//
const tree = r => require.ensure([], () => r(require('@/views/tree')), 'tree')
const tixian = r => require.ensure([], () => r(require('@/views/activity/tixian')), 'tixian')
const txrecode = r => require.ensure([], () => r(require('@/views/myBenefit/txrecode')), 'txrecode')
export default {
  name: 'activity',
  path: '/activity',
  component: activity,
  redirect: '/activity/privateCenter',
  children: [{
    path: 'detaily',
    name: 'detaily',
    component: detaily
  }, {
    path: 'nowd',
    name: 'nowd',
    component: nowd
  }, {
    // 关系树
    path: 'tixian',
    name: 'tixian',
    component: tixian
  }, {
    // 关系树
    path: 'txrecode',
    name: 'txrecode',
    component: txrecode
  }, {
    path: 'privateCenter',
    name: 'privateCenter',
    component: privateCenter
  }, {
    path: 'userlist',
    name: 'userlist',
    component: userlist
  }, {
    path: 'userset',
    name: 'userset',
    component: userset
  }, {
    path: 'benefitIndex',
    name: 'benefitIndex',
    component: benefitIndex
  }, {
    path: 'quzon',
    name: 'quzon',
    component: quzon
  }, {
    path: 'qunBenefit',
    name: 'qunBenefit',
    component: qunBenefit
  }, {
    path: 'record/:id?',
    name: 'record',
    component: Record
  }, {
    path: 'setting/:id?',
    name: 'setting',
    component: setting
  }, {
    path: 'memberDetail/:id?',
    name: 'memberDetail',
    component: memberDetail
  }, {
    path: 'agentData',
    name: 'agentData',
    component: agentData
  }, {
    // 提现
    path: 'drawCrash',
    name: 'drawCrash',
    component: drawCrash
  }, {
    // 活跃度
    path: 'inActive/:circleId?',
    name: 'inActive',
    component: inActive
  }, {
    // 关系树
    path: 'tree',
    name: 'tree',
    component: tree
  }
  ],
  meta: {
    requiresAuth: false
  }
}
