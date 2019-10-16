import util from '../../../utils/index.js';
import { infoModel, fileModel } from '../../../apis/index.js';
var issubmit = false
Page({

  /**
   * 页面的初始数据
   */
  data: {
  	messtext: {
  		title: '',
		  inputval: '',
		  placeholder: '留下你的故事，你才不是没有故事的女同学。。',
	    size: 120,
	    ismask: false,
	    key: 'textarea'
  	},
  	titletext: {
  		title: '',
		  val: '',
		  placeholder: '标题起的好关注少不了',
	    size: 20,
	    showsize: true,
	    key: 'text'
  	},
  	categoryList: [], // 类别
    tipsList: [], // 标签
    tips: {
      title: '标签',
      must: false,
      isarrow: true,
      placeholder: '选择标签',
      val: '',
      type: 'tips',
      path: '/images/icon/tips.png'
    },
  	price: {
  	  title: '价格',
  	  must: false,
  	  isarrow: true,
  	  placeholder: '填写价格',
  	  val: '',
  	  type: 'price',
      path: '/images/icon/price.png'
  	},
   	category: {
  	  title: '分类',
  	  must: false,
  	  isarrow: true,
  	  placeholder: '选择分类',
  	  val: '',
  	  type: 'category',
  	  categoryid: '',
      path: '/images/icon/category.png'
  	},
  	priceold: {
  	  title: '商品原价',
  	  must: false,
  	  isarrow: false,
  	  placeholder: '￥0.00',
  	  val: '',
  	  key: 1
  	},
  	pricefill: {
  	  title: '卖出价格',
  	  must: false,
  	  isarrow: false,
  	  placeholder: '￥0.00',
  	  val: '',
  	  focus: false,
  	  key: 0
  	},
  	param: {
	    latitude: '',
	    longitude: '',
	    address: '',
	    size: 9,
	    minsize: 3,
	    imgs: [], // 当前上传图片
	    video: [], // 上传视频
	    tag: '',
	    isrotate: true // 上传照片是否需要旋转
  	},
  	infotip: true,
  	showpriceipt: false,
  	isnewgoods: false, // 是否是全新宝贝
  	showfbbox: false,
  	showfbboxt: '发布成功！',
  	showfbboxf: '发布失败！',
  	showvideo: false,
  	pagemodel: 2, // 1 卖闲置， 2：求购， 3：赠送,
    isUpdate: false,
    id: ''
  },
  onLoad (options) {
  	let { pagemodel, title, index} = options
    if (index) {
      let detail = util.getPage(-1).data.list.data[index];
      console.log(detail)
      let {address, latitude, longitude, imgs, tag, type, type_detail} = detail
      let video = []
      imgs.map((v, i) => {
        if (v.type === '.mp4') {
          video[0] = v
          video[0].src = video[0].path
          imgs.splice(i, 1)
        }
      })
      pagemodel = type
      if (type === 3) {
        title = '卖闲置'
        pagemodel = 1
      }
      if (type === 1) {
        title = '免费送'
        pagemodel = 3
      }
      if (!pagemodel) pagemodel = 1
      this.setData({
        'titletext.val': detail.title,
        'messtext.inputval': detail.content,
        'param.address': address,
        'param.latitude': latitude,
        'param.longitude': longitude,
        'param.video': video,
        'param.imgs': imgs,
        'pricefill.val': type_detail.now_money || '',
        'price.val': type_detail.now_money || '',
        'priceold.val': type_detail.origin_money || '',
        'category.val': detail.categoryTitle,
        'category.categoryid': detail.categoryid,
        isnewgoods: !!tag,
        isUpdate: true,
        showfbboxt: '信息修改成功!',
        id: detail.id,
        pagemodel: pagemodel
      })
    }
    // if (pagemodel * 1 === 3) {
    //   this.data.titletext.placeholder = '暖心赠送从宝贝标题开始'
    //   this.data.messtext.placeholder = '就宝贝也需要新呵护，跟宝贝新主人介绍一下宝贝的入手渠道、规格尺寸和使用感受吧~'
    // }
    // if (pagemodel * 1 === 1) {
    //   this.data.titletext.placeholder = '宝贝起个好标题，出售成功第一步'
    //   this.data.messtext.placeholder = '宝贝想要卖得快, 详细描述不可少，描述一下宝贝得入手渠道、规格尺寸和使用感受吧'
    // }
    // if (pagemodel * 1 === 2) {
    //   this.data.titletext.placeholder = '起个好标题，宝贝自然来'
    //   this.data.messtext.placeholder = '想要宝贝来得快, 详细描述很重要，留下价格、品牌、规格、成色等信息）可以帮你快速找到宝贝哦'
    // }
    this.setData({
      pagemodel: pagemodel * 1,
      'titletext.placeholder': this.data.titletext.placeholder,
      'messtext.placeholder': this.data.messtext.placeholder
    })
    this.firstLoad()
  },
  firstLoad:function(){
    let that=this;
    Promise.all([getApp().getCategoryInfo(),getApp().getConfigInfo()]).then((d)=>{
      let categoryList = d[0];
      let configInfo = d[1];
      let { info_type_free_words, info_type_wonder_words } = configInfo.extraConfig;
      that.setData({
        categoryList: categoryList,
        info_type_free_words,
        info_type_wonder_words
      })
    })
    if(!this.data.param.address) this.getPosition()
    this.getAllInfoType()
  },
  chooseLocation () {
    let that = this;
    wx.chooseLocation({
      type: 'gcj02',
      success: function (res) {
        let { longitude, latitude, name } = res;
        if(name.length > 14) name = name.slice(0, 14) + '...'
        that.setData({
          'param.latitude': latitude,
          'param.longitude': longitude,
          'param.address': name
        })
      },
    })
  },
  infotipfunc () {
    this.setData({
      infotip: false
    })
  },
  chooseImage: function (e) {
    let that = this;
    let { param } = that.data;
    let { key, size } = util.getData(e);
    let imageList = param[key] || [];
    key = `param.${key}`;
    wx.chooseImage({
      count: size - imageList.length,
      sourceType: ['album', 'camera'],
      success: function (res) {

        let tempFiles = res.tempFiles;
        //定义图片id数组
        let imageIdList = [];
        // 格式化图片参数

        for (let i = 0; i < tempFiles.length; i++) {
          util.showLoading('上传中')
          fileModel.uploadCan({ filePath: tempFiles[i].path }).then((d) => {
            let data = d.data;
            tempFiles[i].id = data.id;
            tempFiles[i].path=data.url
            imageIdList.push(d);
            //检验传的照片是否重复
            // let repeat = imageList.findIndex((item) => {
            //   return item.id == tempFiles[i].id
            // }) < 0 ? false : true;
            // if (!repeat) {
              
            // }
            imageList = [...imageList, tempFiles[i]];

            that.setData({
              [key]: imageList
            })
            util.hideAll()
          })
        }
      },
    })
  },
  delImage: function (e) {
    let { index, key } = util.getData(e);
    let { param } = this.data;
    let imageList = param[key];
    imageList.splice(index, 1);
    key = `param.${key}`;
    this.setData({
      [key]: imageList
    })
  },
  choosevideo: function (e) {
  	var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 20,
      camera: 'back',
      success: function(res) {
        console.log(res)
        wx.showLoading({
          title: '发送中...',
        })
        let tempFilePath = res.tempFilePath;
        let thumbTempFilePath = res.thumbTempFilePath;
        // let ctx = wx.createCanvasContext('cutImg');
        let width = res.width
        let height = res.height
        if (height > width) that.data.param.isrotate = true
        else that.data.param.isrotate = false
        // return
        fileModel.uploadFile({ filePath: tempFilePath, formData: { uploadtype: 'file' } }).then((video) => {
          if(video.code == 1) {
          	let {id, src, thumb_src, size, ext} = video.data
          	let temp = {
          		id: id,
          		src: src,
          		imgsrc: thumb_src,
          		size: size,
          		ext: ext,
          		width: res.width,
          		height: res.height 
          	}
          	that.data.param.video[0] = temp
          	that.setData({
          		'param.video[0]': that.data.param.video[0],
          		'param.isrotate': that.data.param.isrotate
          	})
          } else {
          	let { msg } = video.data || '上传失败'
          	util.showModal({content: msg})
          }
          util.hideAll()
        })
      }
    })
  },
  getAllInfoType(){
    infoModel.getAllInfoType().then(d => {
      if (d.code === 200) {
        this.data.tipsList = d.data
        this.data.tipsList.map(v => {
          if (v.type === this.data.pagemodel) {
            wx.setNavigationBarTitle({
              title: v.name
            })
            this.data.tips.val = v.name
            this.data.tips.type = v.type
          }
        })
        this.setData({
          tipsList: d.data,
          'tips.val': this.data.tips.val,
          'tips.type': this.data.tips.type
        })
      }
    })
  },
  checkvideo (e) {
  	console.log(e)
  },
  closevideo () {
    this.setData({
    	showvideo: false
    })  	
  },
  openVideo (e) {
  	var src = e.target.dataset.src || e.currentTarget.dataset.src
  	console.log('打开视频播放页面:', src)
    wx.navigateTo({url: '/pages/common/camera/camera?src=' + src})
    this.setData({
    	showvideo: true
    })
  },
  delVideo () {
  	this.setData({
  		'param.video[0]': [],
  		'param.isrotate': false
  	})
  },
  previewImage (e) {
    let { src } = util.getData(e);
    let imgArr = []
    this.data.param.imgs.map(v => {
    	imgArr.push(v.path)
    })
    wx.previewImage({
      current: src,
      urls: imgArr,
      success:function(){
      }
    })
  },
  setParam (e) {
  	console.log(e)
  	let key = e.currentTarget.dataset.key
  	if (key === 'textarea') {
	  	// 宝贝详细描述
	  	let iptval = e.detail.value
	  	iptval = iptval.slice(0, 120)
	    this.setData({
	    	'messtext.inputval': iptval
	    })
  	}
  	if (key === 'text') {
	  	let iptval = e.detail.value
	  	iptval = iptval.slice(0, 20)
	    this.setData({
	    	'titletext.val': iptval
	    })
  	}
  },
  digitsetParam(e){
    let value = e.detail.value
    let key = e.currentTarget.dataset.key
    if (key !== 0 && key !== 1) return
    let setparam = key === 0 ? 'pricefill.val' : 'priceold.val'
    this.setData({
    	[setparam]: value
    })
    if (setparam === 'pricefill.val') {
	    this.setData({
	    	'price.val': value
	    })
    }
  },
  clearpriceipt () {
  	this.setData({
		'messtext.ismask' : false,
  		showpriceipt: false
  	})
  },
  clearsurebtn(){
  	this.setData({
  		showfbbox: false,
  		'messtext.ismask' : false
  	})
    var model = this.data.id ? -2 : -1
    util.getPage(model).setData({
      nowPageIndex: 0
    });
    util.getPage(model).getList('godown');
    setTimeout(function(){
      wx.navigateBack()
    }, 1000)
  },
  dealform (e) {
    let type = e.currentTarget.dataset.type
    if (type === 'price') {
    	this.setData({
    		'messtext.ismask' : true,
    		showpriceipt: true,
        'pricefill.focus': true
    	})
    }
  },
  tipsChange (e) {
    let tipsIndex = e.detail.value
    if (typeof tipsIndex == 'undefined') {
      this.setData({
        'tips.val': '',
        'tips.type': ''
      })
    } else {
      let tipname = this.data.tipsList[tipsIndex].name
      let tiptype = this.data.tipsList[tipsIndex].type
      this.setData({
        'tips.val': tipname,
        'tips.type': tiptype
      })
    }
  },
  categoryChange (e) {
  	let categoryIndex = e.detail.value
  	if (typeof categoryIndex == 'undefined') {
  		this.setData({
  			'category.val': '',
  			'category.categoryid': ''
  		})
  	} else {
  		let category = this.data.categoryList[categoryIndex].title
  		let categoryid = this.data.categoryList[categoryIndex].id
  		this.setData({
  			'category.val': category,
  			'category.categoryid': categoryid
  		})
  	}
  },
  setGoodsstatus () {
  	var goods = !this.data.isnewgoods
  	this.setData({
  		isnewgoods: goods
  	})
  },
  fbsub () {
  	this.setData({
  		'messtext.ismask' : true,
  		showfbbox: true
  	})
  },
  getPosition () {
  	var that = this
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        let { latitude, longitude } = res;
        let location = latitude + ',' + longitude
        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1/',
          data: {
            location: location,
            get_poi: 1,
            key: 'RHGBZ-S2LAU-5MRV7-4QPTZ-JI25K-HVBDV',
          },
          success: function success(res) {
            console.log(res)
            let locs =  res.data && res.data.result && res.data.result.formatted_addresses && res.data.result.formatted_addresses.recommend || {}
            if(locs) {
            if(locs.length > 14) locs = locs.slice(0, 14) + '...'
              that.setData({
                  'param.latitude': latitude,
                  'param.longitude': longitude,
                  'param.address': locs
              })
            }
          }
        })
      },
      fail: function(res) {}
    })
  },
  submit () {
  	let id = this.data.id
  	let {longitude, latitude, address, imgs} = this.data.param;
  	let content = this.data.messtext.inputval;
  	let categoryid = this.data.category.categoryid;
  	let { info_type_free_words, info_type_wonder_words, pagemodel} = this.data
  	let msg = ''
  	let origin_money = this.data.priceold.val
  	let now_money = this.data.pricefill.val
  	let detail = ''
  	let category_name = this.data.category.val
  	let type = 3
  	let title = this.data.titletext.val;
    let newpagemodel = this.data.tips.type;
    type = newpagemodel
    if(newpagemodel == 1){
      msg = info_type_free_words || '都是邻居，免费送给你吧，来拿吧'
    }
    if(newpagemodel == 2) {
      // msg = info_type_wonder_words || '看运气能不能找到想要的，哈哈~'
      msg = '看运气能不能找到想要的，哈哈~'
    }
  	let type_detail = JSON.stringify({
      msg,
      origin_money,
      now_money,
      detail,
      category_name
    })
    let tag = this.data.isnewgoods ? '全新宝贝' : ''

    // let type = pagemodel
    let infotype = newpagemodel
    if(!imgs.length){
      util.showModal({ content: "上传图片最多9张" })
      return;
    }
  	if (this.data.param.video.length) {
  		// 插入视频 1, 卖闲置， 3 免费送
  		let {id, src} = this.data.param.video[0]
  		let temp = {
  			id,
  			path: src
  		}
  		imgs.unshift(temp) 
  	}
    if(!imgs.length){
      util.showModal({ content: "最少需要上传一张图片或者视频" })
      return;
    }
    if (!categoryid && newpagemodel <= 3) {
      util.showModal({ content: "请选择分类" })
      return;
    }
    if (!type) {
      util.showModal({ content: "请选择标签" })
      return;
    }
    if (!address){
      util.showModal({content:"请选择地址"})
      return;
    }
    if (!title) {
      util.showModal({content:"请输入标题内容"})
      return;
    }
    if (!content) {
      util.showModal({ content: "请填写发布内容" })
      return;
    }
  	if(newpagemodel == 1) {
  		if(!origin_money) util.showModal({ content: "请输入原价" })
  		if(!now_money) util.showModal({ content: "请输入现价价" })
  		if(!origin_money || !now_money) return
  	    type = 3
  	}
    if (issubmit) return
    issubmit = true
    imgs = util.getIds(imgs);
    infoModel.add({
      id,
      title,
      categoryid,
      content,
      address,
      longitude,
      latitude,
      imgs,
      tag,
      type,
      type_detail
    }).then((d)=>{

      // util.showSuccess("发布成功");
      issubmit = false
      if (d.errormsg) return
      this.setData({
      	showfbbox: true,
      	'messtext.ismask' : true
      })
    })
  }
})