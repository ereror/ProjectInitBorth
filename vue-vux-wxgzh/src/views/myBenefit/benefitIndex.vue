<template lang="pug">
  .wrapperBody
    //- x-header(:right-options="{showMore: true}" @on-click-more="showMenus = true" style="background-color:#1c1c1f;") 我的收益
    .bodyPhoto
      .connent
        .leftContent
          .divp(style="margin-top:-0.5rem") 我的收益（分）
          .divp(style="font-weight:700;font-size:.6rem;") {{score.total | calcone}}
        .rightContent(style="border-left:2px solid #ffffff;padding-top: .8rem;")
          .divp(v-show='false') 圈子（分）
            span(style="font-weight:700;font-size:.4rem;vertical-align: middle;margin-left: .5em;") {{circleData.total | calcone}}
          .divp 分利（分）
            span(style="font-weight:700;font-size:.4rem;vertical-align: middle;margin-left: .5em;") {{score.total1 | calcone}}
          .divp 活动（分）
            span(style="font-weight:700;font-size:.4rem;vertical-align: middle;margin-left: .5em;") {{score.total3 | calcone}}
      button-tab(style="margin-top:0.4rem; padding:0 .6rem;")
        button-tab-item(:selected="curValue === 'friendsQozen' ? true : false" @on-item-click="clickHandle('friendsQozen')" style="line-height: 35px;height: 35px;font-size:.4rem;" v-show="false") 圈子
        button-tab-item(:selected="curValue === 'benefits' ? true : false" @on-item-click="clickHandle('benefits')" style="line-height: 35px;height: 35px;font-size:.4rem;") 分利
        button-tab-item(:selected="curValue === 'activitives' ? true : false" @on-item-click="clickHandle('activitives')" style="line-height: 35px;height: 35px;font-size:.4rem;") 活动
    .contentWrapper(v-if="curValue === 'benefits'" style="padding:0")
      .Overflowcontent(style='padding-bottom: 1rem;')
        .contentLine(v-for="polifItem in polif.data")
            .contentbox(style="padding-bottom:1rem")
                ul
                    li(style="margin:.5em 0;background:#f2f2f2;height:2.4em;line-height:2.4em" v-for='(item, index) in polifItem.details' @click='persondetail(item)')
                        div.poliftItem(:style="{width: ((0.6 * (item.score - polif.maxscore) / polif.maxscore + 1)* 100 + '%')}")
                            div(style="width:70%;text-align:left;padding-left:.5em;font-size:0.9em")
                                span(style="overflow: hidden;line-height: 1;white-space: nowrap;") {{item.nick | substr}}
                            div(style="width:30%;text-align:right;padding-right:.5em;font-weight:bolder;color:white")
                                span {{item.score | calcone}}
    .contentWrapper(v-if="curValue === 'friendsQozen' || curValue === 'activitives' ")
      .Overflowcontent(style='padding-bottom: 1rem;')
        .content(v-for="item in circleData.teams" v-if="curValue === 'friendsQozen'")
          .leftWrapper
            .divp(style="font-weight:700;font-size:18px;") {{item.name}}
            .divp
              img(src="~assets/image/editValue.png" style="width:0.3rem;height:0.3rem;margin:0.1rem 0.1rem auto 0.1rem;" @click="showPopupPicker = true")
              span(style="color: #9c9999;margin-top:0.1rem") {{item.id}}
            span(style="color: #9c9999;") 累计收益：
              span(style="color:#f9676b;font-weight:700;font-size:18px") {{item.total | calcone }} 
            span(style="color: #9c9999;") 今日收益：
              span(style="color:#f9676b;font-weight:700;font-size:18px") {{item.nowtotal | calcone}} 
          .rightWapper(style="float:right; padding:0.7rem 0.2rem;right:0.1rem")
            div(@click="polifdetail(item)")
              img(src="~assets/image/arrow.png" style="position:absolute;right: 1rem;height:0.7rem;width:0.7rem")
        .content(v-for="item in tableData3" v-if="curValue === 'activitives'")
            .divp(style="display:inline-block;")
              span(style="font-weight:700;font-size:18px;") 幸运大夺宝
            .divp(style="display:inline-block;float:right;right:0.5rem")
              span 第
              span(style="color:#f9676b;font-weight:700;font-size:18px") {{item.sectionid}}
              span 期
            .divp(style="color: #9c9999;") 总共获得{{item.basescore + item.sharescore}}积分 
            .divp(style="color: #9c9999;") 
              span 
                | (
                span {{item.basescore || 0}}奖项积分、
                span {{item.sharescore || 0}}点赞积分
    mytabbar(:modelactivity="menus")
</template>
<script>
  import { XHeader, ButtonTab, ButtonTabItem } from 'vux'
  import circleService from '@/service/userScircle'
  import LocalStorageService from '@/service/storage'
  import { getDate } from '@/utils/common'
  import { isuserIdNull } from '@/utils/tools'
  export default{
    components: {XHeader, ButtonTab, ButtonTabItem},
    name: 'privateCenter',
    data () {
      return {
        menus: 'myBenefit',
        curValue: 'benefits',
        widthul: [],
        showMenus: true,
        circleData: {
           // 圈子收益
          teams: {
          },
          total: 0, // 总收益
          games: 0 // 游戏局数
        },
        // 2 分利
        polif: {
          data: [
          ],
          total: 0,
          maxscore: 0
        },
        tableData3: []
      }
    },
    computed: {
      userid () {
        return this.$store.state.wxToken.userid
      },
      score () {
        return this.$store.state.wxToken.score
      }
    },
    created () {
      document.title = '我的收益'
      var store = LocalStorageService.get('storeState')
      if (store) this.$store.commit('setstore', store)
      this.getUserInfo()
      this.getUserScorePolif()
      this.getUserScoreCircle()
      this.getActivity()
    },
    methods: {
      getUserInfo () {
        circleService.getUserInfoById({userid: this.userid}).then(res => {
          console.log(res)
          if (res.status === 200 && res.data && res.data.errcode === 0) {
            this.$store.commit('setstore', res.data)
          }
          if (res.status === 200 && res.data && res.data.errcode === 99) {
            isuserIdNull('activity%2FprivateCenter')
            return false
          }
        })
      },
      getActivity () {
        circleService.getDuobaoScore({userid: this.$store.state.wxToken.userid}).then(res => {
          if (res.status === 200 && res.data && !res.data.errcode && typeof res.data.errcode !== 'undefined') {
            this.tableData3 = res.data.list
          }
        })
      },
      clickHandle (val) {
        this.friendsQozen = false
        this.benefits = false
        this.activitives = false
        this.curValue = val
        console.log(val)
      },
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
                  var maxtotal = v.details[0] && v.details[0].score
                  console.log(maxtotal)
                  if (maxtotal > this.polif.maxscore) this.polif.maxscore = maxtotal
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
                    // j.maxtotal = j.details[0] && j.details[0].score
                    // if (j.maxtotal > this.polif.maxscore) this.polif.maxscore = j.maxtotal
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
            }
          }
        })
      },
      polifdetail (item) {
        LocalStorageService.set('circledetail', JSON.stringify(item))
        this.$router.push({ name: 'qunBenefit' })
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
      },
      substr (val) {
        if (!val) return val
        if (val.length >= 6) val = val.substring(0, 6) + '……'
        return val
      },
      calcone (val) {
        val = (val + '').indexOf('.') !== -1 ? (val * 1).toFixed(1) : val
        if (!val) val = 0
        return val
      }
    }
  }
</script>
<style scoped>
  .wrapperBody{
    background-color: #eeeeee;
    height:100%;
  }
  .topBar{
    height:30px;
    color:#ffffff;
  }
  .bodyPhoto{
    height:5rem;
    width:100%;
    background-color: #1c1c1f;
    color:#ffffff;
  }
  .leftContent,.rightContent{
    display: inline-block;
    width:50%;
    height:2.7rem;
   /* padding:0.5rem;*/
  }
  .leftContent {
    overflow: hidden;
    padding-top: 1.2rem;
  }
  .rightContent {
    border-left: 2px solid rgb(255, 255, 255);
    overflow: hidden;
  }
  .poliftItem {
    background: orange;
    display: flex;
    max-width: 100%;
  }
  .p {
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
  .contentLine{
   margin-top:0.2rem;
  }
  .leftWrapper,.rightWapper{
    display: inline-block;
  }
  .rightContent{
    text-align: left;
    padding-left: 0.5rem;
  }
  .connent{
    height: 3.1rem;
    padding:0.2rem 0.1rem;
  }
  .vux-button-group > a.vux-button-group-current {
    color: #f8b300;
    background: #323337; 
  }
  .vux-button-group > a {
    border-right: 1px solid #323337;
    border-top: 1px solid #323337;
    border-bottom: 1px solid #323337;
    border-left: none;
    background: #323337; 
    color: #fcfefd;
    border: none;
    font-weight: 700;
  }
  .vux-button-group > a.vux-button-tab-item-first:after{
    border: none;
    border-right: 1px solid #ffffff;
  /*  color:;*/
  }
  .vux-button-group > a.vux-button-tab-item-middle:after{
    border: none;
    border-right: 1px solid #ffffff;
  }
  .vux-button-group > a.vux-button-tab-item-last:after{
    border: none;
  }
  .content{
    padding:0.2rem 0.3rem;
    box-shadow: 0px 5px 10px #dadada, 0px -5px 10px #dcdcdc;
    background-color: #fefefe;
    border:1px solid #dcdcdc;
    margin-top:0.4rem;
    border-radius: 10px;
  }
  .connentStyle{
    float: right;
    width:3.3rem;
    border-radius: 30px;
    padding:0.25rem 0.4rem;
    background-color: #e9e9e9;
    text-align: center;
    font-size: 20px;
    color: #363432;
  }
  .contentWrapper{
    width:100%;
    float: left;
    text-align: left;
    padding:3px 20px;
    overflow-y: auto;
    background-color: #eeeeee;
    height: 11rem;
    padding-bottom: 1rem;
  }
  .Overflowcontent{
    overflow: auto;
    padding-bottom: .2rem;
    height:100%;
    max-height: 100%;
  }
</style>
