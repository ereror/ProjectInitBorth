import React, {PureComponent} from 'react'
import pic from '@/imgs/test.jpeg'
import {connect} from 'react-redux';
import {getUserInfo} from "actions/userInfo";

class CousList extends PureComponent {
	render () {
		const { userInfo = {} } = this.props.userInfo
		return (
			<div>
				<div>this is CousList</div>
				<img src={pic} />
	            <div>
	                {
	                    <div>
	                        <p>用户信息：</p>
	                        <p>用户名：{userInfo.name}</p>
	                        <p>介绍：{userInfo.intro}</p>
	                    </div>
	                }
	                <button onClick={() => this.props.getUserInfo()}>请求用户信息</button>
	            </div>
			</div>
		)
	}
}

export default connect((userInfo) => userInfo, {getUserInfo})(CousList)