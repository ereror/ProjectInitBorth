<template lang='pug'>
  .container
    div(style='position:absolute;z-index:1;background:white;')
      img(src='~@/assets/image/snatch/sharepoolbg.jpg')
    .centerboxyqdb(:class="{'huawei': isHuawei}" style='position:absolute;z-index:2;')
        .dbbar(v-show='jointickets !== tickets' style="margin-top:3.6rem;height:5.5rem;")
          .processbox
              .processspan 开奖进度{{proportion * 10000 / 100}}%
              .process
                  .processnow(:style="{width: proportion * 100 + '%'}")
          .ticketbar.clearfix(style='padding:.4rem .2rem;')
              .fl(style='font-size:1.1em;color:white' v-show='logontimes')
                span 我的夺宝券：{{duobao_tickets || 0}} 张
              .fl(style='font-size:1.1em;color:white' v-show='!logontimes')
                span 我的夺宝券：0 张
              .fr(style='font-size:1.1em;color:white')
                span 本期已夺宝：{{jointickets}} 张
          .cliclbtn(@click='dbfunc()')
              img(src='~@/assets/image/snatch/sharepoolbgnew.png' v-show='!logontimes')
              img(src='~@/assets/image/snatch/sharepoolbgold.png' v-show='logontimes')
              //- span(v-show='logontimes') 助力夺宝
              //- span(v-show='!logontimes') 加入游戏，获取夺宝券
        .dbresult(v-show='jointickets === tickets || over' style="margin-top:3rem;height:6.1rem;")
          .img
            img(:src='prize.icon'  style='height:3rem;width:3rem;border-radius:.2rem;') 
          .winname(style='padding:.4rem;font-size:1.2em;color:white;letter-spacing:.1em;') {{prize.nick}}夺得本期20元大奖!
        .dblist(style='height:7rem;color:white;overflow:auto;margin-top:2.5rem;padding-left:.6rem;')
          .item.clearfix(style='height:1.5rem;' v-for='item in joinData')
            .fl
              img(:src='item.joinrecords.icon' style='height:1rem;width:1rem;margin-top:.25rem;border-radius:.1rem;')
            .itemcontent.fl(style='margin-left:.2rem;line-height:1.5rem;') {{item.joinrecords.nick}} {{item.joinrecords.timesign}} 投入{{item.joinrecords.num}}张夺宝券
        .imgbtn(style='margin-top:1rem;padding-top:1rem;margin-left:-.4rem;')
            .weixin.fl
              img(src="~@/assets/image/snatch/qrcode.jpg" style='width:3rem;height:auto;')
            .download.fr
        //- .setpoolbtn(@click='setAccessPersonPool()')
</template>
<script>
  import { getAccessCode } from '@/utils/tools'
  import activity from '@/service/activity'
  import LocalStorageService from '@/service/storage'
  export default {
    name: 'sharepool',
    data () {
      return {
        id: '',
        userid: '',
        proportion: 0.7,
        nick: 'xxx',
        score: 0,
        icon: '',
        isHuawei: false,
        jointickets: 0,
        tickets: 1,
        over: false,
        prize: {
          icon: ''
        },
        joinData: [],
        count: 0
      }
    },
    computed: {
      ownid () {
        return this.$store.state.wxToken.userid
      },
      logontimes () {
        return this.$store.state.wxToken.logontimes
      },
      duobao_tickets () {
        return this.$store.state.wxToken.duobao_tickets
      }
    },
    created () {
      document.title = '九点娱乐--一券夺宝'
      var code = ''
      var str = location.href
      this.setParam(str)
      var mcode = /(?:code=)(\w*)/ig
      var resultc = str.match(mcode)
      if (resultc && resultc.length) code = resultc[0].substring(5)
      if (code) {
        var that = this
        var store = LocalStorageService.get('storeState')
        if (store) that.$store.commit('setstore', store)
        getAccessCode(code, 0, this.id).then(res => {
          this.getPersonPool(this.id)
          this.getJoinLists(this.id)
        })
      }
      var version = navigator.appVersion
      if (version.indexOf('HUAWEI') !== -1 || version.indexOf('Honor') !== -1) {
        this.isHuawei = true
      }
    },
    methods: {
      dbfunc () {
        if (this.logontimes) this.setJoinPersonPool()
        else location.hash = '#/download?openagin'
        // else this.$router.replace({name: 'sharepoolresult', params: {id: 0}})
      },
      setParam (str) {
        var exec = 'sharepool?'
        var indexsub = str.indexOf(exec)
        if (indexsub === -1) {
          return
        }
        str = str.substring(indexsub + 10)
        this.id = str
      },
      getJoinLists (id) {
        activity.getJoinList({id: id}).then(res => {
          if (res.status === 200 && res.data && !res.data.errcode) {
            this.joinData = res.data && res.data.data || []
            var nowtime = new Date().getTime()
            this.joinData.map(v => {
              v.joinrecords.timesign = ''
              v.joinrecords.nick = v.joinrecords.nick.length > 4 ? v.joinrecords.nick.substring(0, 4) + '...' : v.joinrecords.nick
              if (v.joinrecords.time) {
                v.joinrecords.time = new Date(v.joinrecords.time).getTime()
                v.joinrecords.timesign = this.calcTime(nowtime, v.joinrecords.time)
              }
            })
          }
        })
      },
      calcTime (newtime, oldtime) {
        var str = ''
        var hours = Math.floor((newtime - oldtime) / 3600 / 1000)
        if (hours <= 1) str = '刚刚'
        else if (hours <= 24) str = hours + '小时前'
        else if (hours > 24) str = Math.floor(hours / 24) + '天前'
        return str
      },
      getPersonPool (id) {
        activity.getPersonPool({id: id}).then(res => {
          if (res.status === 200 && res.data && !res.data.errcode) {
            this.nick = res.data && res.data.pool && res.data.pool.nick
            this.icon = res.data && res.data.pool && res.data.pool.icon
            this.userid = res.data && res.data.pool && res.data.pool.userid
            this.score = res.data && res.data.pool && res.data.pool.score / 100
            this.over = res.data && res.data.pool && res.data.pool.over
            if (this.over) {
              this.jointickets = this.tickets
              this.proportion = 1
              this.prize = Object.assign({}, res.data && res.data.pool && res.data.pool.prize)
            } else {
              var tickets = res.data && res.data.pool && res.data.pool.tickets || 0
              var jointickets = res.data && res.data.pool && res.data.pool.jointickets || 0
              this.tickets = tickets
              this.jointickets = jointickets
              if (tickets) this.proportion = Math.round(jointickets / tickets * 100) * 100 / 10000
              else this.proportion = 0
              if (this.proportion >= 0.55 && this.proportion < 0.56) this.proportion = 0.55
              this.proportion = this.proportion.toFixed(2)
            }
            if (!this.count) {
              this.setAccessPersonPool()
              this.count++
            }
          } else {
            // this.$router.replace({name: 'sharepoolresult', params: {id: 0}})
            this.$vux.alert.show({
              title: '提示',
              content: '当前活动已失效或不存在！'
            })
          }
        })
      },
      setJoinPersonPool () {
        var temp = {
          id: this.id,
          userid: this.userid,
          shareid: this.$store.state.wxToken.userid
        }
        if (!temp.shareid) {
          this.$vux.alert.show({
            title: '提示',
            content: '当前页面消息已失效，需要重新稍后重试'
          })
          return
        }
        if (!this.duobao_tickets) {
          this.$vux.alert.show({
            title: '提示',
            content: '当前夺宝券不足！'
          })
          return
        }
        var counter = 0
        this.joinData.map(v => {
          if (v.joinrecords.userid === this.ownid) counter++
        })
        if (counter >= 18) {
          this.$vux.alert.show({
            title: '提示',
            content: '当前夺宝券最多只能投递18张'
          })
          return
        }
        activity.JoinPersonPool(temp).then(res => {
          if (res.status === 200 && res.data && !res.data.errcode) {
            // this.$router.replace({name: 'sharepoolresult', params: {id: 123, name: this.nick, score: this.score}})
            this.jointickets++
            this.proportion = Math.round(this.jointickets / this.tickets * 100) * 100 / 10000
            if (this.proportion >= 0.55 && this.proportion < 0.56) this.proportion = 0.55
            this.proportion = this.proportion.toFixed(2)
            var store = LocalStorageService.get('storeState')
            store.duobao_tickets--
            this.$store.commit('setstore', store)
            this.over = res.data && res.data.pooldata && res.data.pooldata.over
            if (this.over) {
              this.jointickets = this.tickets
              this.proportion = 1
              this.prize = Object.assign({}, res.data && res.data.pool && res.data.pool.prize)
              this.$vux.alert.show({
                title: '提示',
                content: '助力夺宝成功，本期夺宝已开奖！'
              })
              this.getPersonPool(this.id)
            } else {
              this.$vux.alert.show({
                title: '提示',
                content: '助力夺宝成功！'
              })
            }
            this.getJoinLists(this.id)
          } else {
            console.log(res.data)
            if (res.data.errcode === 99) {
              this.$vux.alert.show({
                title: '提示',
                content: '当前页面消息已失效，需要重新稍后重试'
              })
            }
          }
        })
      },
      setAccessPersonPool () {
        var temp = {
          id: this.id,
          userid: this.userid,
          shareid: this.$store.state.wxToken.userid
        }
        if (!temp.shareid) {
          this.$vux.alert.show({
            title: '提示',
            content: '当前页面消息已失效，需要重新稍后重试'
          })
          return
        }
        activity.accessPersonPool(temp).then(res => {
          if (res.status === 200 && res.data && !res.data.errcode) {
            // this.$router.replace({name: 'sharepoolresult', params: {id: 123, name: this.nick, score: this.score}})
          } else {
            if (res.data.errcode === 99) {
              this.$vux.alert.show({
                title: '提示',
                content: '当前页面消息已失效，需要重新稍后重试'
              })
            } else {
              this.$vux.alert.show({
                title: '提示',
                content: res.data && res.data.errmsg
              })
            }
          }
        })
      }
    },
    filters: {
      nameform (val) {
        if (!val) return
        if (val.length > 3) {
          return val.substring(0, 3) + '...'
        } else return val
      }
    }
  }
</script>
<style scoped lang='less'>
   .container{
      position:relative;
      height:100%;
      background-size:100% 100%;
      & .centerboxyqdb {
        width: 8rem;
        height: 8rem;
        border-radius: 0.1rem;
        margin-top: 5rem;
        position: absolute;
        left: 50%;
        margin-left: -4rem;
        &  .imghead {width:2rem;height:2rem;background:#f5d198;border-radius:.1rem;margin:0 auto;
            & img {height:2rem;width:2rem;border-radius:.1rem;}
        }
        &  .messagebox {font-size:.6rem;color:#f5d198;margin-top:.4rem;}
        &  .processbox {
            padding:.4rem .4rem;
            margin-top:.2rem;
            &  .process {
                background:url('~assets/image/snatch/yqdbjdt2.png') no-repeat;
                background-size:100% 100%;
                height:.6rem;
                width:100%;
                &  .processnow {
                    background:url('~assets/image/snatch/yqdujdti2.png') no-repeat;
                    background-size:cover;
                    width:80%;
                    height:.6rem;
                }
            }
            &  .processspan {
                margin-top:.1rem;
                margin-bottom:.1rem;
                color:#ffdf32;
                font-size:1.2em;
                font-weight:500;
            }
        }
        &  .setpoolbtn {
            background:url('~assets/image/snatch/joindbbtn.png') no-repeat;
            background-size:100% 100%;
            height: 1.4rem;
            width: 5.6rem;
            margin:.5rem auto;
        }
      }
      &  .huawei{
        margin-top: 4.2rem;
      }
   }
</style>
