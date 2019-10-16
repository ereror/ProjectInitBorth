import { infoModel, chatModel } from '../../../apis/index.js';
import util from '../../../utils/index.js';
var timer;
Page({
	data: {
		detail: {},
	    unread: 0
	},
	onLoad(options){
	  let detail
	  const scene = decodeURIComponent(options.scene) * 1
	  if (options.detailid || scene) {
		this.getLocationInfo().then(loc => {
		  	var temp = {
		  		id: options.detailid || scene,
		  		latitude: loc.latitude,
		  		longitude: loc.longitude
		  	}
		  	infoModel.getInfoDetail(temp).then(d => {
		  		if (d.code === 200) {
		  			detail = d.data
		  			this.setDetailData(detail)
		  			this.getListfunc()
		  		}
		  	})
		})
	  } else {
	  	detail = getApp().globalData.detailObj
	  	console.log(detail)
	  	this.setDetailData(detail)
	  	this.getListfunc()
	  }
	},
	onShow () {
	},
    getListfunc () {
		var that = this
	    clearInterval(timer)
	    that.getList();
	    timer = setInterval(function () {
	      that.getList();
	    }, 10000)
    },
	onUnload: function () {
        clearInterval(timer)
    },
	setDetailData: function(detail){
		if (detail.address.length > 8) detail.address = detail.address.slice(0, 8) + '...'
		var str = detail.distance + ''
	    if(!!~str.indexOf('.')) {
	    	detail.distance = (detail.distance * 1).toFixed(1)
	    }
	    let title = '售卖闲置'
	    if(detail.type == 1){
           title = '赠送闲置'
	    }
	    if(detail.type == 2){
	       title = '回收闲置'
	    }
	    wx.setNavigationBarTitle({
	      title: title
	    })
		this.setData({
			detail: detail
		})
	},
	onShareAppMessage: function(e){
		console.log(e)
		let title = ''
		if (this.data.detail.type == 1) title = '远亲不如好邻居，这个宝贝送给你'
		if (this.data.detail.type == 2 || this.data.detail.type == 4) title = '众里寻TA千百度，这个宝贝你有不？'
		if (this.data.detail.type == 3) title = '低价淘好物，品质不打折'
		return {
			title: title,
			path: '/pages/info/index/index?detailid=' + this.data.detail.id
		}
	},
	//获取列表
	getList: function () {
	    let that = this;
	    chatModel.getAllList().then((d) => {
	      util.hideAll();
	      let newlist = d.data || [];
	      let unread = 0
	      if (!newlist.length) return
	      newlist[0].data.map(v => {
	      	if (v.uid === this.data.detail.uid) {
	      		unread = v.un_read
	      	}
	      })
	      this.setData({
	      	unread: unread
	      })
	    })
	 },
	getLocationInfo () {
		return new Promise((resolve, reject) => {
			getApp().getLocationInfo().then((d) => {
				let { longitude, latitude } = d;
				resolve({isAuth: true,longitude: longitude, latitude: latitude})
			})
		})
	},
	openVideo(e) {
	    var src = e.target.dataset.src || e.currentTarget.dataset.src
	    wx.navigateTo({url: '/pages/common/camera/camera?src=' + src})
	    this.setData({
	      showvideo: true
	    })
	},
	createFormid(e) {
	    infoModel.createFormId({ form_id: e.detail.formId })
	    util.goUrl(e)		
	},
	previewImage (e) {
		let { src } = util.getData(e);
		let imgArr = []
		this.data.detail.imgs.map(v => {
			imgArr.push(v.path)
		})
		wx.previewImage({
		  current: src,
		  urls: imgArr,
		  success:function(){
		  }
		})
	}
})