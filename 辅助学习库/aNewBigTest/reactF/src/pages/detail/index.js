import React, { PureComponent } from 'react'
import gzhService from 'services/gzhcircle'
import { fileServer }  from '../../../build/app'
import { Toast } from 'antd-mobile';
import date from '../../utils/date'
import pic2 from '@/imgs/img1.jpg'
import gzh from '@/imgs/gzh.jpg'
import {connect} from 'react-redux';
import {getUserInfo} from "actions/userInfo";
import { getwxshare } from '../../utils/index'
import LocalStorageService from 'services/storage'
import { codeResult } from '../../utils/index'
import Gzhcode from 'components/Gzhcode'
let isreload = false
class Detail extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			openId: '',
			result: {}
		}
		document.title = '曝光详情'
		this.getDetailTip = this.getDetailTip.bind(this)
		this.dzFunc = this.dzFunc.bind(this)
		this.sharefunc = this.sharefunc.bind(this)
		this.copyCount = this.copyCount.bind(this)
		getwxshare()
	}
    componentDidMount () {
    	let state = this.props.location.state || {}
    	if(!state.id) {
    		state = LocalStorageService.get('detailState') || {}
    	}
    	let { id, openId } = state
    	if (id) {
    		this.state.openId = openId
    		this.state.id = id
    		LocalStorageService.set('detailState', {
    			id: id,
    			openId: openId
    		})
    		this.getDetailTip(id)
    	} else {
    		// 从浏览器分享出去的拿id
	        const search = decodeURIComponent(location.href)
	        let code = codeResult(search)
	        this.props.getUserInfo(code)
    	}

    }
    componentWillReceiveProps(nextProps) {
        // 数据发生变化
        this.state.openId = nextProps.userInfo.openId
		let shareid = ''
		var sharerec = /(?:id=)(\w*)/ig
		var resultc = location.href.match(sharerec)
		if (resultc && resultc.length) shareid = resultc[0].substring(3)
		if (shareid.length) this.getDetailTip(shareid)
    }
    sharefunc(obj) {
    	wx.ready(function(){
    		wx.updateAppMessageShareData({
    			title: obj.title,
    			desc: obj.content,
    			link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6357f5dafdb1c45d&redirect_uri=http%3a%2f%2fwww.hyjjdyg.com%2f%23%2fdetail%3fid%3d' + obj.id + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect',
    			imgUrl: obj.imgurl
    		})
    		wx.updateTimelineShareData({
    			title: obj.title,
    			desc: obj.content,
    			link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6357f5dafdb1c45d&redirect_uri=http%3a%2f%2fwww.hyjjdyg.com%2f%23%2fdetail%3fid%3d' + obj.id + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect',
    			imgUrl: obj.imgurl
    		})
    	})
    }
    componentWillUnmount () {
    	console.log('页面销毁')
    	getwxshare('hide')
    }
    getDetailTip (id) {
    	Toast.loading('数据获取中...', 0)
    	let openId = this.state.openId
    	let that = this
    	gzhService.detailTip({id, openId}).then(res => {
    		if (res.code * 1 === 200) {
    		    let results = res.result
    		    results.createDate = date(results.createDate)
    		    let imgurl = fileServer + results.imgIds[0] || gzh
    		    results.imgurl = imgurl
    		    results.padnumArr = []
    		    results.imgIds.map((v, i) => {
					let fileurl = fileServer + v
			        var image = new Image()
			        image.onload = function() {
			            let padnum = Math.floor(image.height / image.width * 100) + '%'
			            results.padnumArr.push(padnum)
			            // console.log(padnum)
			            // 最后一个触发更新数据操作
			            if (results.imgIds.length && (i === results.imgIds.length - 1)) {
			            	Toast.hide()
				    		that.setState({
				    			result : results
				    		}, () => {
				    			console.log('12313')
				    			console.log(padnum)
				    			console.log('%o', that.state.result)
				    		})
			            }
			        }
			        image.src = fileurl
    		    })
    		    if (!results.imgIds.length) {
    		    	Toast.hide()
		    		that.setState({
		    			result : results
		    		})
    		    }
    		    that.sharefunc(results)
    		    // this.data.result = Object.assign({}, results)
    		} else {
    			Toast.fail('没有获取到当前id：'+ this.state.id +'的详情', 0)
    		}
    	}).catch(res => {
    		Toast.hide()
    		let results = Object.assign({}, this.state.result, {title: '暂无数据'})
    		results.createDate = date(results.createDate)
    		this.setState({
    			result : results
    		})
    	})
    }
    copyCount () {
	    var kl = this.state.result.bWeixin
	    if (!kl) {
	    	Toast.fail('复制失败，内容不能为空', 1)
	    } else {
		    var tempInput = document.createElement('input');
		    tempInput.value = kl
		    tempInput.style.position= 'absolute'
			tempInput.style['z-index']= '-1'
			tempInput.style['top']= '0'
			tempInput.setAttribute('readonly', 'readonly')
		    document.body.appendChild(tempInput)
		    tempInput.select()
		    tempInput.setSelectionRange(0, kl.length)
		    document.execCommand("Copy")
		    document.body.removeChild(tempInput)
		    Toast.success('复制成功', 1)
	    }
    }
    dzFunc(type) {
    	let that = this
    	let oldStatus = this.state.result.dzOrcaiStatus
    	if (isreload) return
    	isreload = true
    	let isactiven = 1 // 是否激活
    	let mode = 0 // 0, 点赞， 1 点赞 取消， 2，踩，3，采取消， 4， 点赞 至 踩， 5 踩至点赞 
    	if (!this.state.result.dzOrcaiStatus) {
    		if (type === 1) mode = 0
    		else mode = 2
    	}
    	if (this.state.result.dzOrcaiStatus === 1) {
    		if (type === 1) mode = 1
    		else mode = 4
    	}
    	if (this.state.result.dzOrcaiStatus === 2) {
    		if (type === 1) mode = 5
    		else mode = 3
    	}
    	if (mode === 0 || mode === 2 || mode === 4 || mode === 5) {
    		isactiven = 1
    	} else isactiven = 0
    	let param = {
    		expId: this.state.id,
    		openId: this.state.openId,
    		actionType: type === 1 ? 0 : 1,
    		actionStatus: isactiven
    	}
		Toast.loading('数据获取中...', 0)
		gzhService.dzOrCai(param).then(res => {
			isreload = false
			if (res.code * 1 === 200) {
				Toast.success('操作成功...', 1)
				// 更新点赞数和状态
				switch(mode) {
					case 0:
						var results = Object.assign({}, that.state.result, {dzNum: ++that.state.result.dzNum, dzOrcaiStatus: 1})
						that.setState({
							result: results
						})
						break;
					case 1:
						var results = Object.assign({}, that.state.result, {dzNum: --that.state.result.dzNum, dzOrcaiStatus: 0})
						that.setState({
							result: results
						})
						break;
					case 2:
						var results = Object.assign({}, that.state.result, {caiNum: ++that.state.result.caiNum, dzOrcaiStatus: 2})
						that.setState({
							result: results
						})
						break;
					case 3:
						var results = Object.assign({}, that.state.result, {caiNum: --that.state.result.caiNum, dzOrcaiStatus: 0})
						that.setState({
							result: results
						})
						break;
					case 4:
						var results = Object.assign({}, that.state.result, {dzNum: --that.state.result.dzNum, caiNum: ++that.state.result.caiNum, dzOrcaiStatus: 2})
						that.setState({
							result: results
						})
						break;
					case 5:
						var results = Object.assign({}, that.state.result, {caiNum: --that.state.result.caiNum, dzNum: ++that.state.result.dzNum, dzOrcaiStatus: 1})
						that.setState({
							result: results
						})
						break;
				}
			} else {
				Toast.fail('操作失败...', 1)
			}
		}).catch(err => {
			isreload = false
			Toast.fail('操作失败...', 1)
		})
    }
	render(){
		// <img src={fileServer + v} className='img-items' key={new Date().getTime() + i} width='690px' height='auto' />
		let result = this.state.result
		let imgList = null
		console.log('%o', result)
		if (result.imgIds && result.imgIds.length) {
			imgList = result.imgIds.map((v, i) => {
				let fileurl = fileServer + v
	            let padnum = result.padnumArr[i]
	            let imgstyle = {
	            	background: 'url(' + fileurl + ')',
	            	paddingBottom: padnum || '100%',
	            	backgroundSize: 'cover'
	            }
		        return (<div className='detailshowimg' style={imgstyle} key={i}></div>)
			}
			)
		} else {
            let imgstyle = {
		            	background: 'url('+ pic2 +')',
		            	paddingBottom: '150%',
		            	backgroundSize: 'cover'
            }
			imgList = <div>
			          	<div className='detailshowimg'></div>
					  </div>
		}
        let userstyle = {
        	background: 'url('+ (result.headImgUrl || pic2) +')',
        	backgroundSize: 'cover'
        }
		return (
			<div className='detailB'>
				<div className='distitle'>
					<span> {result.title || '当前被举报信息'} </span>
				</div>
				<div className='distitleli'>被曝光者微信号</div>
				<div className='cardbox dw-h-one'>
					<div className='dw-show-box'>
						<div className='dw-show-title'>*微信号:</div>
						<div className='dw-show-content'>{result.bWeixin}</div>
						<div className='dw-copy-btn' onClick={() => this.copyCount()}>复制</div>
					</div>
				</div>
				<div className='distitleli'>被曝光者其他资料</div>
				<div className='disitem cardbox flex-b'>
					<div className='dismess flex-c flex-w'>
						<div className='dismess-item flex-c'>
							<div className='dismess-title'>名称/昵称</div>
							<div className='dismess-content'>{result.bName || '被曝光者'}</div>
						</div>
						<div className='dismess-item flex-c'>
							<div className='dismess-title'>手机/电话</div>
							<div className='dismess-content'>{result.bPhone}</div>
						</div>
						<div className='dismess-item flex-c'>
							<div className='dismess-title'>QQ</div>
							<div className='dismess-content'>{result.bQq}</div>
						</div>
						<div className='dismess-item flex-c'>
							<div className='dismess-title'>支付宝/银行卡</div>
							<div className='dismess-content'>{result.bZfb}</div>
						</div>
						<div className='dismess-itemend flex-c'>
							<div className='dismess-title'>其他</div>
							<div className='dismess-content'>{result.bOther}</div>
						</div>
					</div>
				</div>
				<div className='distitleli'>事件内容(该事件由受害者描述与平台无关)</div>
				<div className='detail-box cardbox'>
					<div className='detail-content'>
 						{result.content}
					</div>
					<div className='img-box'>
					  { imgList }
					</div>
				</div>
				<div className='distitleli'>举报者</div>
				<div className='disitem cardbox flex-b'>
					<div className='dismark-02 flex-c'>
						<div className='flex-c flex-w'>
							<div className='dismarki-02' style={userstyle}></div>
						</div>
					</div>
					<div className='dismess flex-c flex-w dismess-02'>
						<div className='dismess-itemend flex-c'>
							<div className='dismess-title f-30'>微信昵称:</div>
							<div className='dismess-content f-30'>{result.nickName}</div>
						</div>
						<div className='dismess-itemend flex-c'>
							<div className='dismess-title f-30'>微信号:</div>
							<div className='dismess-content f-30'>{!(result.anonymous * 1) && result.rWeixin || '（匿名）'}</div>
						</div>
					</div>
				</div>
				<div className='opt-box flex-b'>
					<div className='opt-bar flex-c'>
						<div className='opt-bar-span'>证明</div>
						<div className={['iconfont icon-buoumaotubiao18 f-60 ', result.dzOrcaiStatus === 1 && ' icon-active']} onClick={() => this.dzFunc(1)}></div>
						<div className='dismess-content'>{result.dzNum || 0}</div>
					</div>
					<div className='opt-bar flex-c'>
						<div className='opt-bar-span'>污蔑</div>
						<div className={['iconfont icon-cai f-60 ', result.dzOrcaiStatus === 2 && ' icon-active']} onClick={() => this.dzFunc(2)}></div>
						<div className='dismess-content'>{result.caiNum || 0}</div>
					</div>
				</div>
				<div className='wwe'></div>
				<div className='opt-tip'>
				    <div className='opt-tip-content'>
						<span>查看更多封杀或申诉，请关注微信公众号火眼金睛打妖怪联系客服</span>
					</div>
					<div className='opt-tip-readcount'>
					    阅读{result.readNum || 0}
					</div>
				</div>
                < Gzhcode />
			</div>
		)
	}
}

export default connect((userInfo) => userInfo, {getUserInfo})(Detail)