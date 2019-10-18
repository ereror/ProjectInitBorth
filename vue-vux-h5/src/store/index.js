import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from './/user'
import loading from './loading'

const store = new Vuex.Store({
  modules: { user, loading }
})

export default store