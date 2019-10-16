<template lang="pug">
  .wrapperBody
    //- x-header(:right-options="{showMore: true}" @on-click-more="showMenus = true" style="background-color:#1c1c1f;") 战绩
    .contentWrapper
      .Overflowcontent
        .content(v-for="item in results")
          .divp(style="display:inline-block;margin-top: 0.1rem;")
            icon.icon(name="ico_cal")
            span(style="font-size:.4rem;color:#a1a1a1;vertical-align: text-bottom;") &nbsp;{{item.playDates}}
          .divp(style="display:inline-block;float:right;right:0.5rem")
            span(style="font-weight:600;font-size:.4rem") {{item.result.type | typeset}}
            span(style="color:#a1a1a1") &nbsp; | &nbsp;
            span(style="color:#fd0893;font-weight:600;font-size:.4rem" v-if="!item.result.ispayover") 未支付
            span(style="color:#88be4a;font-weight:600;font-size:.4rem" v-if="item.result.ispayover") 已支付
          ul.lists
            li(v-for="ite in item.result.results" style="text-align:center;")
              .divp.showName {{ite.nick}}
              .divp(style="color:#a1a1a1;font-size:.4rem") {{ite.userid}}
              .divp(v-if="ite.score <= 0" style="color:#1b95ff;font-weight:600;font-size:.6rem") {{ite.score || 0}}
              .divp(v-if="ite.score > 0" style="color:#fd0893;font-weight:600;font-size:.6rem") {{ite.score || 0}}
    mytabbar.div
</template>
<script>
  import { XHeader } from 'vux'
  import date from '@/filter/date'
  import circleService from '@/service/userScircle'
  import LocalStorageService from '@/service/storage'
  export default{
    components: { XHeader },
    name: 'Record',
    data () {
      return {
        showMore: true,
        time: '',
        isload: false,
        curpage: 1,
        historyData: {},
        hasmore: true,
        results: []
      }
    },
    created () {
      var historyData = LocalStorageService.get('circlehistoryData')
      if (historyData) {
        document.title = historyData.name
        this.historyData = historyData
        var param = {teamid: historyData.id, pagecount: 20, curpage: this.curpage}
        this.getData(param)
      } else {
        document.title = '圈子的历史记录'
      }
      this.results.forEach(v => {
        v.time = v.time * 1 + 8 * 60 * 60 * 1000
        v.playDates = date(v.time, 'yyyy-MM-dd HH:mm')
      })
    },
    methods: {
      checkItem (val) {
        console.log(val)
        this.isb = val
      },
      getData (param) {
        this.isload = true
        circleService.getTemCircleHistory(param).then(res => {
          if (res.status === 200 && !res.data.errcode) {
            if (res.data.results.length) {
              this.curpage++
              res.data.results.map(v => {
                v.result.results = v.result.results.sort(function (a, b) {
                  return b.pos - a.pos
                })
              })
              res.data.results.sort((a, b) => {
                return b.time - a.time
              })
              this.results = this.results.concat(res.data.results)
              this.results.forEach(v => {
                v.time = v.time * 1 + 8 * 60 * 60 * 1000
                console.log(v.time)
                v.playDates = date(v.time, 'yyyy-MM-dd HH:mm')
              })
              if (res.data.results.length === 20) {
                this.hasmore = true
              } else {
                this.hasmore = false
              }
            } else {
              this.hasmore = false
            }
          }
          this.isload = false
        })
      }
    },
    mounted () {
      var that = this
      var count = 0
      var bodyScrollTop = 0
      var scrollHeight = 0
      var windowHeight = 0
      var nowheight
      this.checkmorefun = function () {
        bodyScrollTop = document.body.scrollTop || document.documentElement.scrollTop
        windowHeight = document.documentElement.clientHeight || document.body.clientHeight
        scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight
        count++
        if (count === 10) {
          that.hasmore = true
          count = 0
        }
        if (!that.hasmore) {
          that.$vux.toast.show({
            text: '无更多数据',
            time: 1000
          })
          return
        }
        if (bodyScrollTop < nowheight - 10) {
          return
        }
        if (bodyScrollTop + windowHeight + 10 >= scrollHeight) {
          nowheight = bodyScrollTop
          if (this.isload) {
            return
          } else {
            var param = {teamid: that.historyData.id, pagecount: 20, curpage: that.curpage}
            that.getData(param)
          }
        }
      }
      window.addEventListener('scroll', this.checkmorefun)
    },
    destroyed () {
      window.removeEventListener('scroll', this.checkmorefun)
    },
    filters: {
      typeset: function (val) {
        if (val === 'xzdd') return '血战到底'
        if (val === 'xlch') return '血流成河'
        return val
      }
    }
  }
</script>
<style scoped>
  .wrapperBody{
    background-color: #eeeeee;
    height:100VH;
  }
  .svg-icon{
    width:0.6rem;
    height:0.5rem;
    color:#666;
  }
  .topBar{
    height:30px;
    color:#ffffff;
  }
  .bodyPhoto{
    height:25%;
    width:100%;
    background-color: #1c1c1f;
    color:#ffffff;
  }
  a{
    display: inline-block;
  }
  .lists{
    display:flex;
    flex-wrap: nowrap;
    justify-content:space-around;
    margin-top: 0.3rem;
/*    align-items: flex-end;*/
  }
  .showName{
    max-width: 2rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color:#26211e;
    font-weight:700;
    font-size:14px
  }
  .contentLine{
   margin-top:0.5rem;
  }
  .Overflowcontent{
    overflow-y: auto;
    padding:.1rem;
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
  .contentWrapper{
    width:100%;
    float: left;
    text-align: left;
    padding:0.2rem 0.3rem;
    background-color: #eeeeee;
    overflow: auto;
    padding-bottom: 1.2rem;
  }
  .content{
    padding:0.2rem 0.3rem;
    box-shadow:2px 2px 10px #c5c5c5, -2px 2px 10px #c5c5c5,2px -2px 10px #c5c5c5, -2px -2px 10px #c5c5c5;
    background-color: #fefefe;
    border:1px solid #dcdcdc;
    margin-top:0.2rem;
    border-radius: 10px;
    margin-bottom: .5rem;
  }
</style>

