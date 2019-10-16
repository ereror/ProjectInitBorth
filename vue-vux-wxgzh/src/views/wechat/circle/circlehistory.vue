<template lang='pug'>
    div.circlehistory(style="width:100%;")
        loading(v-show="isLoading || isload" style="position:absolute;z-index:99999")
        group.hitem(v-for="(item,index) in results" key="item.key" v-show="results.length")
          div.clearfix.padd_2
            div(style="float:left")
              span.xuhao {{index + 1}}
              span.sblock
                icon.icon.iconrili(name='ico_rili')
              span(style="display:inline-block") {{item.time | date('dateTime')}}
              span(style="display:inline-block;color:red;font-weight:600;margin-left:.2em;" v-show="!item.result.ispayover") （未支付）
              span(style="display:inline-block;color:green;font-weight:600;margin-left:.2em;" v-show="item.result.ispayover") （已支付）
            div(style="float:right;")
              span {{item.result.type | typeset}}
          div.clearfix.padd_2(v-for='result in item.result.results')
            div(style="float:left;font-size: .9em;")
              span.uname {{result.nick}}
              span.uno ({{result.userid}})
            div(style="float:right;font-size: .9em;font-weight: 600;")
              span.colorBig2(style="display:inline-block;", :class="{'colorBig1': result.score > 0}") 
                span(v-show='result.score > 0') +
                | {{result.score || 0}}
</template>
<script>
  import { Tab, TabItem, Grid, GridItem, XTextarea, Group, XInput, Timeline, TimelineItem, Flexbox, FlexboxItem, Loading } from 'vux'
  import circleService from '@/service/userScircle'
  import LocalStorageService from '@/service/storage'
  import { calcrem } from '@/utils/common'
  calcrem()
  export default {
    name: 'circlehistory',
    components: {
      Tab,
      TabItem,
      Group,
      Grid,
      GridItem,
      XTextarea,
      XInput,
      Timeline,
      TimelineItem,
      Flexbox,
      FlexboxItem,
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
        gongao: '',
        time: '',
        isload: false,
        results: [],
        curpage: 1,
        historyData: {},
        hasmore: true
      }
    },
    created () {
      // var historyId = this.$route && this.$route.params && this.$route.params.historyId || ''
      var historyData = LocalStorageService.get('circlehistoryData')
      if (historyData) {
        document.title = historyData.name
        this.historyData = historyData
        var param = {teamid: historyData.id, pagecount: 20, curpage: this.curpage}
        this.getData(param)
      } else {
        document.title = '圈子的历史记录'
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
    filters: {
      date: function (val, type) {
        var time = new Date(val - new Date().getTimezoneOffset() * 60 * 1000)
        var newval = ''
        if (type === 'date') {
          newval += time.getMonth() + 1 + '月' + time.getDate() + '号'
        }
        if (type === 'time') {
          newval += time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
        }
        if (type === 'dateTime') {
          newval += time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes()
        }
        return newval
      },
      typeset: function (val) {
        if (val === 'xzdd') return '血战到底'
        if (val === 'xlch') return '血流成河'
        return val
      }
    }
  }
</script>
<style lang='less' scoped>
    body{
       background: #f5f5f5;      
    }
    .align-r{
        text-align: right;
        align-content: flex-end;
    }
    .align-c{
        text-align: center;
        align-content: center;
    }
    .grow1{
        width:25%;
        & div .img img {
            width:90%;
            height:auto;
            margin: 0 auto;
        }
    }
    .grow2{
        width:75%;
    }
    .circlehistory .weui-icon-success-no-circle:before {
        content: ''
    }
    .vux-timeline {
        padding:0 0 0 1rem;
    }
    .group{
        background: white;
        margin:.5em 0em;
        width: 100%;
        & .vux-timeline-item-content {
            padding: 0 0 .5rem .6rem;
        }
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
    .colorBig2 {
      color:blue;
    }
    .colorBig1 {
      color:#ff19ff;
    }
    .hitem {
        margin-top:-10px;
        color:rgb(181, 181, 181);
        & .padd_2 {
            padding:0.25em 0.5em;
            & .uname {
              display:inline-block;
              color:black;
              margin-right:1em;
              font-weight:600;
            }
            & .uno {
              display:inline-block;
              font-size:0.8em;
              color:rgb(181, 181, 181);
            }
            & .xuhao {
              display: inline-block;
              font-size: 1.2em;
              margin-right: .5em;
              color: blueviolet;
            }
            & .sblock {
              display: inline-block;
              & .iconrili {
                width:1em;
                height:1em;
                margin-right:.5em;
              }             
            }
        }
    }
</style>
