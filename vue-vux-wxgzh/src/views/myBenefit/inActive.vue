<template lang="pug">
  div
    mytabbar
    .header.flex
      .count
        p 当前所开游戏(局)
        .num {{itemlist.num}}
      .space_line
      .date
        .num {{todayTime | dateformat}}
        datetime.active_date(v-model="todayTime", @on-change="getNowDate()")
          button.changeDate 更改日期
    .content
      .item(v-for="(item, index) in itemlist.users",:style="styleObj(item.num)")
        p 玩家{{item.nick | subtr}}
        p {{item.num}}局
</template>
<script>
  import { Datetime } from 'vux'
  import circleService from '@/service/userScircle'
  import LocalStorageService from '@/service/storage'
  import date from '@/filter/date'
  export default {
    name: 'inActive',
    components: { Datetime },
    data () {
      return {
        todayTime: new Date() + '',
        itemlist: {
          num: 0,
          users: []
        },
        month: '',
        day: ''
      }
    },
    created () {
      document.title = '活跃度详情'
      var store = LocalStorageService.get('storeState')
      if (store) this.$store.commit('setstore', store)
      var circledata = LocalStorageService.get('circlestr')
      if (circledata) {
        var circleId = circledata.id || ''
        if (circleId) {
          circleService.getTemCircleData({teamid: circleId}).then(res => {
            if (res.status === 200 && !res.data.errcode && res.data.statdata) {
              var statdata = res.data.statdata && JSON.parse(res.data.statdata)
              this.circleData = statdata.data
              console.log(this.circleData)
              this.circleData.map(v => {
                v.showmore = false
                v.sum = 0
                v.users = this.objToArr(v.users)
                for (var i in v.users) {
                  if (v.users[i].num * 1 > v.sum) v.sum = v.users[i].num
                }
              })
              this.getNowDate()
            }
          })
        }
      }
    },
    methods: {
      getNowDate () {
        var month = new Date(this.todayTime).getMonth() + 1
        var day = new Date(this.todayTime).getDate()
        console.log('最开始：' + month, day)
        this.circleData.map(v => {
          var m = v.time.split('_')[1]
          var d = v.time.split('_')[2]
          if (month === m * 1 && day === d * 1) {
            console.log('123')
            this.itemlist.num = v.num
            this.itemlist.users = v.users
            this.maxscore = this.calcscore(this.itemlist)
          }
        })
        console.log(this.itemlist)
      },
      styleObj (val) {
        return {
          width: ((0.6 * (val - this.maxscore) / this.maxscore + 1) * 100 + '%')
        }
      },
      objToArr (obj) {
        if (Object.prototype.toString.call(obj) === '[object Object]') {
          var arr = []
          for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
              arr.push(obj[i])
            }
          }
          arr.sort((a, b) => {
            return b.num - a.num
          })
          if (arr.length) return arr
          else return obj
        } else {
          return obj
        }
      },
      checkItem (val) {
        console.log(val)
        this.isb = val
      },
      calcscore (arr) {
        let tmp = []
        for (var item in arr.users) {
          tmp.push(arr.users[item].num)
        }
        return Math.max(...tmp || 1)
      }
    },
    filters: {
      dateformat (val) {
        if (!val || !new Date(val).getTime()) return ''
        else return date(val, 'yyyy-MM-dd')
      },
      subtr (val) {
        if (!val) return val
        else return val.substring(0, 6) + '...'
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
    color: #FFF;
    justify-content: space-between;
  }
  
  .count {
    width: 50%;
    text-align: left;
  }
  
  .date {
    width: 50%;
    text-align: right;
  }
  
  .num {
    font-size: 26px;
    font-weight: bolder;
  }
  
  .changeDate {
    border: none;
    outline: none;
    border-radius: 2rem;
    height: 1.2rem;
    width: 3.5rem;
    color: #FFF;
    background-color: #ffad00;
    font-size: 18px;
  }
  
  .space_line {
    width: 1px;
    height: 80%;
    background-color: #FFF;
  }
  
  .content {
    height: calc(100vh - 3rem);
    background-color: #eeeeee;
    padding: 0.5rem 0;
  }
  
  .item {
    font-size: 16px;
    color: #fff;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.2rem;
    background-color: #ffad00;
    margin-bottom: 0.3rem;
  }
  .active_date {
    background: none;
    padding: 10px 0px;
    float: right;
  }
  .active_date:active {
    background:none;
  }
</style>
<style>
  .active_date:before {
    border-top: none !important;
  }
</style>
