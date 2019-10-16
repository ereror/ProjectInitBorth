import Vue from 'vue'

import commonComponent from './common'
const components = { ...commonComponent }
Object.keys(components).forEach(key => Vue.component(components[key].name, components[key]))

// svg icon
import Icon from './icon'
import IconConfig from '@/assets/icons'
IconConfig.source.forEach(v => Icon.inject(v, IconConfig.path))
Vue.component('icon', Icon)

import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/markPoint'
import 'echarts/lib/component/markLine'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/dataset'
Vue.component('chart', ECharts)

// import VeLine from 'v-charts/lib/line'

// Vue.component('chart', ECharts)

import { Card, Container, Row, Column, Input, Btn, Navbar, Badge, NavbarBrand, NavbarItem, NavbarNav, NavbarCollapse, Fa, ListGroup, ListGroupItem, CardAvatar, FormInline, MdTextarea, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'mdbvue'
Vue.component('mdb-card', Card)
Vue.component('mdb-container', Container)
Vue.component('mdb-row', Row)
Vue.component('mdb-col', Column)
Vue.component('mdb-input', Input)
Vue.component('mdb-btn', Btn)
Vue.component('mdb-navbar', Navbar)
Vue.component('mdb-navbar-brand', NavbarBrand)
Vue.component('mdb-navbar-toggler', NavbarCollapse)
Vue.component('mdb-navbar-nav', NavbarNav)
Vue.component('mdb-icon', Fa)
Vue.component('mdb-nav-item', NavbarItem)
Vue.component('mdb-list-group', ListGroup)
Vue.component('mdb-list-group-item', ListGroupItem)
Vue.component('mdb-avatar', CardAvatar)
Vue.component('form-inline', FormInline)
Vue.component('mdb-textarea', MdTextarea)
Vue.component('mdb-modal', Modal)
Vue.component('mdb-modal-header', ModalHeader)
Vue.component('mdb-modal-title', ModalTitle)
Vue.component('mdb-modal-body', ModalBody)
Vue.component('mdb-modal-footer', ModalFooter)
Vue.component('mdb-badge', Badge)
