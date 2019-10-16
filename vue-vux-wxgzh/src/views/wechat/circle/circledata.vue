<template lang='pug'>
    div(style="width:100%;")
        loading(v-model="isLoading")
        .group(label-width="5em" style="padding:.5em;color:#848484" v-for='(item,index) in circleData' :key='item.key')
          div.clearfix(style="padding:.5em .25em 0 .25em" v-show='!item.showmore')
            div(style="float:left")
              span(style="display:inline-block") 
                icon.cion(name='ico_rili' style="width:1em;height:1em;margin-right:.5em;")
              span(style="display:inline-block") {{item.time | calcDate}}
            div(style="float:right")
              span 全天所开游戏（桌）
              span(style="font-size:1.2em;font-weight:bolder;color:#49aeff;vertical-align: middle;") {{item.num || 0}}
          div.clearfix(style="padding:0 .5em;text-align:left" v-show='!item.showmore')
            span 当前活跃玩家前三
          div.clearfix(style="padding:.5em .25em 0 .25em" v-show='item.showmore')
            div(style="float:left")
              span 当日牌局
            div(style="float:right")
              span(style="display:inline-block") 
                icon.cion(name='ico_rili' style="width:1em;height:1em;margin-right:.5em;")
              span(style="display:inline-block") {{item.time | calcDate}}
          div.clearfix(style="padding:0 .25em;text-align:left" v-show='item.showmore')
              span(style="font-size:4em;font-weight:bolder;color:#49aeff;line-height:1") {{item.num || 0}}
              span 局
          div.clearfix(style="padding:0 .5em;text-align:left")
             ul
                 li(style="margin:.5em 0;background:#f2f2f2;height:2em;line-height:2em;color:white;font-weight:bolder" v-for='(user, index) in item.users', :key='user.key' v-show='index <= 2 || item.showmore')
                      //- div.polifitem(:style="{width: (0.55 * (polifitem.total - maxYearCount) / maxYearCount + 0.95)* 100 + '%'}")
                      div.polifitem(:style="{width: (0.6 * (user.num - item.sum) / item.sum + 1) * 100 + '%', background: colors[index] || colors[colors.length-1]}")
                          div(style="width:50%;text-align:left;padding-left:1em;font-size:0.8em")
                              span {{user.nick || '玩家'}}
                          div(style="width:50%;text-align:right;padding-right:1em;font-size:0.8em")
                              span {{user.num || 0}}桌
          div.clearfix(style="padding:0 0.5em;text-align:right")
            span.btn(@click='showmore(index)') {{item.showmore ? '收起全部': '查看更多'}}
        //- .group(label-width="5em" style="padding:.5em;" v-for='(item,index) in circleData' :key='item.key') 
        //-     div.title(style="ovrflow:hidden;margin-bottom:.5em;")
        //-         span {{item.time | calcDate}}
        //-         x-button.float-r(style="width:4.8rem;float:right;font-size:.8em" @click.native="showmore(index)") 
        //-           span {{item.showmore ? '收起': '全部'}}
        //-           icon.icon(name="ico_arrow_down" width="20" height="20" style="vertical-align:middle;margin-top:-4px" v-show="!item.showmore")
        //-           icon.icon(name="ico_arrow_up" width="20" height="20" style="vertical-align:middle;margin-top:-4px" v-show="item.showmore")
        //-     div.contentcash
        //-         div.row
        //-             div.cleft 牌桌数
        //-             div.ccenter &nbsp;
        //-             div.cright {{item.num || 0}}桌
        //-         div.row(v-for='(user, key, index) in item.users', :key='user.key' v-show='index <= 2 || item.showmore')
        //-             div.cleft {{index === 0 ? '参与牌局排行' : ''}}
        //-             div.ccenter {{user.nick || '玩家'}}
        //-             div.cright {{user.num || 0}}桌
</template>
<script>
  import { Tab, TabItem, Grid, GridItem, XTextarea, Group, XInput, XButton, Loading } from 'vux'
  import circleService from '@/service/userScircle'
  import { calcrem } from '@/utils/common'
  calcrem()
  export default {
    name: 'circledata',
    components: {
      Tab,
      TabItem,
      Group,
      Grid,
      GridItem,
      XTextarea,
      XInput,
      XButton,
      Loading
    },
    computed: {
      isLoading () {
        return this.$store.state.loading.isLoading
      }
    },
    data () {
      return {
        isb: 1, // 倍率
        circleData: [],
        colors: ['#9546c3', '#8d4dc8', '#8651cb', '#7b58ce', '#735ed5', '#6d62d8', '#6568dd', '#6267dc', '#5d6ee2', '#5374e5']
      }
    },
    created () {
      document.title = '活跃度详情'
      var circleId = this.$route && this.$route.params && this.$route.params.circleId || ''
      if (circleId) {
        circleService.getTemCircleData({teamid: circleId}).then(res => {
          if (res.status === 200 && !res.data.errcode && res.data.statdata) {
            var statdata = res.data.statdata && JSON.parse(res.data.statdata)
            this.circleData = statdata.data
            this.circleData.map(v => {
              v.showmore = false
              v.sum = 0
              v.users = this.objToArr(v.users)
              for (var i in v.users) {
                if (v.users[i].num * 1 > v.sum) v.sum = v.users[i].num
              }
            })
          }
        })
      }
    },
    methods: {
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
      showmore (index) {
        this.circleData[index].showmore = !this.circleData[index].showmore
        this.$set(this.circleData, index, this.circleData[index])
      }
    },
    filters: {
      calcDate: function (val) {
        var datenow = new Date().getDate()
        var dataold = new Date(val).getDate()
        if (typeof dataold === 'undefined' || !dataold) return val
        var timed = datenow - dataold
        var str
        if (timed >= 3) {
          str = val
        } else if (timed >= 2) {
          str = '前日'
        } else if (timed >= 1) {
          str = '昨日'
        } else if (timed >= 0) {
          str = '今日'
        } else {
          str = val
        }
        return str
      }
    }
  }
</script>
<style lang='less' scoped>
    body {
      background: #f5f5f5;      
    }
    .btn {
      display: inline-block !important;
      padding: .4em;
      border-radius: 5px;
      color: #44a7ff;
      width: 5em;
      border: 1px solid;
      text-align: center;
    }
    .group{
        margin:.5em 0em;
        width: 100%;
        background: white;
        & .title {
            text-align: left;
            font-size:1.1em;
        }
        & .contentcash {
            & .row {display: flex;}
            & .cleft {
                flex-grow:1;
                text-align:center;
                width:25%;
                overflow:hidden;
            }
            & .ccenter {
                flex-grow:1;
                text-align: center;
                width:50%;
                overflow:hidden;
            }
            & .cright {
                flex-grow:1;
                text-align:center;
                width:25%;
                overflow:hidden;
            }
        }
    }
    .polifitem {display:flex;min-width:40%;max-width:100%;background:#ff9999;}    
</style>
