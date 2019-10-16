import { infoModel, chatModel } from '../../../apis/index.js';
import util from '../../../utils/index.js';
var timer;
Page({
	data: {
		detail: {},
	    unread: 0,
	    originMenu: [],
	    userInfo: {},
	    textmodel: '',
	    showallcoms: 0,
	    showinput: false,
	    latitude: '',
	    longitude: '',
	    address: '',
	    comment: {},
	    commentList: [],
	    loading: false,
	    current_page: 1,
	    last_page: 1,
        page: 1,//分页
        pagesize: 10,//每页条数
        others: 0
	},
	onLoad(options){
	  let detail = getApp().globalData.detailObj
	  const scene = decodeURIComponent(options.scene) * 1
	  let id = detail.id || options.detailid || scene
	  this.getLocationInfo().then(loc => {
	  	var temp = {
	  		id: id,
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
	},
	onShow () {
		let userInfo = getApp().globalData.userInfo;
		if (!userInfo) {
	      getApp().getUserInfo(true).then((d)=>{
	        let userInfos = d;
	        this.setData({
	          userInfo: userInfos
	        })
	      })
	    } else {
		  this.setData({
			userInfo
		  })
	    }
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
	/**
	* 页面上拉触底事件的处理函数
	*/
	onReachBottom: function () {
		let that = this;
		let { loading, current_page, last_page } = this.data;
		if (!loading && current_page != last_page  ) {
		  that.setData({
		    page: current_page + 1,
		    loading: true
		  }, function () {
		    that.getCommentList();
		  })
		}
	},
	setDetailData: function(detail){
		if (detail.address.length > 8) detail.address = detail.address.slice(0, 8) + '...'
		var str = detail.distance + ''
	    if(!!~str.indexOf('.')) {
	    	detail.distance = (detail.distance * 1).toFixed(1)
	    }
        if(detail.type === 3) {
          if (detail.type_detail && detail.type_detail.now_money && detail.type_detail && detail.type_detail.origin_money && detail.type_detail.now_money * 1 < detail.type_detail.origin_money * 1) {
            detail.discount = Math.floor((detail.type_detail.now_money / detail.type_detail.origin_money) * 1000) / 100
            detail.discount = String(detail.discount).slice(0, 3)
          }
        }
		this.setData({
			detail: detail
		})
	    this.getAllInfoType()
	    this.getCommentList()
	},
	checkdetModel (e) {
      var {index} = util.getData(e)
      this.setData({
      	showallcoms: index
      })
	},
	getAllInfoType(){
		infoModel.getAllInfoType().then(d => {
		  if (d.code === 200) {
		    this.data.originMenu = d.data
		    this.data.originMenu.map(v => {
		    	if(v.type === this.data.detail.type) {
		    		this.data.textmodel = v.name
		    	}
		    })
		    this.setData({
		      textmodel: this.data.textmodel
		    })
		    wx.setNavigationBarTitle({
		      title: this.data.textmodel
		    })
		  }
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
	getCommentList() {
	   let {longitude, latitude, page, pagesize} = this.data
	   let info_id = this.data.detail.id
	   var that = this
       infoModel.getCommentList({longitude, latitude, page, pagesize, info_id}).then(d => {
       	 if(d.code === 200) {
           let commentList = d.data.data
           let currentpage = d.data.current_page
           let oldList = this.data.commentList
           commentList = [...commentList, ...oldList]
           that.setData({
             current_page: currentpage,
             last_page: d.data.last_page,
             commentList
           })
           this.calcuList()
       	 }
       })
	},
	getLocationInfo () {
		var that = this
		return new Promise((resolve, reject) => {
			getApp().getPostionDetail().then((d) => {
				let { longitude, latitude, address } = d;
			  	that.setData({
					longitude,
					latitude,
					address
	  			})
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
	cleaript(){
	  let showinput = !this.data.showinput
	  this.setData({
	  	showinput: showinput
	  })
	},
	setParam(e){},
	setzan(e){
		// 点赞方法
		let {zan, index, id, type} = util.getData(e)
		let temp = {
		  id,
		  type: type,
		  zan: Number(!zan)
		}
		infoModel.setZan(temp).then(d => {
		  if(d.code === 200) {
		  	if(type == 2) {
			    this.data.commentList[index].zan = Number(!zan)
			    if (!zan) this.data.commentList[index].zan_count++
			    else this.data.commentList[index].zan_count--
			    var zans = 'commentList[' + index + '].zan'
			    var zan_counts = 'commentList[' + index + '].zan_count'
			    this.setData({
			      [zans]: this.data.commentList[index].zan,
			      [zan_counts]: this.data.commentList[index].zan_count,
			    })
		  	}
		  	if(type == 1) {
		  		console.log(d)
		        this.data.detail.zan = Number(!zan)
		        if (!zan) {
		        	this.data.detail.zan_count++
		        	let zanobj = {
		        		info_id: this.data.detail.id,
		        		avatarurl: this.data.userInfo.avatarurl,
		        		nickname: this.data.userInfo.nickname,
		        		uid: this.data.userInfo.id,
		        	}
		        	this.data.detail.zans.unshift(zanobj)
		        } else {
		        	this.data.detail.zan_count--
                    this.data.detail.zans.map((v,i) => {
                    	if(v.uid == this.data.userInfo.id) {
                    		console.log('取消赞')
                    		this.data.detail.zans.splice(i, 1)
                    		console.log(this.data.detail.zans)
                    	}
                    })
		        }
		        this.setData({
		          'detail.zan': this.data.detail.zan,
		          'detail.zan_count': this.data.detail.zan_count,
		          'detail.zans': this.data.detail.zans
		        })
		  	}
		  }
		})
	},
	setcontent(e){
	  console.log(e)
      let val = e.detail.value
      if(!val.length) return
      let temp = {
      	info_id: this.data.detail.id,
      	comment: val,
      	address: this.data.address,
      	longitude: this.data.detail.longitude,
      	latitude: this.data.detail.latitude
      }
      infoModel.addcomment(temp).then(d => {
      	if(d.code === 200) {
          let comment = d.data
          comment.create_time = util.formatTime(comment.create_time * 1000, 'YY-M-D h:m')
          comment.zan = 0
          let commentList = this.data.commentList
          commentList.unshift(comment)
          this.setData({
          	comment,
          	commentList,
          	showinput: false
          })
          this.calcuList()
          util.showModal({ content: "评论成功！" })
      	}
      })
	},
	calcuList() {
	  var others = 0
      this.data.commentList.map(v => {
        if(v.uid === this.data.detail.uid) {
        	others++
        }
      })
      this.setData({
      	others
      })
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