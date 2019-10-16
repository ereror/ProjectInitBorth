import React, { PureComponent } from 'react'
import pic2 from '@/imgs/gzh.jpg'

export default class Gzhcode extends PureComponent {
	render(){
        let gzhcode = {
            background: 'url(' + pic2 + ')',
            backgroundSize: 'cover'
        }
		return (
            <div className='gzh-code-box'>
                <div className='gzh-code-wa'>
                    <span>微信搜索</span>
                    <span className='gzh-code-wa-big'>“火眼金睛打妖怪”</span>
                    <span>或</span>
                    <span className='gzh-code-wa-big'>“hyjjdyg”</span>
                    <span>，以及长按右侧二维码与微信扫一扫关注公众号使用更多功能，举报网络欺诈传播正能量从我做起。</span>
                </div>
            	<div className='gzhbox'>
	                <img className='gzhbox-img' src={pic2} />
	                <div className='gzhbox-text'>长按扫码</div>
            	</div>
            </div>
		)
	}
}
