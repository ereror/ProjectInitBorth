import React, { PureComponent }from 'react'
import { Link } from 'react-router-dom'

export default class Nav extends PureComponent {
	render() {
		return (
			<div>
				<ul>
					<li><Link to='/'>首页</Link></li>
					<li><Link to='/couslist'>详情页</Link></li>
					<li><Link to="/counter">Counter</Link></li>
					<li><Link to="/blacklist">Blacklist</Link></li>
				</ul>
			</div>
		)
	}
}