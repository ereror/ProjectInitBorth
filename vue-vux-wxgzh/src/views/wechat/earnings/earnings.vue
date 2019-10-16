<template lang='pug'>
    div
        div(style="height:44px")
          sticky(:check-sticky-support="true")
            tab
              tab-item(@on-item-click="onItemClick('circlepolif')" active-class="active-6-1" style="color:#7f7f7f") 我的分利树
              tab-item(@on-item-click="onItemClick('wecle')" active-class="active-6-1" style="color:#7f7f7f") 我的圈子
              tab-item(@on-item-click="onItemClick" selected class='active-6-2') 我的收益
        div(style="margin: 10px 0;overflow: hidden;" v-for="item in list")
          masker(style="border-radius: 2px;" color="white" :opacity="0.2")
            div(class="m-img" style="background: -webkit-gradient(linear,left top,right bottom, from(#2095ff),to(#6500fe));")
            div(slot="content" class="m-title")
              div
                span(style="font-size:.8em;") 累计收益（分）
              //- countup(:end-val="allTotal" :duration="1" :decimals="2" class="demo1")
              div.demo1 {{allTotal || 0}}
        tab(style="padding:0 13px 0 10px;overflow: hidden;")
           tab-item(@on-item-click="model = 1" selected active-class="active-6-2" style="color:#7f7f7f")
             span 圈子（累计{{circleData.total || 0}}）
           tab-item(@on-item-click="model = 2" active-class="active-6-2" style="color:#7f7f7f") 
             span 分利（累计{{polif.total || 0}}）
             //- span 分利（累计{{poliftotal || 0}}）
        //- flexbox(style="padding:0 13px 0 10px;overflow: hidden;")
        //-     flexbox-item
        //-         x-button(style="font-size:1em;padding:.6em 1em;font-weight:bolder", :type="model === 1 ? 'primary' : 'default'" @click.native='model = 1') 
        //-             span 圈子（累计{{circleData.total || 0}}）
        //-     flexbox-item
        //-         x-button(style="font-size:1em;padding:.6em 1em;font-weight:bolder", :type="model === 2 ? 'primary' : 'default'" @click.native='model = 2')
        //-             span 分利（累计{{poliftotal || 0}}）
        group(style="margin:-10px 0;" v-show="model === 1")
          .titlebar(style="width:100%;overflow:hidden;padding:10px 10px;display: flex;align-items: center;")
            .titlel(style="width:30%;text-align:left;float:left;font-size:.8em;color:#636363;line-height:2.5")
                span(v-show='ploifquery === 0') 
                  | 小计 : 
                  span(style="color:#47a4ed;vertical-align:middle") {{nowday}}
                span(v-show='ploifquery === 1') 
                  | 小计 : 
                  span(style="color:#47a4ed;vertical-align:middle") {{circleData.total || 0}}
            .optbar(style="width:70%;text-align:right;float:left;")
                span(style="font-size:0.8em") 排序方式
                span.btn(@click='ploifquery = 0', :class="{'active': ploifquery === 0}" style="font-size:0.8em") 今日收益
                span.btn(@click='ploifquery = 1', :class="{'active': ploifquery === 1}" style="font-size:0.8em") 累计收益
        group(style="margin:-10px 0" v-show="model === 1" v-for='item in circleData.teams' :key='item.key')
            .contentItem(style="padding:0 10px;")
                .item
                    .titleItem
                        .divL 
                            .header {{item.name}}
                            .headernumber(style="color:#b3b3b3;font-size:0.9em;margin-left:1em;" v-show="item.id") 
                              icon.icon(name="ico_edit" style="height:.9em;width:.9em;vertical-align:middle")
                              span ({{item.id}})
                        .divR(style="float:right;padding-top:10px;text-align:right;padding-right:15px;" v-show="item.dismiss")
                            span(style='color:red;font-size:1.2em;font-weight:600') 已解散
                    .content2.clearfix(style="padding:0 10px 10px 5px")
                        .divL(style="float:left;font-size:.9em;color:#b3b3b3")
                            .msg(style="text-align:left")
                                | 今日收益:
                                span(style="font-size:1.2em;font-weight:600;color:#4192dc;margin:.5em") {{item.nowtotal || 0}}
                            .msg(style="text-align:left")
                                | 累计收益:
                                span(style="margin:.5em;font-weight:600;color:#a0a0a0") {{item.total || 0}}
                        .divR(style="float:right;padding-top:10px;")
                            span.btn(style='border-radius:5px;border: 2px solid #2196fc;color:#2196fc;padding:.4em .6em;font-size:.9em' @click="polifdetail(item)") 收益统计
        group(style="margin:-10px 0; " v-show="model === 2")
            .titlebar(style="width:100%;overflow:hidden;padding:10px 10px;display: flex;align-items: center;")
                .titlel(style="width:30%;text-align:left;float:left;font-size:.8em;color:#636363;line-height:2.5")
                    span(v-show='showall')
                      | 小计 : 
                      span(style="color:#47a4ed;vertical-align:middle") {{polif.total || 0}}
                    span(v-show='!showall')
                      | 小计 : 
                      span(style="color:#47a4ed;vertical-align:middle") {{poliftotal || 0}}
                .optbar(style="width:70%;text-align:right;float:left")
                    span(@click="changedate(polifTime, 'sub')")
                      icon(class="icon" name="ico_leftp" style="height:1.5em;width:1.5em;vertical-align:middle;color:#47a4ed" )
                    span(style="color:gray;font-size:0.8em;margin:0" @click="visibility = true") {{polifTime}} 
                    span(@click="changedate(polifTime, 'add')")
                      icon(class="icon" name="ico_rightp" style="height:1.3em;width:1.3em;vertical-align:middle;color:#47a4ed" )
                    span.btn(style="font-size:0.8em" @click="showAll()" v-show='!showall') 查看全部
                    span.btn(style="font-size:0.8em" @click="showall = !showall" v-show='showall') 返回当月
        group(style="margin:-10px 0; " v-for="polifItem in polif.data" v-show="(model === 2) && (polifItem.time === newYear || showall)", :key="polifItem.key")
            .content(style="padding:0 10px;")
                ul(v-for="monthsItem in polifItem.months" v-if="monthsItem.time === newMonth + 1 && !showall")
                    li(style="margin:.5em 0;background:#f2f2f2;height:2em;line-height:2em" v-for='(item, index) in monthsItem.details' @click='persondetail(item)')
                        div.poliftItem(:style="{width: ((0.6 * (item.score - monthsItem.details[0].score) / monthsItem.details[0].score + 1)* 100 + '%'), background: colors[index] || colors[colors.length - 1]}")
                            div(style="width:70%;text-align:left;padding-left:.5em;font-size:0.9em")
                                span(style="overflow: hidden;line-height: 1;white-space: nowrap;") {{item.nick}}
                            div(style="width:30%;text-align:right;padding-right:.5em;font-weight:bolder;color:white")
                                span(v-show='item.score') {{item.score}}
                                span(v-show='!item.score') 0
                ul(v-if="showall")
                    li(style="margin:.5em 0;background:#f2f2f2;height:2em;line-height:2em" v-for='(item, index) in polifItem.details' @click='persondetail(item)')
                        div.poliftItem(:style="{width: ((0.6 * (item.score - polifItem.details[0].score) / polifItem.details[0].score + 1)* 100 + '%'), background: colors[index] || colors[colors.length - 1]}")
                            div(style="width:70%;text-align:left;padding-left:.5em;font-size:0.9em")
                                span(style="overflow: hidden;line-height: 1;white-space: nowrap;") {{item.nick}}
                            div(style="width:30%;text-align:right;padding-right:.5em;font-weight:bolder;color:white")
                                span {{item.score || 0}}
        div
            datetime(v-model="polifTime" @on-change="changedate", :show.sync="visibility" style="display:none" format='YYYY-MM')
</template>
<script>
  import { Tab, TabItem, Grid, GridItem, XTextarea, Group, XInput, Masker, Countup, Flexbox, FlexboxItem, XButton, Datetime, Sticky } from 'vux'
  import circleService from '@/service/userScircle'
  import LocalStorageService from '@/service/storage'
  import { getDate } from '@/utils/common'
  export default {
    name: 'earning',
    components: {
      Tab,
      TabItem,
      Group,
      Grid,
      GridItem,
      XTextarea,
      XInput,
      Masker,
      Countup,
      Flexbox,
      FlexboxItem,
      XButton,
      Datetime,
      Sticky
    },
    data () {
      return {
        isb: 1, // 倍率
        gongao: '',
        list: [{
          title: '5000',
          img: 'http://p1.so.qhimgs1.com/t01f5199144d6b2cc61.jpg'
        }],
        smtotal: 0, // 当前小计，按日期或累计
        ploifquery: 0, // 圈子排序规则 0 今日收益， 1 累计收益
        polifTime: '2019-8', // 分利初始化日期
        visibility: false, // 分利过滤日期
        showall: false, // 分利是否显示全部
        model: 1,
        poliftotal: 0,
        nowday: 0, // 今日收益总统计
        newMonth: '',
        newYear: '',
        colors: ['#9546c3', '#8d4dc8', '#8651cb', '#7b58ce', '#735ed5', '#6d62d8', '#6568dd', '#6267dc', '#5d6ee2', '#5374e5'],
        polif: {
          data: [],
          maxscore: 0,
          total: 0
        },
        circleData: {
          teams: {},
          total: 0
        }
      }
    },
    computed: {
      allTotal () {
        var circleData = this.circleData.total || 0
        var polifData = this.polif.total || 0
        return circleData + polifData
      }
    },
    // beforeCreate () {
    //   calcrem()
    // },
    created () {
      console.log('%O', document.body)
      document.title = '九点娱乐---我的后台'
       // 初始化时间
      this.getUserScorePolif()
      // this.circleData.teams = this.objToArr(this.circleData.teams)
      // this.getNowDate()
      this.getUserScoreCircle()
    },
    methods: {
      showAll () {
       // 显示全部
        this.showall = true
      },
      onItemClick (val) {
        if (val === 'wecle') this.$router.push({ name: 'wecle' })
        if (val === 'circlepolif') this.$router.push({ name: 'circlepolif' })
      },
      getUserScorePolif () {
        circleService.getUserScorePolif({userid: this.$store.state.wxToken.userid}).then(res => {
          if (res.status === 200 && res.data) {
            this.polif = res.data
            this.changedate()
            this.polif.total = 0
            if (res.data.total && (res.data.total + '').indexOf('.') !== -1) {
              this.polif.total = res.data.total.toFixed(1)
            }
            if (this.polif.data) {
              this.polif.maxscore = 0
              this.polif.data.map(v => {
                if (v.details) {
                  this.sortObject(v, 'details', 'score', 'desc')
                  v.details.map(detail => {
                    if (detail.score) detail.score = (detail.score + '').indexOf('.') !== -1 ? detail.score.toFixed(1) : detail.score
                  })
                }
                if (v.months) {
                  v.months.map(j => {
                    if (j.details.length) {
                      j.details = j.details.sort(function (a, b) {
                        return b.score - a.score
                      })
                    }
                    j.details.map(jdetail => {
                      if (jdetail.score) jdetail.score = (jdetail.score + '').indexOf('.') !== -1 ? jdetail.score.toFixed(1) : jdetail.score
                    })
                    j.maxtotal = j.details[0] && j.details[0].score
                    if (j.maxtotal > this.polif.maxscore) this.polif.maxscore = j.maxtotal
                  })
                }
              })
            }
          }
        })
      },
      getUserScoreCircle () {
        circleService.getUserScoreCircle({userid: this.$store.state.wxToken.userid}).then(res => {
          if (res.status === 200 && res.data) {
            this.circleData = res.data
            this.circleData.total = (this.circleData.total + '').indexOf('.') !== -1 ? this.circleData.total.toFixed(1) : this.circleData.total
            this.changedate()
             // -计算当日累计
            if (this.circleData && this.circleData.teams) {
              this.circleData.teams = this.objToArr(this.circleData.teams)
              this.getNowDate() // 获取单日累计数
              // for (var item in this.circleData.teams) {
              //   if (getDate(item)) {
              //     this.smtotal += getDate(item)
              //   }
              // }
            }
          }
        })
      },
      polifdetail (item) {
        LocalStorageService.set('circledetail', JSON.stringify(item))
        this.$router.push({ name: 'circledetail' })
      },
      changedate (time, type) {
        var newYear = ''
        var newMonth = ''
        this.showall = false
        if (typeof time !== 'string' || !time || !(new Date(time)).getTime()) time = new Date()
        if (typeof time === 'string') time = new Date(time)
        newYear = time.getFullYear()
        newMonth = time.getMonth()
        if (type) {
          if (type === 'add') {
            newMonth++
            if (newMonth === 12) {
              newYear += 1
              newMonth = 0
            }
          }
          if (type === 'sub') {
            newMonth--
            if (newMonth === -1) {
              newYear -= 1
              newMonth = 11
            }
          }
        }
        this.polifTime = newYear + '-' + ((newMonth + 1) >= 10 ? newMonth + 1 : '0' + (newMonth + 1))
        this.newYear = newYear
        this.newMonth = newMonth
      },
      getNowDate: function () {
        var year = new Date().getFullYear()
        var month = new Date().getMonth() + 1
        var nowday = new Date().getDate()
        for (var circle in this.circleData.teams) {
          if (this.circleData.teams[circle] && this.circleData.teams[circle].data) {
            this.circleData.teams[circle].nowtotal = 0
            this.circleData.teams[circle].data.map(v => {
              if (v.time === year && v.months && v.months.length) {
                v.months.map(m => {
                  if (m.time === month) {
                    m.days.map(d => {
                      if (d.time === nowday) {
                        this.nowday += d.total
                        this.circleData.teams[circle].nowtotal = (d.total + '').indexOf('.') !== -1 ? d.total.toFixed(1) : d.total
                      }
                    })
                  }
                })
              }
            })
            this.nowday = (this.nowday + '').indexOf('.') !== -1 ? this.nowday.toFixed(1) : this.nowday
          }
        }
      },
      persondetail: function (item) {
        console.log(item)
        // LocalStorageService.set('persondetail', JSON.stringify(item))
        // this.$router.push({ name: 'persondetail' })
      },
      sortObject (obj, param, attr, type) {
        if (obj[param] && obj[param].length) {
          obj[param] = obj[param].sort(function (a, b) {
            if (type === 'aesc') return a[attr] - b[attr]
            if (type === 'desc') return b[attr] - a[attr]
          })
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
      }
    },
    watch: {
      polifTime: function () {
        var sum = 0
        this.polif.data.map(v => {
          if (v.time === this.newYear) {
            v.months.map(j => {
              if (j.time === this.newMonth + 1) {
                j.details.map(item => {
                  sum += item.score * 1
                })
              }
            })
          }
        })
        this.poliftotal = (sum + '').indexOf('.') !== -1 ? sum.toFixed(1) : sum
      },
      ploifquery: function () {
        if (this.ploifquery === 0) {
          this.sortObject(this.circleData, 'teams', 'nowtotal', 'desc')
        }
        if (this.ploifquery === 1) {
          this.sortObject(this.circleData, 'teams', 'total', 'desc')
        }
      }
    },
    filters: {
      that: this,
      getNowDate: function (value) {
        return getDate(value)
      }
    }
  }
</script>
<style lang='less'>
    body {
      background:#f5f5f5;
    }
    .align-r{
        text-align: right;
        align-content: flex-end;
    }
    .align-c{
        text-align: center;
        align-content: center;
    }
    .demo1 {
      font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
      font-size: 2.8em;
      color: white;
      font-weight: 600;
    }
    .active-6-2 {
      color: black !important;
      border-color: #04be02 !important;
    }
    .titlebar {
        & .optbar {
            & span.btn {display: inline-block;margin:0 .5em;min-width:1rem;text-align: center;padding:.2em .4em;line-height:1.8}
            & span.btn {border-radius:5px;border: 2px solid #2196fc;color:#2196fc;}
            & span.active {border:1px solid #2196fc; background: #2196fc;color:white}
        }
    }
    .contentItem .item .titleItem, .contentItem .item .content {
        display:flex;
        height:1rem;
        padding:10px 0;
        & .divL {flex-grow:1;text-align: left;
            & .header, & .headernumber {display:inline-block;color:#636363}
            & .header {font-size:1.2em;font-weight:600}
            & .msg {display:block;font-size:0.8em;}
        }
        & .divR {flex-grow:2;font-size:0.8em;color:gray;text-align: right}
    }

    .poliftItem {
    	display:flex;
    	min-width:40%;
    	max-width:100%;
    	background:#ff9999;
      color:white;
    	width:90%;
    }

    .contentItem .item .content {
        height:3.5rem;
        line-height:2.5rem;
    }
    .m-img {
      padding-bottom: 33%;
      display: block;
      position: relative;
      max-width: 100%;
      background-size: cover;
      background-position: center center;
      cursor: pointer;
      border-radius: 2px;
      height:4.5rem;
    }

    .m-title {
      color: #fff;
      text-align: center;
      text-shadow: 0 0 2px rgba(0, 0, 0, .5);
      font-weight: 500;
      font-size: 16px;
      position: absolute;
      left: 0;
      right: 0;
      width: 100%;
      text-align: center;
      top: 50%;
      transform: translateY(-50%);
    }

    .m-time {
      font-size: 12px;
      padding-top: 4px;
      border-top: 1px solid #f0f0f0;
      display: inline-block;
      margin-top: 5px;
    }
</style>
