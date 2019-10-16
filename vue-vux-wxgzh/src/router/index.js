import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'

import routesMap from './map'

Vue.use(Router)

const router = new Router({
  linkActiveClass: 'is-active',
  scrollBehavior: () => ({ y: 0 }),
  routes: routesMap
})

router.beforeEach(function (to, from, next) {
  var wx = window.wx || {}
  if (wx) {
    wx.ready(function () {
      wx.hideOptionMenu()
    })
  }
  store.commit('updateLoadingStatus', {isLoading: true})
  next()
})

router.afterEach(function (to) {
  var wx = window.wx || {}
  if (wx) {
    wx.ready(function () {
      wx.hideOptionMenu()
    })
  }
  store.commit('updateLoadingStatus', {isLoading: false})
})

export default router
