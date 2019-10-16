<template lang='pug'>
  div(style="position:relative;height:100%;")
    loading(v-model="isLoading")
    div(style="padding-bottom:2rem;height:100%;overflow:auto" id='circle')
      .group(label-width="5em" style="padding:.5em;")
        div.title 圈子房费设置
        div.contentcash.price
          div.clearfix
            div.gridcard 局数
            div.gridcard 
              | 基础房费
              br
              |（房卡）
            div.gridcard 
              | 服务费
              br
              |（房卡）
            div.gridcard 
              | 总房费
              br
              |（房卡）
            div.gridcard 
              | 圈子收益
              br
              |（积分）
          div.clearfix.blackc
            div.gridcard 4
            div.gridcard 2
            div.gridcard 
             span(style="display:block;padding:.2em;background:#e8e8e8;border-bottom:1px solid #d8d8d8" @click="showprice = !showprice") {{value1[0]}}
            div.gridcard {{2 + value1[0] * 1}}
            div.gridcard {{2 * 100 * 0.4 + value1[0] * 0.9 * 100}}
          div.clearfix.blackc
            div.gridcard 8
            div.gridcard 3
            div.gridcard 
             span(style="display:block;padding:.2em;background:#e8e8e8;border-bottom:1px solid #d8d8d8" @click="showprice8 = !showprice8") {{value8[0]}}
            div.gridcard {{3 + value8[0] * 1}}
            div.gridcard {{3 * 100 * 0.4 + value8[0] * 0.9 * 100}}
          div.clearfix.blackc
            div.gridcard 12
            div.gridcard 4
            div.gridcard 
             span(style="display:block;padding:.2em;background:#e8e8e8;border-bottom:1px solid #d8d8d8" @click="showprice12 = !showprice12") {{value12[0]}}
            div.gridcard {{4 + value12[0] * 1}}
            div.gridcard {{4 * 100 * 0.4 + value12[0] * 0.9 * 100}}
        div.contentcash
          div.instruction
            div(style="display:inline-block;vertical-align:top;")
              span 说明:
            ul(style="display:inline-block")
              //- li 2~5倍房费的圈子，所有玩家在圈内进行游戏时，享有搓牌免费的特权;
              //- li 6倍以上的圈子，所有玩家在圈内进行游戏时，同时享有搓牌免费和互动表情免费的特权
              li 1、圈子服务费全部归属于圈主
              li 2、基础房费的40%归属于圈主
      .group(label-width="5em" style="padding:.5em;" ref='circlegongg')
        div.title 圈子公告设置
        div.contentcash
          group.contentg(title="在下面文本框中输入圈子的公告，所有玩家可见" style="padding:0")
            x-textarea(placeholder ='公告', :show-counter="false", :rows="3", autosize v-model='introduce' style="font-size:0.8em;color:gray" @on-focus="checkCircle('circlegongg')" @on-blur='showbtn = true', :max="20")
      .group(label-width="5em" style="padding:.5em;" ref='circlegung')
        div.title 群规设置
        div.contentcash
          group.contentg(title="在下面文本框中设置群规，新玩家加入微信后，微信机器人将自动@其群规，便于你管理" style="padding:0")
            x-textarea(placeholder ='群规', :show-counter="false", :rows="3", autosize v-model='welcome' style="font-size:0.8em;color:gray" @on-focus="checkCircle('circlegung')" @on-blur='showbtn = true', :max="800")
      .group(label-width="5em" style="padding:.5em;")
        div.title 圈子默认玩法
        div.contentcash(style="color:gray")
          group.choice
            cell(title="游戏选择")
              div
                check-icon.checkicon(:value.sync="choiceh" style="color:gray") 血流成河
                check-icon.checkicon(:value.sync="choiced" style="color:gray") 血战到底
          group.choice(title="玩法")
            cell.checkdetail
              checklist.checklist(required :options="commonList" v-model="checklist001")
            cell.checkdetail
              checklist.checklist(required :options="commonList2" v-model="checklist002", :max=1)
            cell.checkdetail
              checklist.checklist(required :options="commonList3" v-model="checklist003", :max=1)
          group.choice(title="翻型")
            cell.checkdetail
              checklist.checklist(required :options="commonList4" v-model="checklist004", :max=5)
          group.choice(title="封顶")
            cell.checkdetail
              checklist.checklist(required :options="commonList5" v-model="checklist005", :max=1)
          group.choice(title="局数")
            cell.checkdetail
              checklist.checklist(required :options="commonList6" v-model="checklist006", :max=1)
          //- group.choice(title="高级")
          //-   cell.checkdetail
          //-     checklist.checklist(required :options="commonList7" v-model="checklist007")
          group.choice(title="支付")
            cell.checkdetail
              checklist.checklist(required :options="commonList8" v-model="checklist008" disabled)
    sticky(style="position:absolute;bottom:0;padding:.5em;background:white;z-index:2;width:100%;top:calc(100% - 1.8rem)" v-show="showbtn")
      flexbox
        flexbox-item
          x-button(type='warn' @click.native="showPlugin()" style="width:4rem;height:1.5rem")
            div(style="font-size:.8em;font-weight:600;line-height:1.2") 解散圈子
            div(style="font-size:.6em;line-height:1.2") (建议微信群不再使用后将圈子解散掉)
        flexbox-item
          x-button(type='primary' text="确定" @click.native="savedata()" style="width:4rem;height:1.5rem")
    popup-picker(:show.sync="showprice" :show-cell="false" title="TEST" :data="data4" v-model="value1")
    popup-picker(:show.sync="showprice8" :show-cell="false" title="TEST" :data="data4" v-model="value8")
    popup-picker(:show.sync="showprice12" :show-cell="false" title="TEST" :data="data4" v-model="value12")
    confirm(v-model="show"  title="提示" @on-confirm="onConfirm")
      p(style="text-align:center;") 圈子解散后不可恢复，确定要解散
</template>
<script>
  import { Tab, TabItem, Grid, GridItem, XTextarea, Group, Cell, XInput, Flexbox, FlexboxItem, XButton, CheckIcon, Checklist, Loading, PopupPicker, Sticky, Confirm } from 'vux'
  import LocalStorageService from '@/service/storage'
  import circleService from '@/service/userScircle'
  import { calcrem } from '@/utils/common'
  calcrem()
  export default {
    name: 'circleset',
    components: {
      Tab,
      TabItem,
      Group,
      Cell,
      Grid,
      GridItem,
      XTextarea,
      XInput,
      Flexbox,
      FlexboxItem,
      XButton,
      CheckIcon,
      Checklist,
      Loading,
      PopupPicker,
      Sticky,
      Confirm
    },
    data () {
      return {
        show: false,
        title1: '4局八房卡',
        data4: [],
        value1: [0],
        value8: [0],
        value12: [0],
        price: 1, // 倍率
        showprice: false,
        showprice8: false,
        showprice12: false,
        showbtn: true,
        introduce: '',
        welcome: '',
        choiceh: false,
        choiced: !this.choiceh,
        checklist001: [ '定缺', '换三张', '呼叫转移' ],
        checklist002: [ '自摸加番' ],
        checklist003: [ '点杠花自摸' ],
        checklist004: [ '幺九将对', '中张', '天地胡', '海底捞', '门清' ],
        checklist005: [ '4番' ],
        checklist006: [ '8局' ],
        checklist007: [ '允许买马', '允许旁观' ],
        commonList: [ '定缺', '换三张', '呼叫转移' ],
        commonList2: [ '自摸加底', '自摸加番', '自摸不加' ],
        commonList3: [ '点杠花自摸', '点杠花点炮' ],
        commonList4: [ '幺九将对', '中张', '天地胡', '海底捞', '门清' ],
        commonList5: [ '3番', '4番', '5番' ],
        commonList6: [ '4局', '8局', '12局' ],
        commonList7: [ '允许买马', '允许旁观' ],
        commonList8: [ '大赢家支付' ],
        checklist008: [ '大赢家支付' ],
        messageYu: ''
      }
    },
    created () {
      var circledata = LocalStorageService.get('circlestr')
      document.title = circledata.name || '圈子设置'
      this.setDefault(circledata)
      this.teamid = circledata.id
      var datas = []
      for (var i = 0; i < 100; i++) {
        datas.push(i)
      }
      this.data4.push(datas)
    },
    computed: {
      isLoading () {
        return this.$store.state.loading.isLoading
      }
    },
    methods: {
      checkCircle (val) {
        var scrollTop = 0
        if (val === 'circlegongg') scrollTop = 280
        else scrollTop = 460
        this.showbtn = false
        document.getElementById('circle').scrollTop = scrollTop
      },
      checkItemValue (val) {
        console.log(val)
      },
      messageAlert (str, bolen) {
        var that = this
        this.$vux.alert.show({
          title: '提示',
          content: str,
          onHide () {
            if (bolen) that.$router.push({ name: 'wecle' })
          }
        })
      },
      onConfirm () {
         // 删除按钮
        var param = {
          teamid: this.teamid,
          userid: this.$store.state.wxToken.userid
        }
        circleService.delCircle(param).then(res => {
          if (res.status === 200 && res.data && !res.data.errcode) {
            this.messageAlert('本圈子已被管理员解散，将不能使用', true)
          } else {
            this.messageAlert('圈子删除失败，请稍后重试', false)
          }
        })
      },
      showPlugin () {
        this.show = true
      },
      checkItem (val) {
        console.log(val)
        this.price = val
      },
      setDefault (circledata) {
        if (circledata) {
          this.price = circledata.price
          // this.rule = circledata.rule
          this.introduce = circledata.introduce
          this.welcome = circledata.welcome
          if (circledata.addprice && circledata.addprice.length) {
            circledata.addprice.map(v => {
              switch (v.condition) {
                case 4:
                  this.value1[0] = v.addprice
                  break
                case 8:
                  this.value8[0] = v.addprice
                  break
                case 12:
                  this.value12[0] = v.addprice
                  break
              }
            })
          }
          if (circledata.rule) circledata.rule = JSON.parse(circledata.rule)
          if (circledata.rule && circledata.rule.type === 'xzdd') this.choiced = true
          if (circledata.rule && circledata.rule.type === 'xlch') this.choiceh = true
          if (circledata.rule) {
            this.checklist004 = []
            this.checklist001 = []
            if (circledata.rule.isDingQue || circledata.rule.isHuan3Card || circledata.rule.maozhuanyu) {
              this.checklist001 = []
              if (circledata.rule.isDingQue) this.checklist001.push('定缺')
              if (circledata.rule.isHuan3Card) this.checklist001.push('换三张')
              if (circledata.rule.maozhuanyu) this.checklist001.push('呼叫转移')
            }
            switch (circledata.rule.zimo) {
              case 0:
                this.checklist002 = ['自摸加底']
                break
              case 1:
                this.checklist002 = ['自摸加番']
                break
              case 2:
                this.checklist002 = ['自摸不加']
                break
            }
            switch (circledata.rule.dianganghua) {
              case 0:
                this.checklist003 = ['点杠花点炮']
                break
              case 1:
                this.checklist003 = ['点杠花自摸']
                break
            }
            if (circledata.rule.tiandihu || circledata.rule.quan19 || circledata.rule.menqing || circledata.rule.haidihu || circledata.rule.jiangdui || circledata.rule.zhongzhang) {
              this.checklist004 = []
              if (circledata.rule.quan19 || circledata.rule.jiangdui) this.checklist004.push('幺九将对')
              if (circledata.rule.tiandihu) this.checklist004.push('天地胡')
              if (circledata.rule.menqing) this.checklist004.push('门清')
              if (circledata.rule.haidihu) this.checklist004.push('海底捞')
              if (circledata.rule.zhongzhang) this.checklist004.push('中张')
            }
            switch (circledata.rule.maxFan * 1) {
              case 3:
                this.checklist005 = ['3番']
                break
              case 4:
                this.checklist005 = ['4番']
                break
              case 5:
                this.checklist005 = ['5番']
                break
            }
            switch (circledata.rule.maxGames * 1) {
              case 4:
                this.checklist006 = ['4局']
                break
              case 8:
                this.checklist006 = ['8局']
                break
              case 12:
                this.checklist006 = ['12局']
                break
            }
          }
        }
      },
      isExit (val, arr) {
        if (arr.indexOf(val) !== -1) return true
        else return false
      },
      cancelSet (val) {
         // 取消设置
        this.checklist001 = [ '定缺', '换三张', '呼叫转移' ]
        this.checklist002 = [ '自摸加番' ]
        this.checklist003 = [ '点杠花自摸' ]
        this.checklist004 = [ '幺九将对', '门清', '中张', '天地胡', '海底捞' ]
        this.checklist005 = [ '4番' ]
        this.checklist006 = [ '8局' ]
        this.checklist007 = [ '允许买马', '允许旁观' ]
      },
      savedata () {
        var that = this
        var rule = {
          baseScore: 1,
          gametype: this.choiced ? 1001 : 1005,
          paytype: 1,
          seats: 4,
          type: this.choiced ? 'xzdd' : 'xlch',
          maxFan: this.checklist005[0].substring(0, 1),
          maxGames: parseInt(this.checklist006[0]),
          zimo: (function () {
            if (that.checklist002[0] === '自摸加番') return 1
            if (that.checklist002[0] === '自摸加底') return 0
            if (that.checklist002[0] === '自摸不加') return 2
          }()),
          tiandihu: (function () {
            return that.isExit('天地胡', that.checklist004)
          }()),
          jingougou: true,
          menqing: (function () {
            return that.isExit('门清', that.checklist004)
          }()),
          haidihu: (function () {
            return that.isExit('海底捞', that.checklist004)
          }()),
          jiangdui: (function () {
            return that.isExit('幺九将对', that.checklist004)
          }()),
          maozhuanyu: (function () {
            return that.isExit('呼叫转移', that.checklist001)
          }()),
          dianganghua: (function () {
            if (that.checklist003[0] === '点杠花自摸') return 1
            if (that.checklist003[0] === '点杠花点炮') return 0
          }()),
          isDingQue: (function () {
            return that.isExit('定缺', that.checklist001)
          }()),
          isHuan3Card: (function () {
            return that.isExit('换三张', that.checklist001)
          }()),
          quan19: (function () {
            return that.isExit('幺九将对', that.checklist004)
          }()),
          zhongzhang: (function () {
            return that.isExit('中张', that.checklist004)
          }())
        }
        var param = {
          teamid: this.teamid,
          introduce: this.introduce,
          welcome: this.welcome,
          userid: this.$store.state.wxToken.userid,
          price: this.price,
          rule: JSON.stringify(rule),
          addprice: [{
            condition: 4,
            addprice: that.value1[0]
          }, {
            condition: 8,
            addprice: that.value8[0]
          }, {
            condition: 12,
            addprice: that.value12[0]
          }]
        }
        this.$vux.loading.show({
          text: '正在保存'
        })
        circleService.setTeamInfo(param).then(res => {
          this.$vux.loading.hide()
          if (!res.errcode) {
            this.$vux.toast.show({
              text: '保存成功',
              time: 1000,
              type: 'success'
            })
          } else {
            this.$vux.toast.show({
              text: '保存失败',
              time: 1000,
              type: 'cancel'
            })
          }
        })
      }
    },
    watch: {
      checklist002: function (newval, old) {
        if (!newval.length) this.$set(this.checklist002, 0, old[0])
      },
      checklist003: function (newval, old) {
        if (!newval.length) this.$set(this.checklist003, 0, old[0])
      },
      checklist005: function (newval, old) {
        if (!newval.length) this.$set(this.checklist005, 0, old[0])
      },
      checklist006: function (newval, old) {
        if (!newval.length) this.$set(this.checklist006, 0, old[0])
      },
      choiceh: function () {
        this.choiced = !this.choiceh
      },
      choiced: function () {
        this.choiceh = !this.choiced
      }
    }
  }
</script>
<style lang='less'>
  body {
    background: #f5f5f5;
  }
  .group{
    background: white;
    margin:.5em 0em;
    & .title {
      text-align: left;
      font-size:1.2em;
      font-weight:600;
      color:gray;
    }
    & .price {
      color: #9e9e9e;
    }
    & .blackc {
      color: black;
    }
    & .gridcard {
      float: left;
      width: 20%;
      padding:.5 1em;
      text-align: center;
    }
    & .contentcash {
      width: 90%;
      margin:0 auto;
      padding:0 0 1em 0;
      & .contentg .weui-cells__title {
        padding:0;
        text-align: left;
      }
      & .choice {
        text-align:left;
        & .checkicon > span{
          color:#999999;
        }
        & .checkdetail {
          padding:5px 10px;
          & .weui-cell__ft{
            width:100%;
          }
          &:before {
            border-top:none;
          }
        }
        & .checkdetail .vux-cell-primary{
          display:none;
        }
        & .checkdetail .weui-cells_checkbox label {
          padding: .5em;
          font-size: 0.6em !important;
          float:left;
        }
        overflow:hidden;
      }
      & .choice .weui-cell{
         font-size:.8em !important;
         & .vux-cell-bd {
           text-align: left;
         }
      }
      & .lititle {
        margin: 0 auto;
        text-align: center;
      }
      & .isnow {
        background:#ff7800;
        color:white;
      }
    }
    & .instruction {
      color:gray;
      & ul {
        width: 90%;
        margin:0 auto;
      }
      & ul li {
        padding-left: 0.5em;
        text-align: left;
      }
      & ul li.first {
        padding-left:.5em;
      }
    }
  }  
</style>
