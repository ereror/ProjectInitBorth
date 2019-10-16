import date from './date'

const filters = {
  date
}

import Vue from 'vue'
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))
