import util from '../../../utils/index.js';
import { infoModel } from '../../../apis/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    param:{},
    paramTitle:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    let categoryList = util.getPage(-1).data.categoryList;
    let param = util.getPage(-1).data.filterParam || {}
    let { model_id} = param;
    //分类不为空,且未选取分类，则默认第一个

    if (!util.isEmpty(categoryList) && util.isEmpty(model_id)) {
      let {id,title} = categoryList[0];
      that.setData({
        paramTitle:{
        },
        param:{
          categoryid:id
        },
        categoryList
      })
      that.getMore(id);
      return;
    }
    let paramTitle = util.getPage(-1).data.filterParamTitle || {}
    let filterList = util.getPage(-1).data.filterList ||[]
    this.setData({
      param,
      paramTitle,
      categoryList,
      filterList,
    })
  },
  setSelect: function (e) {
    let { key, id,title } = util.getData(e);
    let param=this.data.param;
   
    let keyId = `param.${key}`;
    let keyTitle = `paramTitle.${key}`

    //如果已选中则取消选中
    if (param[key]==id) {
      this.setData({
        [keyId]: '',
        [keyTitle]: ''
      })
    }else{
      this.setData({
        [keyId]: id,
        [keyTitle]: title
      })
    }
    
    
  },
  goUrl(e){
    util.goUrl(e)
  },
  categoryChange:function(e){
    let that=this;
    let {index}=util.getData(e);
    let categoryInfo = that.data.categoryList[index];
    let {id,title} = categoryInfo;
    let param = that.data.param;
    //如果已选中则取消选中
    if (param["categoryid"]==id) {
      that.setData({
        param: {
          categoryid: '',
        },
        paramTitle: {}
      })
      that.resete()
    }else{
      that.setData({
        param: {
          categoryid: id
        },
        paramTitle: {}

      })
      that.getMore(id);
    }
  },
  getMore: function (id) {
    let that = this;
    util.showLoading();
    infoModel.getFilterByCategory({ id }).then((d) => {
      util.hideAll();
      let filterList = d.data;
      that.setData({
        filterList,
      })
    })
  },
  submit: function () {
    let { param, paramTitle, filterList,} = this.data;
    param.model_id = util.isEmpty(filterList) || util.isEmpty(paramTitle)?'':filterList[0].model_id;
    util.getPage(-1).getFilterParam(param,paramTitle)
    util.getPage(-1).setData({
      filterList
    })
    wx.navigateBack({
      delta: 1
    })

  },
  resete: function () {
    this.setData({
      param:{},
      filterList:[]
    })
  }
})