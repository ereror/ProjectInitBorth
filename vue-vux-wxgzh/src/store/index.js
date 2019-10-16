import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import loading from './modules/loading'
import wxToken from './modules/wxtoken'

const store = new Vuex.Store({
  modules: { loading, wxToken }
})

export default store
