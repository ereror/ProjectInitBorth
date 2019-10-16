import util from '../../../utils/index.js';
import { infoModel } from '../../../apis/index.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    param: {
      page: 1,
      keyword: '',
      longitude: '',
      latitude: "",
      categoryid: '',
      order_type: 2
    },
    loading: true,
    refresh: false,
    list: {
      data: []
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.firstLoad();
  },
  goUrl:function(e){
    util.goUrl(e)
  },
  firstLoad: function () {
    let that = this;
    getApp().getLocationInfo().then((d) => {
      let { longitude, latitude, city } = d;
      that.setData({
        'param.longitude': longitude,
        'param.latitude': latitude,
        location: d
      })
      that.getList();
    })

  },
  //获取列表
  getList: function () {

    let that = this;
    let { refresh, param, list, tabActiveIndex } = this.data;

    infoModel.getList(param).then((d) => {
      let oldlist = list;
      let newlist = d.data;

      //如果刷新,则不加载老数据
      if (!refresh) {
        let lenold = oldlist.data.length;
        let bignum = 0;
        let smallnum = 0;
        if(lenold > 0) {
          for(let i = 0 ; i < newlist.data.length; i++){
            let info = newlist.data[i]
            if (info.id > oldlist.data[0].id) {
               bignum++;
            } else if (info.id < oldlist.data[lenold - 1].id) {
               smallnum ++;
            }
          }
          let bigdata = newlist.data.slice(0, bignum)
          let smalldata = newlist.data.slice(newlist.data.length - smallnum, newlist.data.length)
          newlist.data = [...bigdata, ...oldlist.data, ...smalldata]
        }
      }
      newlist.data.map(v => {
        v.imgs.map(img => {
          img.type = img.path.slice(-4)
        })
      })
      that.setData({
        list: newlist,
        loading: false,
        refresh: false,
      })
    })

  },
  checkdetail: function(e){
    // console.log(e)
    // if (e.detail.formId) infoModel.createFormId({ form_id: e.detail.formId })
    let { index, url } = util.getData(e);
    // console.log(index, url)
    // getApp().globalData.detailObj = this.data.list.data[index]
    util.goUrl(e)
  },
  //刷新
  onPullDownRefresh: function () {
    let that = this;
    that.setData({
      refresh: true,
      'param.page': 1
    }, function () {
      wx.showNavigationBarLoading()
      that.firstLoad();
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;
    let { loading, list } = this.data;
    let { current_page, last_page } = list;
    if (!loading && current_page != last_page) {
      that.setData({
        'param.page': current_page + 1,
        loading: true
      }, function () {
        that.getList();
      })
    }
  },
  changeStatus:function(e){
    let that=this;
    let {index,status,id}=util.getData(e);
    let key =`list.data[${index}].status`;
    util.showLoading()
    infoModel.changeStatus({id,status}).then((d)=>{
      that.prevRefrash()
      util.hideAll();
      that.setData({
        [key]: status
      })
    })
    
  },
  del:function(e){
    let that=this;
    let {index}=util.getData(e);
    let list=this.data.list;
    let id = list.data[index].id;
    wx.showModal({
      title: '提示',
      content: '确认删除?',
      showCancel: true,
      success: function(res) {
        if(res.confirm){
          util.showLoading();
          infoModel.del({ id }).then((d) => {
            util.showSuccess("删除成功");
            that.prevRefrash(id)
            list.data.splice(index,1);
            that.setData({
              list
            })
          })
        }
      },
    })
  },
  previewImage: function (e) {
    let { index, url } = util.getData(e);
    let { list } = this.data;
    let imageList = list.data[index].imgs;
    let id = list.data[index].id;
    let imgArr = [];
    for (let i in imageList) {
      imgArr.push(imageList[i].path)
    }
    wx.previewImage({
      current: url,
      urls: imgArr,
      success: function () {
        infoModel.addStar({ id })
      }
    })
  },
  prevRefrash(id){
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    var prevPage = pages[pages.length - 2];
    prevPage.delListById(id)
  }
})