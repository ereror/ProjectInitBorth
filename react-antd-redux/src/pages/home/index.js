import React, {PureComponent} from 'react'
// import style from '@/css/index.css'
import { getwxshare } from '../../utils/index'
import { Button } from 'antd-mobile';
export default class Home extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {isGoBacklist: true}
		this.handleClick = this.handleClick.bind(this);
		// this.handleClick()
		getwxshare()
	}
	handleClick () {
		console.log('跳转')
		this.props.history.push({ pathname: '/blacklist' , state: { id: '' }})
	}
	render(){
		return (
			<div className='page-box'>
			    <Button onClick={this.handleClick}>进入查询页</Button>
			</div>
		)
	}
}
