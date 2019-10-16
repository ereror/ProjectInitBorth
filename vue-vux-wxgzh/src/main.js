// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import store from '@/store/index'

// import ElementUI from 'element-ui'
// // npm run theme:build
// // import 'element-theme-default/doudou-ui/index.css'
// import 'element-ui/lib/theme-default/index.css'
// Vue.use(ElementUI)
// 自制组件
import '@/components'
// 路由
import router from './router'
require('es6-promise').polyfill()
import { AjaxPlugin, LoadingPlugin, ToastPlugin, AlertPlugin, ConfirmPlugin, Qrcode } from 'vux'
Vue.use(AjaxPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(Qrcode)

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
const app = new Vue({
  router,
  store,
  ...App
})

app.$mount('#app-box')

export { app, router }
