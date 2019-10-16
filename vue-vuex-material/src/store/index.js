// https://vuex.vuejs.org/zh-cn/intro.html
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from './modules/user'
import loading from './modules/loading'

// import report from './modules/report'
const store = new Vuex.Store({
  modules: { user, loading }
})
export default store
