import Vue from 'vue'

import App from './App.vue'

import store from './store/index.vue'

Vue.config.productionTip = false

Vue.prototype.$store = store

new App({
	store
}).$mount();
