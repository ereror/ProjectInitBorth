<template lang="pug">
  .wrapper
    .headerpenl
        .div
            .litter
              span 当前可提现
            .scoret
              span {{score | calcscore}}元
        .div.messagescore
            .litter
              .span 当前{{score.cur | calcone}}积分
              .span 提现将消耗{{score.cur | calcscorez}}积分
    .messageandbtn
        .message
          div.title 提现最少需要3000积分（即30元起）
        .btn
          span(@click="getCrash()", :class="{'disbtn': score.cur < 3000}") 全部提现
    mytabbar(:modelactivity="menus")
</template>
<script>
  import { XHeader } from 'vux'
  import { getAccessCode, isuserIdNull } from '@/utils/tools'
  import LocalStorageService from '@/service/storage'
  import circleService from '@/service/userScircle'
  export default{
    components: {XHeader},
    name: 'tixian',
    data () {
      return {
        menus: 'my',
        getcrash: false,
        textnow: 51235
      }
    },
    computed: {
      score () {
        return this.$store.state.wxToken.score
      },
      userid () {
        return this.$store.state.wxToken.userid
      }
    },
    mounted () {
      document.title = '个人提现'
      var code = ''
      var str = location.href
      var store = LocalStorageService.get('storeState')
      if (store) this.$store.commit('setstore', store)
      var mcode = /(?:code=)(\w*)/ig
      var resultc = str.match(mcode)
      var that = this
      if (resultc && resultc.length) code = resultc[0].substring(5)
      if (code) {
        var time = new Date().getTime()
        if (!store || !store.userid || !store.expris || (time - store.expris) / (1000 * 60) > 30) {
          getAccessCode(code)
        }
      }
      if (this.userid) that.getUserInfo()
    },
    methods: {
      getUserInfo () {
        circleService.getUserInfoById({userid: this.userid}).then(res => {
          if (res.status === 200 && res.data && res.data.errcode === 0) {
            this.$store.commit('setstore', res.data)
          }
          if (res.status === 200 && res.data && res.data.errcode === 99) {
            isuserIdNull('activity%2Ftixian')
            return false
          }
        })
      },
      getCrash () {
        if (this.score.cur < 3000) {
          return false
        }
        var temp = {
          userid: this.$store.state.wxToken.userid,
          amount: Math.floor(this.score.cur / 3000) * 30
        }
        if (temp.amount > 20000) temp.amount = 20000
        if (this.getcrash) return
        this.getcrash = true
        this.$vux.loading.show()
        circleService.getTixian(temp).then(res => {
          this.getcrash = false
          this.$vux.loading.hide()
          if (res.status === 200 && res.data && res.data.errcode === 0) {
            this.messageAlert('提现成功')
            this.getUserInfo()
          } else {
            var err = res.data.err_code_des || '系统繁忙，请稍后重试'
            this.messageAlert(err)
          }
        })
      },
      messageAlert (str, bolen) {
        this.$vux.alert.show({
          title: '提示',
          content: str
        })
      }
    },
    filters: {
      calcone (val) {
        val = (val + '').indexOf('.') !== -1 ? (val * 1).toFixed(1) : val
        if (!val) val = 0
        return val
      },
      calcscorez (val) {
        if (!val) return 0
        else return (Math.floor(val / 3000) * 3000) > 200000000 ? 200000000 : (Math.floor(val / 3000) * 3000)
      },
      calcscore (obj) {
        if (!obj.cur) return 0
        return (Math.floor(obj.cur / 3000) * 30)
      }
    }
  }
</script>
<style scoped lang='less'>
  .wrapper {
    &  .headerpenl {
      height: 5rem;
      background: #1c1b20;
      color: white;
      & > div {
        padding-top:.5rem;
        &  .scoret {
          font-size: 1rem;
          font-weight: 600;
          line-height: 1;
        }
      }
      &  .messagescore {
        margin-top: .5rem;
        color: #bfbfbf;
      }
    }
    &  .messageandbtn {
      position: absolute;
      width: 100%;
      bottom: 2rem;
      height: 9rem;
      &  .message {
        padding: .5rem;
      }
      &  .btn {
        position: absolute;
        bottom: 0;
      }
      &  .btn > span {
        display: block;
        padding: .25rem 1rem;
        background: #4180f3;
        width: 5rem;
        margin: 0 auto;
        border-radius: 50px;
        color: white;
        font-weight: 600;
        font-size: .5rem;
        margin-left: 2.5rem;
      }
      &  .btn > .disbtn {
        background: gray;
      }
    }
  }
</style>

