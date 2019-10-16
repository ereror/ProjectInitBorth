import Vue from 'vue'

import commonComponent from './common'
const components = { ...commonComponent }
Object.keys(components).forEach(key => Vue.component(components[key].name, components[key]))

// svg icon
import Icon from './icon'
import IconConfig from '@/assets/icon'
IconConfig.source.forEach(v => Icon.inject(v, IconConfig.path))
Vue.component('icon', Icon)
import vueQr from 'vue-qr'
Vue.component('vue-qr', vueQr)
