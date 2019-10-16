<template lang="pug">
  .wrapper
    .headerpenl
        .div
            .scoret
              span {{totalscore}}
              //- span totalscore
            .litter
              span 总提现金额
        .licontent
            .lidetail
               .liitem.headerli
                  .dpenl.divdate
                     span 日期
                  .dpenl.dscore
                     span 提现积分
               .liitem(v-for='item in itemli')
                  .dpenl.divdate
                     span {{item.tixianlogs.time | dateform}}
                  .dpenl.dscore
                     span {{item.tixianlogs.score}}
            .morebtn(v-show='ismore' @click='getCrashRecode(1)')
                span 查看更多
    mytabbar(:modelactivity="menus")
</template>
<script>
  import { getAccessCode } from '@/utils/tools'
  import LocalStorageService from '@/service/storage'
  import activityService from '@/service/activity'
  import date from '@/filter/date'
  export default{
    name: 'tirecode',
    data () {
      return {
        curpage: 1,
        pagecount: 10,
        ismore: false,
        itemli: [],
        totalscore: 0
      }
    },
    computed: {
      userid () {
        return this.$store.state.wxToken.userid
      }
    },
    mounted () {
      document.title = '提现记录'
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
      if (this.userid) that.getCrashRecode()
    },
    methods: {
      getCrashRecode (ismore) {
        var curpage = ismore ? this.curpage++ : this.curpage
        var temp = {
          userid: this.userid,
          curpage: curpage,
          pagecount: this.pagecount
        }
        activityService.getTiXianLogs(temp).then(res => {
          if (res.status === 200 && res.data && res.data.errcode === 0) {
            if (res.data && res.data.data) {
              this.totalscore = res.data.totalscore
              this.ismore = true
              this.itemli = [...new Set(this.itemli.concat(res.data.data))]
              this.ismore = res.data.data.length === 10
            }
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
      dateform (val) {
        return date(val)
      },
      calcscore (obj) {
        if (!obj.cur) return 0
        return (Math.floor(obj.cur / 3000) * 30)
      }
    }
  }
</script>
<style scoped lang='less'>
  #app {background:#f6f6f6}
  .wrapper {
    &  .headerpenl {
      height: 2.2rem;
      background: #1c1b20;
      color: white;
      & > div {
        padding-top:.5rem;
        &  .scoret {
          font-size: .8rem;
          font-weight: 600;
          line-height: 1;
        }
      }
      &  .licontent{
        position:absolute;
        background: #f6f6f6;
        color:black;
        width:100%;
        margin-top: .5rem;
        height: 80%;
        max-height:  80%;
        padding-bottom:1rem;
        overflow:auto;
        &  .lidetail {
          width:80%;
          margin:0 auto;
          overflow:hidden;
          &  .liitem {
             display:flex;justify-content:center;align-item:center;
             &  .dpenl{width:50%;line-height:.8rem;font-size:.3rem;border-bottom:1px solid gray;border-right:1px solid gray;}
             &  .divdate{border-left:1px solid gray;}
          }
          &  .headerli {background: #e6e6e6;}
          &  .headerli .dpenl{border-top:1px solid gray;}
        }
        &  .morebtn {
          padding:.2rem;
          & span {
            padding: .1rem 0.4rem;
            display: inline-block;
            border: 1px solid gray;
            border-radius: .1rem;
          }
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

