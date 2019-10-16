import React, { PureComponent } from 'react'

const colorMark = [' young-passion-gradient', ' lady-lips-gradient', ' juicy-peach-gradient', ' heavy-rain-gradient']
const yuyu = ' black-content-box-title-markicon-zd-new '
const blwite = ' black-content-box-title-markicon-zd-new-white '

export default class Itemlistq extends PureComponent {
	constructor(props){
		super(props)
		console.log(props.data)
		this.state = {
			resultdata: [],
			type: 'content'
		}
	}
	handleClick(num){
		this.props.checkr(num)
	}
    componentDidMount () {
    }
	componentWillReceiveProps(nextProps) {
		this.setState({
			resultdata: nextProps.data,
			type: nextProps.type
		})
	}
	render(){
		let resultdata = this.state.resultdata
		let resultHtml = null
		let type = this.state.type
		if (resultdata.length) {
		 	const listItems = resultdata.map((v, i) => 
				<li className='backlistItem itemlistqNew' onClick={() => this.handleClick(v.id)} key={i}>
                    <div className='cardbox itemlistqNew-box'>
                    	<div className='flex-b itemlistqNew-box-w100'>
	                        <div className='black-content-box-title'>
	                            <span className='black-content-box-title-content itemlistqNew-box-title' dangerouslySetInnerHTML={{__html: v.title}}></span>
	                        </div>
	                        <div className='itemlistqNew-box-time'>{v.createDate}</div>
                        </div>
                        <div className='itemlistqNew'>
                        	<div className='itemlistqNew-wx flex-s'>
								<div className='itemlistqNew-title'>微信号</div>
								<div className='itemlistqNew-content' dangerouslySetInnerHTML={{__html: v.bWeixin}}></div>
                        	</div>
                        	<div className='itemlistqNew-item flex-b flex-w'>
                        		<div className='itemlistqNew-item-line  flex-s'>
									<div className='itemlistqNew-title'>名字/昵称</div>
									<div className='itemlistqNew-content' dangerouslySetInnerHTML={{__html: v.bName}}></div>
								</div>
                        		<div className='itemlistqNew-item-line  flex-s'>
									<div className='itemlistqNew-title'>手机号/电话</div>
									<div className='itemlistqNew-content' dangerouslySetInnerHTML={{__html: v.bPhone}}></div>
								</div> 
                        		<div className='itemlistqNew-item-line  flex-s'>
									<div className='itemlistqNew-title'>QQ</div>
									<div className='itemlistqNew-content' dangerouslySetInnerHTML={{__html: v.bQq}}></div>
								</div>
                        		<div className='itemlistqNew-item-line  flex-s'>
									<div className='itemlistqNew-title'>支付宝/银行卡</div>
									<div className='itemlistqNew-content' dangerouslySetInnerHTML={{__html: v.bZfb}}></div>
								</div>
                        		<div className='itemlistqNew-item-line-l  flex-s'>
									<div className='itemlistqNew-title'>其他</div>
									<div className='itemlistqNew-content' dangerouslySetInnerHTML={{__html: v.bOther}}></div>
								</div>
                        	</div>
                        </div>
                        <div className='flex-b itemlistqNew-box-w100'>
	                        <div className='black-content-box-name flex-s itemlistqNew-box-wauto'>
	                            <div style={{backgroundImage: 'url(' + v.headImgUrl + ')', backgroundSize: 'cover'}} className='black-content-box-name-img'></div>
	                            <div className='black-content-box-name-user'>{v.nickName || '举报者'}</div>
	                        </div>
	                        <div className='black-content-box-option'>
	                            <div className='black-content-box-option-box'>
	                                <div className='black-content-box-option-icon iconfont icon-buoumaotubiao18 icon-size-30'>
	                                </div>
	                                <div className='black-content-box-option-count'>
	                                    {v.dzNum}
	                                </div>
	                            </div>
	                            <div className='black-content-box-option-box'>
	                                <div className='black-content-box-option-icon iconfont icon-cai icon-size-30'>
	                                </div>
	                                <div className='black-content-box-option-count'>
	                                    {v.caiNum}
	                                </div>
	                            </div>
	                        </div>
                        </div>
                    </div>
                </li>
		 	)
		 	resultHtml = <ul> { listItems } </ul>
		}
		return (
			<div>
				{ resultHtml }
			</div>
		)
	}
}


