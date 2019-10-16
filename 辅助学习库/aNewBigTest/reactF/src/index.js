import React from 'react'
import ReactDom from 'react-dom'
import {HashRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './redux/store'
import Nav from 'components/Nav'
import Hello from 'components/Hello'
import getRouter from './router/router'
import './mock/mock.js';
import 'antd-mobile/dist/antd-mobile.css'
import '@/css/index.js'
ReactDom.render(
	<Provider store={store}>
		<Router>
			{getRouter()}
		</Router>
	</Provider>,
	document.getElementById('app')
)

