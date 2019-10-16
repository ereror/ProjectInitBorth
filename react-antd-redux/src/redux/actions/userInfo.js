import common from 'services/common'
export const GET_USER_INFO = "userInfo/GET_USER_INFO";
import LocalStorageService from 'services/storage'

let openId = ''
export function getUserInfo(code) {
	return dispatch => {
    	let userInfo = LocalStorageService.get('userInfo') || {}
    	if (userInfo.code && code && userInfo.code == code) {
    		openId = userInfo.openId
            dispatch({
                type: GET_USER_INFO,
                openId: openId
            })
    	} else {
			common.getOpenId({code}).then(res => {
				let openId = ''
				if (res.code * 1 === 200) {
	              openId = res.result && res.result.openId
	              LocalStorageService.set('userInfo', {
	              	code: code,
	              	openId: openId
	              })
				}
	            dispatch({
	                type: GET_USER_INFO,
	                openId: openId
	            })
			}).catch(err => {
	            dispatch({
	                type: GET_USER_INFO,
	                openId: '12345'
	            })
			})
    	}
	}
}