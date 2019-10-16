import React, { PureComponent } from 'react'
import { TextareaItem, ImagePicker, Switch, Toast } from 'antd-mobile';
import commonService from 'services/common'
import gzhService from 'services/gzhcircle'
import { fileServer }  from '../../../build/app'
import { codeResult } from '../../utils/index'
import { connect } from 'react-redux';
import { getUserInfo } from "actions/userInfo";
import LocalStorageService from 'services/storage'
import Gzhcode from 'components/Gzhcode'

const formstr = ['被曝光的名称/微信昵称不能为空', '被曝光人电话号、QQ号、支付宝号、其他社交平台账号请至少填写一个', 
'曝光标题不能为空', '被曝光人微信号不能为空', '图片数量至少有一个最多九张', '电话号码只能11位'
]

class addnew extends PureComponent {
	constructor(prop) {
		super(prop)
		this.state = {
			disname: '',
			disnameT: '',
			diswx: '',
			disphone: '',
			disqq: '',
			diszfb: '',
			disdesc: '',
			distitle: '',
			desc: '',
			files: [],
			isHiddn: false,
			openId: ''
		}
		this.handleChange = this.handleChange.bind(this)
		this.descChange = this.descChange.bind(this)
		this.onFileChange = this.onFileChange.bind(this)
		this.isHiddenName = this.isHiddenName.bind(this)
		this.saveData = this.saveData.bind(this)
		document.title = '我要曝光'
	}
	componentDidMount(props) {
		//获取openId
		const search = decodeURIComponent(location.href)
		let code = codeResult(search)
		if(code.length) this.props.getUserInfo(code)
	}
	componentWillReceiveProps(nextProps) {
		// 数据发生变化
		this.state.openId = nextProps.userInfo.openId
	}
	onFileChange = (files, type, index) => {
		console.log(files, type, index)
		let that = this
		if (type === 'add') {
			// 选择图片上传
		  let file = files.pop()
		  console.log(file)
          var formData = new FormData()
          formData.append('file', file.file)
          Toast.loading('图片上传中...', 0)
    //       commonService.uploadFile(formData).then(res => {
    //       	Toast.hide()
    //         if (res.code === 200) {
    //           let imgData = res.data && res.data.data || {}
    //           files.push(imgData)
    //           Toast.success('图片上传成功!', 1);
			 //  that.setState({
				// files
			 //  })
    //         }
    //       }).catch(err => {
    //         console.log(err)
    //         Toast.fail('图片上传失败!', 1);
    //       })
    		commonService.uploadImgFile(formData).then(res => {
    			Toast.hide()
    			if (res.code * 1 === 200) {
    				let imgId = res.result && res.result.fileId
    				if (!imgId) {
    					Toast.fail('图片上传失败!', 1)
    				} else {
    					Toast.success('图片上传成功!', 1)
    					let param = {
    						id: imgId,
    						url: fileServer + imgId
    					}
    					files.push(param)
						that.setState({
							files
						})
    				}
    			} else {
    				Toast.fail('图片上传失败!', 1)
    			}
    		}).catch(err => {
	        	console.log(err)
	        	Toast.fail('图片上传失败!', 1);
	        })
		} else if (type === 'remove') {
		  that.setState({
			files
		  })
		}
	}
	handleChange (e) {
		// console.log('%O', e.target)
		let { key } = e.target.dataset
		let value = e.target.value
		this.setState({
			[key]: value
		})
	}
	isHiddenName(props){
		console.log(props)
		this.setState({
			isHiddn: props
		})
	}
	descChange (props) {
		console.log(props)
		this.setState({
			desc: props
		})
	}
	saveData() {
		let that = this
		// 验证表单数据
		/**
		 * 必填项， 名字，微信、支付宝、qq、手机号、其他 必须有一个，
		 * 标题
		 * 举报者微信
		 */
		let iserror = valiadata()
		let str = ''
		if (iserror !== -1) {
			str = formstr[iserror]
			Toast.fail(str, 1)
			return
		} else {
			let param = {
				bName: that.state.disname,
				rWeixin: that.state.disnameT,
				bWeixin: that.state.diswx,
				bPhone: that.state.disphone,
				bQq: that.state.disqq,
				bZfb: that.state.diszfb,
				bOther: that.state.disdesc,
				title: that.state.distitle,
				content: that.state.desc,
				anonymous: Number(that.state.isHiddn) + '',
				imgList: that.state.files,
				openId: that.state.openId
			}
			Toast.loading('数据保存中...', 0)
			gzhService.saveTip(param).then(res => {
				Toast.hide()
				if (res.code * 1 === 200) {
					Toast.success('数据保存成功！', 1)
					let id = res.result && res.result.id
					that.props.history.push({ pathname: '/detail' , state: { id: id, openId: that.state.openId }})
				} else {
					Toast.fail('数据保存失败！', 1)
				}
			}).catch(res => {
				Toast.hide()
				Toast.fail('数据保存失败！', 1)
			})
		}
		
		function valiadata() {
			let iserror = -1
			if (!that.state.diswx.length) return iserror = 0
			if (!that.state.distitle.length) return iserror = 2
			if (!that.state.disnameT.length) return iserror = 3
			if (!that.state.files.length) return iserror = 4
			if (that.state.disphone && that.state.disphone.length != 11) return iserror = 5
			return iserror
		}
	}
	render() {
		const { disname, files } = this.state
		// <span className='addnew-icon'>*</span>
		return (<div className='page-box flex-w'>
				<div className='cardbox addnewbox'>
					<div className='addnew-box'>
					    <div className='addnew-box-title'>被曝光者信息(必填*)</div>
						<div className='addnew-item flex-b'>
							<div className='addnew-title flex-c'>
								标题
								<span className='addnew-icon'>*</span>
							</div>
							<div className='addnew-content'>
								<input className='addnew-ipt' data-key='distitle' placeholder='请填写曝光标题' value={this.state.distitle} onChange={this.handleChange} type='text' />
							</div>
						</div>
						<div className='addnew-item addnew-line flex-b'>
							<div className='addnew-title flex-c'>
								微信号
								<span className='addnew-icon'>*</span>
							</div>
							<div className='addnew-content'>
								<input className='addnew-ipt' data-key='diswx' placeholder='请填写被曝光人微信号' value={this.state.diswx} onChange={this.handleChange}/>
							</div>
						</div>
					</div>					
				</div>
				<div className='cardbox addnew'>
					<div className='addnew-box'>
						<div className='addnew-box-title colorg'>被曝光者其他信息(选填)</div>
						<div className='addnew-item addnew-line flex-b'>
							<div className='addnew-title flex-c'>
								名字/昵称
							</div>
							<div className='addnew-content'>
								<input className='addnew-ipt' type='text' data-key='disname' placeholder='请填写被曝光人名字/昵称' value={disname} onChange={this.handleChange}/>
							</div>
						</div>
						<div className='addnew-item addnew-line flex-b'>
							<div className='addnew-title flex-c'>
								手机/电话
							</div>
							<div className='addnew-content'>
								<input className='addnew-ipt' type='number' data-key='disphone' placeholder='请填写被曝光人手机/电话' value={this.state.disphone} onChange={this.handleChange}/>
							</div>
						</div>
						<div className='addnew-item addnew-line flex-b'>
							<div className='addnew-title flex-c'>
								QQ
							</div>
							<div className='addnew-content'>
								<input className='addnew-ipt' data-key='disqq' placeholder='请填写被曝光人QQ号' type='number' value={this.state.disqq} onChange={this.handleChange}/>
							</div>
						</div>
						<div className='addnew-item addnew-line flex-b'>
							<div className='addnew-title flex-c'>
								支付宝/银行卡
							</div>
							<div className='addnew-content'>
								<input className='addnew-ipt' data-key='diszfb' placeholder='请填写被曝光人支付宝/银行卡' type='number' value={this.state.diszfb} onChange={this.handleChange}/>
							</div>
						</div>
						<div className='addnew-item addnew-line flex-b'>
							<div className='addnew-title flex-c'>
								其他
							</div>
							<div className='addnew-content'>
								<input className='addnew-ipt' data-key='disdesc' placeholder='例:陌陌xxxxx' value={this.state.disdesc} onChange={this.handleChange}/>
							</div>
						</div>
					</div>
				</div>
				<div className='cardbox addnew02'>
					<div className='addnew-line addnew-text-area'>
						<TextareaItem autoHeight rows={5} count={2000} placeholder='请填写具体内容，必须对自己所描述的事件负全部责任' data-key='desc' className='addnew-content-text' value={this.state.desc} onChange={this.descChange}/>
					</div>
					<div className='addnew-img'>
			        	<ImagePicker files={files} onChange={this.onFileChange}
                          onImageClick={(index, fs) => console.log(index, fs)}
          				  selectable={files.length < 10} multiple={false} length={3} />
					</div>
				</div>
				<div className='cardbox addnew03'>
					<div className='addnew-box'>
						<div className='addnew-item addnew-line flex-b'>
							<div className='addnew-title flex-c'>
								微信号
								<span className='addnew-icon'>*</span>
							</div>
							<div className='addnew-content'>
								<input className='addnew-ipt' data-key='disnameT' placeholder='请填写曝光人微信号' value={this.state.disnameT} onChange={this.handleChange}/>
							</div>
						</div>
						<div className='addnew-item addnew-line flex-b'>
							<div className='addnew-title2 flex-s'>
								是否匿名(仅管理员可见)
							</div>
							<div className='addnew-content flex-end'>
								<Switch onChange={this.isHiddenName} checked={this.state.isHiddn}/>
							</div>
						</div>
					</div>
				</div>
				< Gzhcode />
				<div className='querybtn addnewbtn' onClick={this.saveData}>提交曝光</div>
			</div>)
	}
}

export default connect((userInfo) => userInfo, {getUserInfo})(addnew)