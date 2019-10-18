import Vue from 'vue'
import store from './store'

import './components'
import './filters'

// 根组件
import App from './App'
// 路由
import router from './router'
// 注入样式
// import '@/assets/css/index.js'

// init app
const app = new Vue({
  router,
  store,
  ...App
})

app.$mount('#app')

export { app, router }