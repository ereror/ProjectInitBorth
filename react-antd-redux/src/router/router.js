import React from 'react'

import { Route, Switch } from 'react-router-dom'

import loadable from 'react-loadable'
import Loading from 'components/Loading'
// 引入页面

const Home = loadable({
	loader: () => import('pages/home'),
	loading: Loading,
	timeout: 10000, // 10 sec
})

const Page = loadable({
	loader: () => import('pages/cousList'),
	loading: Loading,
	timeout: 10000
})

const Counter = loadable({
	loader: () => import('pages/counter'),
	loading: Loading,
	timeout: 10000
})

const Notfound = loadable({
	loader: () => import('pages/default'),
	loading: Loading,
	timeout: 10000
})

const Blacklist = loadable({
	loader: () => import('pages/blacklist'),
	loading: Loading,
	timeout: 10000
})

const Detail = loadable({
	loader: () => import('pages/detail'),
	loading: Loading,
	timeout: 10000	
})

const Query = loadable({
	loader: () => import('pages/query'),
	loading: Loading,
	timeout: 10000	
})

const Addnew = loadable({
	loader: () => import('pages/addnew'),
	loading: Loading,
	timeout: 10000	
})

const Querylist = loadable({
	loader: () => import('pages/querylist'),
	loading: Loading,
	timeout: 10000	
})
// 路由

const getRouter = () => (
	<Switch>
		<Route exact path='/' component={Home} />
		<Route path='/couslist' component={Page} />
		<Route path="/counter" component={Counter} />
		<Route path="/blacklist" component={Blacklist} />
		<Route path="/detail" component={Detail} />
		<Route path="/query" component={Query} />
		<Route path="/addnew" component={Addnew} />
		<Route path="/querylist" component={Querylist} />
		<Route component={Notfound}/>
	</Switch>
);

export default getRouter