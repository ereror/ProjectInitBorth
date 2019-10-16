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
                微信搜索《火眼金睛打妖怪》或hyjjdyg关注公众号，时时更新查询翘课泡水照骗
                </div>
            	<div className='gzhbox'>
	                <img className='gzhbox-img' src={pic2} />
	                <div className='gzhbox-text'>扫码关注</div>
            	</div>
            </div>
		)
	}
}
