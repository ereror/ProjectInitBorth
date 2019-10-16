<template lang='pug'>
    .contain
        .header
            span.fr(style="font-size:.35rem;line-height:1.5rem;margin-right:.2rem") {{startTime}} ~ {{endTime}}
        .content
          .contentd
            .item(v-show="!winPrizeList.length && isready")
                .title 暂无中奖消息
            .item(v-for="item in winPrizeList" v-show="winPrizeList.length")
                .title 
                  | {{item.prizesRank}}
                  span ￥{{item.baseprize}}
                .detail
                    table
                        tr
                            th  序号
                            th  夺宝券
                            th  昵称（ID）
                            th  圈子（ID）
                        tr(v-for="(detail, index) in item.data")
                            td {{index + 1}}
                            td {{detail.prizeno}}
                            td {{detail.nick | lenform}}
                            td {{detail.prizeno}}
        .btndetail
            .btn.fr(@click="showPopupPicker = true") 
                |  第{{cardnum[0]}}期
                img(src='~@/assets/image/snatch/arrowicon.png')
        popup-picker(:data="checklist", v-model="cardnum", :show.sync="showPopupPicker", @on-change="onChange")
</template>
<script>
  import activityService from '@/service/activity'
  import { PopupPicker } from 'vux'
  export default {
    name: 'snatchcard',
    components: { PopupPicker },
    data () {
      return {
        checklist: [],
        winPrizeList: [],
        param: {
          id: '',
          pagecount: 100,
          curpage: 1
        },
        prizes: ['特等奖', '一等奖', '二等奖', '三等奖', '四等奖', '五等奖', '六等奖', '幸运奖'],
        startTime: '',
        endTime: '',
        prizeId: 0,
        cardnum: [0],
        showPopupPicker: false,
        isready: false
      }
    },
    created () {
      this.prizeId = this.$route && this.$route.params && this.$route.params.id || ''
      if (this.prizeId) {
        this.cardnum = [this.prizeId - 1]
        var arr = []
        for (let i = 1; i < this.prizeId * 1; i++) {
          arr.push(i)
        }
        this.checklist.push(arr)
        this.getPrevSection(this.prizeId - 1)
        this.getlastSection(this.prizeId - 1)
      }
    },
    methods: {
      onChange () {
        var nowid = this.cardnum[0]
        this.getPrevSection(nowid)
        this.getlastSection(nowid)
      },
      getTimeFormat (time) {
        if (!time || !new Date(time).getTime()) return time
        var nowtime = new Date(new Date(time).getTime())
        var year = nowtime.getFullYear()
        var mouth = nowtime.getMonth() + 1 < 10 ? ('0' + (nowtime.getMonth() + 1)) : (nowtime.getMonth() + 1)
        var day = nowtime.getDate() < 10 ? ('0' + (nowtime.getDate() + 1)) : (nowtime.getDate() + 1)
        var hours = nowtime.getHours() > 12 ? ('晚' + (nowtime.getHours() - 12)) : ('早' + nowtime.getHours())
        return year + '-' + mouth + '-' + day + ' ' + hours + '点 '
      },
      getlastSection (id) {
        var param = {
          id: id
        }
        activityService.getHistory(param).then(res => {
          if (res.status === 200 && res.data && !res.data.errcode) {
            if (res.data.section) {
              this.startTime = this.getTimeFormat(res.data.section.starttime)
              this.endTime = this.getTimeFormat(res.data.section.endtime)
            }
          }
        })
      },
      getPrevSection (id) {
        this.param.id = id
        this.isready = false
        activityService.getAllPrizeList(this.param).then(res => {
          if (res.status === 200 && res.data && !res.data.errcode) {
            var list = res.data.list
            if (!list.length) this.isready = true
            this.createWinPrize(list)
          }
        })
      },
      createWinPrize (list) {
        if (!list.length) return
        var objprize = {}
        this.winPrizeList = []
        list.map(v => {
          v.prizeno = this.param.id * 10000 + v.prizeno + ''
          if (v.prizeno.length < 6) v.prizeno = '0' + v.prizeno
          if (v.rank) v.prizesRank = this.prizes[v.rank]
          else v.prizesRank = '幸运奖'
          if (!objprize[v.rank] || !objprize[v.rank].length) objprize[v.rank] = []
          objprize[v.rank].push(v)
        })
        for (var val in objprize) {
          var param = {}
          param.rank = val
          param.data = objprize[val]
          param.baseprize = objprize[val][0].baseprize
          param.prizesRank = objprize[val][0].prizesRank
          this.winPrizeList.push(param)
        }
      }
    },
    filters: {
      lenform: function (val) {
        if (!val || val.length <= 6) return val
        else return val.substring(0, 3) + '...'
      }
    }
  }
</script>
<style lang="less" scoped>
    body {
    	background:black;
    }
    * {
    	box-sizing: border-box;
    }
	.contain {
    	position: relative;
    	width: 90%;
    	height: 94%;
    	background: #AD1D2C;
    	background-size: 100%;
    	background-repeat: no-repeat;
    	margin-left: 5%;
    	margin-top: .5rem;
    	margin-bottom: .5rem;
    	border-radius: 10px;
        &  .header {
            position: absolute;
            width: 92%;
            height: 1.5rem;
            background: url('~assets/image/snatch/papertop.png');
            background-size: 100% 100%;
            left: 4%;
            top: .5rem;
        }
        &  .content {
            position: absolute;
            height: 11rem;
            width: 91.5%;
            margin-top: 1.9rem;
            background: #fff9e0;
            z-index: 2;
            border-bottom-right-radius: 5px;
            border-bottom-left-radius: 5px;
            overflow: hidden;
            left: 4.2%;
            & .contentd {
                height:100%;
                width:100%;
                padding-bottom:.5rem;
                overflow-y: auto;
            }
            & .item {
                & .title {
                    font-size: .4rem;
                    font-weight: 600;
                    color: #c50505;
                    line-height: 1rem;
                    & span {color:orange;}
                }
                & .detail {
                    padding: 0 .2rem;
                    & table {
                        width:100%;
                        border-collapse: 0;
                        border-spacing: 0;
                    }
                    & table tr th {
                        background: #ffe2ab;
                    }
                    & table tr th,& table tr td {
                        border-right: 2px solid white;
                        border-bottom: 2px solid white;
                        font-size:10px;
                        line-height:.8rem;
                    }
                    & table tr:nth-child(2n) td {
                      background: rgb(255, 250, 177);
                    }
                    & table tr:nth-child(2n+1) td {
                      background: #ffe2ab;
                    }
                }
            }
        }
        &  .btndetail {
            position:absolute;
            width: 92%;
            margin:13rem 4% 0 4%;
            &  .btn {
                height: 1rem;
                width: 3rem;
                border-radius: 50px;
                line-height: 1rem;
                background: #FF9800;
                margin-top: .5rem;
                font-weight: bold;
                color: white;
                &  img {height:.5rem;width:.5rem;vertical-align: text-top;margin-left: .2rem;}
            }
        }
        &  .vux-cell-box {display:none}
	}
</style>
