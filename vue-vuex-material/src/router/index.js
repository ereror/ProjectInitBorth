import Vue from 'vue'
import Router from 'vue-router'

import routesMap from './map'
// import hooks from './hooks/'
import store from '@/store/index'

import localservice from '@/services/storage'

Vue.use(Router)

const router = new Router({
  mode: 'hash', // pure browser, so required!
  linkActiveClass: 'is-active',
  scrollBehavior: () => ({ y: 0 }),
  routes: routesMap
})

router.beforeEach(function (to, from, next) {
  console.log('路由发生变化了')
  // 权限拦截
  // var userinfo = localservice.get('userinfo')
  // if (!userinfo && to.name !== 'login') {
  //   next({path: '/login', replace: true})
  // }
  // store.commit('updateLoadingStatus', {isLoading: true})
  // // 权限拦截登录
  // if (to.meta.requireAuth) {
  //   if (store.state.loading.isloginroute) {
  //     next()
  //   } else {
  //     next({
  //       path: '/',
  //       query: {redirect: to.fullPath}
  //     })
  //   }
  // } else {
  //   next()
  // }
  //
  console.log(to, from)
  store.state.user.navselected = ""
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
})

// hooks(router)

export default router
