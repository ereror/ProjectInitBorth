<template lang='pug'>
  div.containbox
    Sticky
      div.clearfix.headpay
        div.floatL
          div.align-l.graytest 充值对象
          div.payuser
            span 昵称：{{nickname | nicksub}}
            span(style="margin-left:.5em") ID:{{nickId}}
        div.floatR.headbtn
          span.btn(@click='changePerson') 更改
    div.itemcenter
      ul
        li(v-for="(item, index) in payitem", :key='item.key', :class="{'clearr': (index + 1) % 3 === 0}") 
          .imgcenter
            img(src="~@/assets/image/iconbg.png")
          .div
            | 房卡
            span.fkspan {{ item.num }}
            | 张
          .div
            span.fpspan ￥{{ item.price }}
          div.gwcbtn(@click='sendpady(item)') 点击购买
    div.gwcb(v-show="false")
      div
        ul
          li
            div.align-l 购物车
          li.gwcitem
            div.floatL
              | 房卡
              span.gwcspan 250
              | 张
            div.floatR
              span.gwbtn 清空
          li.gwcitem
            div.floatL
              | 合计：
              span.gwcspan ￥250
            div.floatR
              span.gwbtn 支付           
</template>
<script>
  import { Group, Cell, Flexbox, FlexboxItem, Sticky } from 'vux'
  import pay from '@/service/userScircle'
  import userServerice from '@/service/userServerice'
  import LocalStorageService from '@/service/storage'
  import { getAccessCode } from '@/utils/tools'
  export default {
    name: 'recharge',
    components: {
      Group,
      Cell,
      Flexbox,
      FlexboxItem,
      Sticky
    },
    data () {
      return {
        model: 1,
        payitem: [],
        payCount: 0,
        paymodel: 'own'
      }
    },
    computed: {
      nickname () {
        return this.$store.state.wxToken.unickname
      },
      nickId () {
        return this.$store.state.wxToken.userid
      }
    },
    created () {
      document.title = '微信支付'
      this.getpayItem()
      var code = ''
      var str = location.href
      var mcode = /(?:code=)(\w*)/ig
      var resultc = str.match(mcode)
      if (resultc && resultc.length) code = resultc[0].substring(5)
      if (code) {
        var that = this
        var time = new Date().getTime()
        var store = LocalStorageService.get('storeState')
        if (store) that.$store.commit('setstore', store)
        if (!store || !store.userid || !store.expris || (time - store.expris) / (1000 * 60) > 30) {
          getAccessCode(code)
        }
      }
    },
    methods: {
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
                that.unionId = res.data.unionId
                that.openid = res.data.openId
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
        console.log('支付开始')
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
          if (res.status === 200 && res.data && res.data.data) {
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
              that.messageAlert('支付成功!,你已购买' + that.payCount + '张房卡!', true)
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
<style lang='less' scoped>
  .containbox {
    position: relative;
    min-height: 100%;
    width: 100%;
    background: whitesmoke;
    overflow: hidden;
    & .headpay {
      height: 2rem;
      background: white;
      padding: .2rem .5rem; 
      & .payuser {
        font-weight: 600;
        font-size:1.1em;
        & span {
          display: inline-block;
        }
      }
      & .headbtn {
        float:right;
        padding:0.25rem;
      }
    }
    & .graytest {
      color: gray;
    }
    & .gwcb {
      position: absolute;
      z-index: 2;
      bottom: 0px;
      width: 100%;
      height: 4rem;
      padding: 0.5rem;
      background: #ffffff;
      & ul li {
        border-bottom: 1px solid #f3f3f3;
      }
      & ul li.gwcitem {
        height: 1.5rem;
        border-bottom: 1px solid #f3f3f3;
        color: black;
        padding: .4rem 0;
        & .floatL {
          font-size:1.2em;
          & .gwcspan {
            font-weight: 600;
            color: green;
            margin: 0 .5em;
          }
        }

        & .gwbtn {
          letter-spacing: .4em;
          font-size: 1.2em;
          color: green;
          padding: 0.2em 0.6em;
          border: 1px solid green;
          border-radius: .2em;          
        }
      }
    }
  }
  .align-c {
    text-align: center;
  }
  .align-l {
    text-align: left;
  }
  .floatL {
    float: left;
  }
  .floatR {
    float: right;
  }
  .btn {
    display: inline-block;
    letter-spacing: .4em;
    font-size: 1.2em;
    color: green;
    padding: 0.2em 0.6em;
    border: 1px solid green;
    text-align: center;
    border-radius: .3em;
  }
  .itemcenter {
    padding: .2rem 0.5rem 4rem .5rem;
    overflow-y: auto;
    & ul{
      width:100%;
    }
  }
  .itemcenter ul li {
    position: relative;
    margin-top:.5rem;
    width: 32%;
    margin-right: 2%;
    height: 4rem;
    background: white;
    overflow: hidden;
    float: left;
    & .imgcenter {
      margin-top:.2rem;
      & img {
        height: 1.5rem;
        width: auto;
      }
    }
    & .fkspan {
      font-weight: 600;
      color: green;
      margin: 0 .5em;
    }
    & .fpspan {
      font-weight: 600;
      font-size: 1.2em;
      color: green;      
    }

    & .gwcbtn {
      width: 100%;
      height: 1rem;
      color: white;
      font-size: 1.1em;
      background: green;
      line-height: 1rem;      
    }
  }
  .itemcenter ul li.clearr {
    margin-right: 0;
  }
</style>
<style>
  body {
    background:white !important;
  }
</style>
