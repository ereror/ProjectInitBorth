import Vue from 'vue'
import mModel from './common/model'
const components = { mModel }

Object.keys(components).forEach(key => Vue.component(components[key].name, components[key]))