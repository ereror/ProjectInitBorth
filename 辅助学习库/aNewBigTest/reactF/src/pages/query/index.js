import React, {PureComponent} from 'react'
import { codeResult } from '../../utils/index'
import {connect} from 'react-redux';
import {getUserInfo} from "actions/userInfo";
import LocalStorageService from 'services/storage'
import Gzhcode from 'components/Gzhcode'
class query extends PureComponent {
	constructor (props) {
		super(props)
		this.state = {
			query: '',
			mode: '',
			openId: ''
		}
		this.handleClick = this.handleClick.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleAddClick = this.handleAddClick.bind(this)
	}
    componentDidMount () {
    	const search = decodeURIComponent(this.props.location.search)
    	let modes = ''
    	var rec = /(?:type=)(\w*)/ig
    	var resultc = search.match(rec)
    	if (resultc && resultc.length) modes = resultc[0].substring(5)
    	else modes = 'query'
        const search_01 = decodeURIComponent(location.href)
        let code = codeResult(search_01)
        this.props.getUserInfo(code)
    	this.setState({
    		mode: modes
    	})
    }
    componentWillReceiveProps(nextProps) {
        this.state.openId = nextProps.userInfo.openId
    }
	handleClick () {
		this.props.history.push({ pathname: '/blacklist' , state: { query:  this.state.query, openId: this.state.openId || '' }})
	}
	handleAddClick () {
		this.props.history.push({ pathname: '/addNew', state: { openId: this.state.openId || '' }})
	}
	handleChange (e) {
		this.setState({
			query: e.target.value
		})
	}
	render(){
		const query = this.state.query
		const mode = this.state.mode
		let content = null;
		if (mode === 'query') {
			document.title = '查询曝光'
			content = <div className='query-item flex-w'>
					    <div className='query-title flex-c'>
						<div className='cardbox query-img blue-gradient'>查</div>
						</div>
						<div className='query-ipt'>
							<input placeholder='输入被举报人微信号/手机号/QQ/支付宝/名字' className='ipt-v' value={query} onChange={this.handleChange}/>
						</div>
						<div className='querybtn' onClick={this.handleClick}>查询</div>
					  </div>
		} else {
			document.title = '我要曝光'
			content = <div className='query-item flex-w'>
					    <div className='query-title flex-c'>
							<div className='query-head'>曝光需知</div>
						</div>
						<div className='query-messi'>
							<ul className='query-messi-content'>
								<li>1.不要捏造事实，不要带有人身攻击</li>
								<li>2.为自己言行负责，不要带有违反国家法律法规等内容</li>
								<li>3.如需撤回曝光或申诉，请联系客服</li>
							</ul>
						</div>
						<div className='querybtn' onClick={this.handleAddClick}>我要曝光</div>
					  </div>
		}
		return (
			<div className='page-box query-box flex-c'>
				{ content }
				<div className='query-box-m'>
					< Gzhcode />
				</div>
			</div>
		)
	}	
}

export default connect((userInfo) => userInfo, {getUserInfo})(query)