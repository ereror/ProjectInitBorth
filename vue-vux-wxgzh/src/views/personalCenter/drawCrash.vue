<template lang="pug">
  div
    .header.flex
      .person_info.flex
        img.head_icon(:src="icon")
        .name_info
          .name {{nick}}
          p ID:{{userid}}
      button.recharge(@click="recharge") 给他人充值
    .content
      .item(v-for="(item, index) in payitem", :key="index")
        .flex
          .num {{item.num}}
            span 颗钻石
          .money ¥{{item.price}}
        button.buy(@click="sendpady(item)") 立即购买
</template>
<script>
  import pay from '@/service/userScircle'
  import userServerice from '@/service/userServerice'
  import LocalStorageService from '@/service/storage'
  import { getAccessCode, isuserIdNull } from '@/utils/tools'
  export default {
    name: 'drawCrash',
    data () {
      return {
        payitem: [],
        paymodel: 'own',
        ispaying: false
      }
    },
    computed: {
      isLoading () {
        return this.$store.state.loading.isLoading
      },
      icon () {
        return this.$store.state.wxToken.uheadeimgurl
      },
      nick () {
        return this.$store.state.wxToken.unickname
      },
      userid () {
        return this.$store.state.wxToken.userid
      },
      score () {
        return this.$store.state.wxToken.score
      },
      diamond () {
        return this.$store.state.wxToken.diamond
      }
    },
    beforeCreate () {
      setTimeout(function () {
        var wx = window.wx || {}
        if (wx) {
          wx.ready(function () {
            wx.hideOptionMenu()
          })
        }
      }, 500)
    },
    created () {
      document.title = '微信支付'
      this.getpayItem()
      var code = ''
      var str = location.href
      var mcode = /(?:code=)(\w*)/ig
      var resultc = str.match(mcode)
      var store = LocalStorageService.get('storeState')
      if (store) this.$store.commit('setstore', store)
      if (resultc && resultc.length) code = resultc[0].substring(5)
      if (code) {
        var time = new Date().getTime()
        if (!store || !store.userid || !store.expris || (time - store.expris) / (1000 * 60) > 30) {
          getAccessCode(code)
        }
      }
    },
    methods: {
      recharge () {
        this.messageAlert('暂不支持为他人充值', false)
      },
      changePerson () {
        var that = this
        this.$vux.confirm.prompt('输入用户ID', {
          title: '更改充值ID',
          onCancel () {
            console.log('取消操作')
          },
          onConfirm (val) {
            if (!val) return
            userServerice.getUserInfoById({userId: val}).then(res => {
              if (res.status === 200 && res.data && !res.data.errcode) {
                that.paymodel = 'others'
                that.nickname = res.data.nickname
                that.nickId = val
              } else {
                that.messageAlert('该ID没有查询到相关信息，请稍后重试！', false)
              }
            })
          }
        })
        this.$vux.confirm.setInputValue('')
      },
      getpayItem () {
        pay.getpayItem().then(res => {
          if (res.status === 200 && res.data && res.data.item) {
            this.payitem = res.data.item
          }
        })
      },
      sendpady (item) {
        if (this.ispaying) return
        this.ispaying = true
        var userid = this.paymodel === 'own' ? this.$store.state.wxToken.userid : this.nickId
        if (!userid) {
          this.messageAlert('当前用户信息已失效，请刷新页面重新获取！', false)
          return
        }
        this.payCount = item.num
        var param = {
          userid: userid,
          itemid: item.itemid
        }
        pay.postPayWx(param).then(res => {
          this.ispaying = false
          if (res.status === 200 && res.data && res.data.errcode === 99) {
            isuserIdNull('activity%2FdrawCrash')
            return false
          }
          if (res.status === 200 && res.data && res.data.data && !res.data.errcode) {
            this.paysent(res.data.data)
          } else {
            this.messageAlert('支付失败!请稍后重试！', false)
          }
        })
      },
      paysent (item) {
        var that = this
        function onBridgeReady (item) {
          var WeixinJSBridge = WeixinJSBridge || window.WeixinJSBridge
          WeixinJSBridge.invoke('getBrandWCPayRequest', item, function (res) {
            if (res.err_msg === 'get_brand_wcpay_request:ok') {
              that.messageAlert('支付成功!,你已购买' + that.payCount + '颗钻石!', true)
              isuserIdNull('activity%2FdrawCrash')
              return false
            }
          })
        }
        if (typeof WeixinJSBridge === 'undefined') {
          if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
          } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
          }
        } else {
          onBridgeReady(item)
        }
      },
      messageAlert (str, bolen) {
        this.$vux.alert.show({
          title: '提示',
          content: str,
          onHide () {
            console.log('支付完成')
          },
          onShow () {
            console.log('支付完成')
          }
        })
      }
    },
    filters: {
      nicksub: function (value) {
        if (!value) return ''
        else return value.substring(0, 5)
      }
    }
  }
</script>
<style scoped>
  .flex {
    display: flex;
    align-items: center;
  }
  
  .header {
    padding: 0 0.5rem;
    width: 100%;
    height: 3rem;
    background-color: #1b1c20;
    justify-content: space-between;
  }
  
  .head_icon {
    display: inline-block;
    width: 1.7rem;
    height: 1.7rem;
    border-radius: 50%;
    margin-right: 0.3rem;
  }
  
  .name_info {
    width: 3rem;
    text-align: left;
    color: #fff;
    font-size: 18px;
  }
  
  .name {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: bolder;
  }
  
  .recharge {
    border: none;
    outline: none;
    border-radius: 2rem;
    height: 1.2rem;
    width: 3.5rem;
    color: #FFF;
    background-color: #ffad00;
    font-size: 18px;
  }
  
  .content {
    padding: 0.5rem 0.5rem 0 0.5rem;
    background-color: #EEE;
    height: calc(100vh - 3rem);
    overflow: auto;
  }
  
  .item {
    padding: 0 0.3rem;
    font-size: 18px;
    width: 100%;
    height: 2rem;
    background-color: #FFF;
    border-radius: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.3rem;
  }
  
  .num {
    font-weight: bolder;
    margin-right: 0.3rem;
  }
  
  .num > span {
    font-weight: normal;
  }
  
  .money {
    font-weight: bolder;
  }
  
  .buy {
    border: none;
    outline: none;
    border-radius: 2rem;
    height: 1.2rem;
    width: 3.5rem;
    color: #FFF;
    background-color: #ffad00;
    font-size: 18px;
  }
</style>
