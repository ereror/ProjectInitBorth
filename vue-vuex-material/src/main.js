// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// for vuex
import store from './store'

// one way for all component
// we can import components we actually need, making the project smaller than otherwise.
// http://element.eleme.io/#/zh-CN/component/quickstart
import ElementUI from 'element-ui'
// npm run theme:build
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/build/css/mdb.css'

// import MuseUI from 'muse-ui'

// import 'muse-ui/dist/muse-ui.css'

// import theme from 'muse-ui/lib/theme'

// theme.use('dark')
Vue.config.productionTip = false

// Vue.use(MuseUI)

// animate.css
// import 'animate.css'
// 自制组件
import './components'

// filters
import './filters'

// 根组件
import App from './App'

// 路由
import router from './router'

// init app
const app = new Vue({
  router,
  store,
  ...App
})

app.$mount('#app')

export { app, router }

// 阻止直接拖拽一些文件到我们的 app
window.ondragover = preventDefault
window.ondrop = preventDefault

function preventDefault(ev) {
  ev.preventDefault()
  return false
}
