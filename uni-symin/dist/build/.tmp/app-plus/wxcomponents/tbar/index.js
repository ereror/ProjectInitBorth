let iconimg = {
  thome_d: 'https://sns-cdn.myxianxiaobao.com/sfximao/t-home-d.png',
  thome_a: 'https://sns-cdn.myxianxiaobao.com/sfximao/t-home-a.png',
  tmess_d: 'https://sns-cdn.myxianxiaobao.com/sfximao/t-mess-d.png',
  tmess_a: 'https://sns-cdn.myxianxiaobao.com/sfximao/t-mess-a.png',
  tuser_d: 'https://sns-cdn.myxianxiaobao.com/sfximao/t-user-d.png',
  tuser_a: 'https://sns-cdn.myxianxiaobao.com/sfximao/t-user-a.png'
}

Component({
  data: {

  },
  properties: {
    tbarconfig: {
      type: Array,
      value: [{
        url: '/pages/index/index',
        icon_a: iconimg.thome_a,
        icon_d: iconimg.thome_d,
        isActiveIndex: 0,
        text: '首页',
        newunread: 0
      }, {
        url: '/pages/message/index',
        icon_a: iconimg.tmess_a,
        icon_d: iconimg.tmess_d,
        isActiveIndex: 1,
        text: '消息',
        newunread: 0
      }, {
        url: '/pages/userinfo/index',
        icon_a: iconimg.tuser_a,
        icon_d: iconimg.tuser_d,
        isActiveIndex: 2,
        text: '我的',
        newunread: 0
      }]
    },
    isActiveIndex: {
      type: Number,
      value: 0
    },
    // newunread: {
    //     type: Object,
    //     value: {
    //         isActiveIndex: 0,
    //         newunread: 0
    //     },
    //     observer(newVal) {
    //         console.log(newVal)
    //         this.data.tbarconfig[newVal.isActiveIndex].newunread = newVal.newunread
    //         this.setData({
    //             tbarconfig: this.data.tbarconfig
    //         })
    //     }
    // }
  },
  option: {},
  methods: {
    goToDistancs(e) {
      let { url, key } = e.currentTarget.dataset
	  if (this.data.isActiveIndex === -1 || key === this.data.isActiveIndex) return
      wx.reLaunch({
          url: url,
        })
        // this.triggerEvent("surefunc", true);
    },
  },
  attached: function() {},
  ready: function() {}
})