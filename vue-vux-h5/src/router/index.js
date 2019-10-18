import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
import routesMap from '@/router/Init'


Vue.use(Router)


// 创建路由实例
const router = new Router({
  mode: 'hash',
  linkActiveClass: 'is-active',
  scrollBehavior: () => ({ y: 0 }),
  routes: routesMap.menu
})


router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})
  if (to.meta.requireAuth) {
    if (store.state.loading.isloginroute) {
      next()
    } else {
      next({
        path: '/',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})


router.afterEach(function (to) {
  // 路由跳转后触发事件
  store.commit('updateLoadingStatus', {isLoading: false})
})

export default router
