<template lang="pug">
  .wrapperBody
    .contentWrapper
      .Overflowcontent
        loading(v-model="isLoading")
        .content(style="display:none")
          .header
            span.title 圈子绑定
            img.opticon(src="~assets/image/arrow.png" @click="showMore = !showMore", :class="{'opticons': showMore}")
          .bodyWrapper(v-show="!gid && showMore")
            .left(style="display:inline-block;width:60%")
              span 强烈建议和微信群绑定，让机器人解放你的双手，无需手动加成员，管理更方便
              .divp(style="font-size:18px;margin-top:0.5rem") 绑定步骤
              .divp(style="color:#292926") 1.添加客服微信jdmj_kefu1 告知圈子ID
              .divp 2.待客服完成绑定后，接收群即可
            .right(style="display:inline-block;float:right;margin-top:0.1rem")
              img(style="height:1.3rem" src="~assets/image/unrelate.png" )
          .bodyWrapper.clearfix(v-show="gid && showMore")
            .left(style="display:inline-block;width:60%")
              span  如果需要更换绑定微信群，点击“解除绑定”，然后再进行绑定
              .divp(style="font-size:18px;margin-top:0.5rem;color:rgb(181, 0, 0);margin-top: 0.8rem;font-weight:700;margin-bottom: 1.4rem;") {{circledata.name}}
            .right(style="display:inline-block;float:right;margin-top:0.1rem;right:-0.4rem;width:38%")
              .divp
                img(style="height:1.3rem" src="~assets/image/relate.png" )
              button.common.disRelate(style="display:block;padding:0 0.4rem;font-size:14px;line-height:1rem;height:1rem;margin-top:2.5rem" @click="unbindCircle()") 解除绑定
        .content(style="display:none")
          .header
            span.title 圈子房费
            img.opticon(src="~assets/image/arrow.png"  @click="falty = !falty", :class="{'opticons': falty}")
          .bodyWrapper(v-show="falty")
            table(width="100%" style="border-collapse: collapse;" cellspacing='0')
              tr
                th(width="10%") 局数
                th(width="20%") 基础房费（房卡）
                th(width="30%") 
                  div  服务费
                  div （房卡）
                th(width="20%") 总房费（房卡）
                th(width="20%") 圈子收益（积分）
              tr.spadding(v-for="(item, index) in tableData")
                td {{item.times}}
                td {{item.basicCards}}
                td
                  span.editCard {{item.addprice}}
                  img(src="~assets/image/editValue.png" style="width:0.4rem;height:0.4rem;margin-left:0.1rem;margin-top:0.1rem" @click="setCirclefk(index);")
                td {{item.basicCards + item.addprice * 1}}
                td {{item.basicCards * 100 * 0.4 + item.addprice * 1 * 0.9 * 100}}
            div(style="margin-top:0.5rem")
              .divp 说明：服务费的90%归属于圈主
              .divp(style="text-indent:3em;") 基础房费的40%归属于圈主
              .divp(style="text-indent:3em;") 每盘收益=基础房费*40%+服务费*90%
        .content
          .header
            span.title 圈子公告
            img.opticon(src="~assets/image/arrow.png" @click="advice = !advice" ref="advice", :class="{'opticons': advice}")
          .bodyWrapper(v-show="advice")
            span 在下面的文本框中输入圈子公告，在游戏可无端所有玩家可见；强烈建议在公告中填写管理员的微信号，便于新玩家申请加入
            textarea(rows="3" cols="20" v-model="circledata.introduce" placeholder="点击文本框输入公告" style="width:100%;height:3rem;resize:none;border-radius:0.2rem" @input="setintroduce()")
        .content(v-show='gid' style="display:none")
          .header
            span.title 群规设置
            img(src="~assets/image/arrow.png" @click="settings = !settings" ref="settings", :class="{'opticons': settings}")
          .bodyWrapper(v-show="settings")
            span 在下面的文本框中设置群规，新玩家加入微信群后；微信机器人会自动@其群规，便于你的管理
            textarea(rows="3" cols="20" v-model="circledata.welcome" placeholder="点击文本框输入公告" style="width:100%;height:3rem;line-height:0.5rem;resize:none;border-radius:0.2rem")
        .content(v-show='gid' style="display:none")
          .header
            span.title 默认玩法
            img.opticon(src="~assets/image/arrow.png" @click="funs = !funs" ref="funs", :class="{'opticons': funs}")
          .bodyWrapper(v-show="funs")
            .divp
              checklist(required :max="1", :options="commonList0" v-model="checklist000")
            .divp(style="border-bottom:0.1px solid #eeeeee;margin-top:0.2rem;font-family:-apple-system-font,Helvetica Neue,sans-serif;")
              span.style(@click="isDingQue = !isDingQue")
                icon.icon(v-if="!isDingQue" name='square')
                icon.icon(v-if="isDingQue" name='check-box')
                input(type="checkbox" style="visibility:hidden;margin-left:-0.5rem")
                label.innerstyle 定缺
              span.style(@click="isHuan3Card = !isHuan3Card")
                icon.icon(v-if="!isHuan3Card" name='square')
                icon.icon(v-if="isHuan3Card" name='check-box')
                input(type="checkbox" style="visibility:hidden;margin-left:-0.5rem")
                label.innerstyle 换三张
              span.style(@click="maozhuanyu = !maozhuanyu")
                icon.icon(v-if="!maozhuanyu" name='square')
                icon.icon(v-if="maozhuanyu" name='check-box')
                input(type="checkbox" style="visibility:hidden;margin-left:-0.5rem")
                label.innerstyle 呼叫转移
            .divp
              checklist(required :max="1", :options="commonList1" v-model="checklist001")
            .divp
              checklist(required :max="1", :options="commonList2" v-model="checklist002")
            .divp(style="border-bottom:0.1px solid #eeeeee;margin-top:0.2rem;font-family:-apple-system-font,Helvetica Neue,sans-serif;")
              span.style(@click="menqing = !menqing")
                icon.icon(v-if="!menqing" name='square')
                icon.icon(v-if="menqing" name='check-box')
                input(type="checkbox" style="visibility:hidden;margin-left:-0.5rem")
                label.innerstyle 门清
              span.style(@click="haidihu = !haidihu")
                icon.icon(v-if="!haidihu" name='square')
                icon.icon(v-if="haidihu" name='check-box')
                input(type="checkbox" style="visibility:hidden;margin-left:-0.5rem")
                label.innerstyle 海底胡
              span.style(@click="zhongzhang = !zhongzhang")
                icon.icon(v-if="!zhongzhang" name='square')
                icon.icon(v-if="zhongzhang" name='check-box')
                input(type="checkbox" style="visibility:hidden;margin-left:-0.5rem")
                label.innerstyle 中张
              span.style(@click="tiandihu = !tiandihu")
                icon.icon(v-if="!tiandihu" name='square')
                icon.icon(v-if="tiandihu" name='check-box')
                input(type="checkbox" style="visibility:hidden;margin-left:-0.5rem")
                label.innerstyle 天地胡
              span.style(@click="jiangdui = !jiangdui")
                icon.icon(v-if="!jiangdui" name='square')
                icon.icon(v-if="jiangdui" name='check-box')
                input(type="checkbox" style="visibility:hidden;margin-left:-0.5rem")
                label.innerstyle 幺九将对
            .divp
              checklist(required :max="1", :options="commonList3" v-model="checklist003")
            .divp
              checklist(required :max="1", :options="commonList4" v-model="checklist004" disabled)
            .divp
              checklist(required :max="1", :options="commonList5" v-model="checklist005")
        popup-picker(:data="data4", v-model="cardnum", :show.sync="showPopupPicker")
        .confirm
          confirm(v-model="show"  title="提示" @on-confirm="onConfirm")
            .divp(style="text-align:center;") 圈子解散后不可恢复，确定要解散
        .confirm
          confirm(v-model="disRelate2"  title="提示" @on-confirm="onConfirm")
            .divp(style="text-align:center;") 确定解除圈子绑定？
      .divbottom
        button.common.disRelate(@click="showPlugin()") 解散圈子
        button.common.save(@click="savedata()") 保存设置
    mytabbar(:modelactivity="menus")
</template>
<script>
  import { XHeader, PopupPicker, Group, Checklist, Confirm, Loading } from 'vux'
  import LocalStorageService from '@/service/storage'
  import circleService from '@/service/userScircle'
  export default{
    components: { XHeader, PopupPicker, Group, Checklist, Confirm, Loading },
    name: 'setting',
    data () {
      return {
        menus: 'myQuzon',
        data4: [],
        cardnum: [0],
        editnowGz: 0,
        showMore: true,
        relate: false,
        funs: true,
        settings: true,
        falty: true,
        advice: true,
        isLoading: false,
        showPopupPicker: false,
        disRelate2: false,
        show: false,
        gid: '',
        circledata: {},
        tableData: [
          {
            times: 4,
            basicCards: 2,
            addprice: 0,
            totalCards: 0,
            basicBenefits: 0
          }, {
            times: 8,
            basicCards: 3,
            addprice: 0,
            totalCards: 0,
            basicBenefits: 0
          }, {
            times: 12,
            basicCards: 4,
            addprice: 0,
            totalCards: 0,
            basicBenefits: 0
          }
        ],
        maozhuanyu: true,
        isDingQue: true,
        isHuan3Card: true,
        menqing: true,
        haidihu: true,
        zhongzhang: true,
        tiandihu: true,
        jiangdui: true,
        commonList0: ['血战到底', '血流成河'],
        commonList1: ['点杠花自摸', '点杠花点炮'],
        commonList2: ['自摸加底', '自摸加番', '自摸不加'],
        commonList3: ['3番', '4番', '5番'],
        commonList4: ['大赢家支付'],
        commonList5: ['4局', '8局', '12局'],
        checklist000: [ '血战到底' ],
        checklist001: [ '点杠花自摸' ],
        checklist002: [ '自摸加番' ],
        checklist003: [ '4番' ],
        checklist004: [ '大赢家支付' ],
        checklist005: [ '8局' ]
      }
    },
    created () {
      var circledata = LocalStorageService.get('circlestr')
      document.title = circledata && circledata.name || '圈子设置'
      this.setDefault(circledata)
      this.teamid = circledata && circledata.id
      this.gid = circledata && circledata.gid
      var datas = []
      for (var i = 0; i < 21; i++) {
        datas.push(i)
      }
      this.data4.push(datas)
    },
    methods: {
      setintroduce () {
        if (this.circledata.introduce.length > 20) this.circledata.introduce = this.circledata.introduce.substring(0, 20)
        this.circledata.introduce = this.circledata.introduce.replace(/[\r\n\t]*/g, '')
      },
      unbindCircle () {
        // 接触圈子绑定
        var param = {
          userid: this.$store.state.wxToken.userid,
          teamid: this.teamid
        }
        this.isLoading = true
        circleService.getUnBindWxGid(param).then(res => {
          this.isLoading = false
          if (res.status === 200 && res.data && !res.data.errcode) {
            this.gid = ''
            this.messageAlert('圈子解除绑定成功！')
          }
        })
      },
      setCirclefk (index) {
        this.showPopupPicker = true
        this.cardnum[0] = this.tableData[index].addprice
        this.editnowGz = index
      },
      checkCircle (val) {
        var scrollTop = 0
        if (val === 'circlegongg') scrollTop = 280
        else scrollTop = 460
        this.showbtn = false
        document.getElementById('circle').scrollTop = scrollTop
      },
      messageAlert (str, bolen) {
        var that = this
        this.$vux.alert.show({
          title: '提示',
          content: str,
          onHide () {
            if (bolen) that.$router.push({ name: 'quzon' })
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
      setDefault (circledata) {
        if (circledata) {
          this.price = circledata.price
          this.circledata = circledata
          if (circledata.addprice && circledata.addprice.length) {
            circledata.addprice.map(v => {
              switch (v.condition) {
                case 4:
                  this.tableData[0].addprice = v.addprice
                  break
                case 8:
                  this.tableData[1].addprice = v.addprice
                  break
                case 12:
                  this.tableData[2].addprice = v.addprice
                  break
              }
            })
          }
          if (circledata.rule) {
            this.checklist001 = []
            circledata.rule = JSON.parse(circledata.rule)
            console.log(circledata)
            this.isDingQue = circledata.rule.isDingQue
            this.isHuan3Card = circledata.rule.isHuan3Card
            this.menqing = circledata.rule.menqing
            this.haidihu = circledata.rule.haidihu
            this.zhongzhang = circledata.rule.zhongzhang
            this.tiandihu = circledata.rule.tiandihu
            this.jiangdui = circledata.rule.quan19 || circledata.rule.jiangdui
            switch (circledata.rule.type) {
              case 'xzdd':
                this.checklist000 = ['血战到底']
                break
              case 'xlch':
                this.checklist000 = ['血流成河']
                break
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
                this.checklist001 = ['点杠花点炮']
                break
              case 1:
                this.checklist001 = ['点杠花自摸']
                break
            }
            switch (circledata.rule.maxFan * 1) {
              case 3:
                this.checklist003 = ['3番']
                break
              case 4:
                this.checklist003 = ['4番']
                break
              case 5:
                this.checklist003 = ['5番']
                break
            }
            switch (circledata.rule.maxGames * 1) {
              case 4:
                this.checklist005 = ['4局']
                break
              case 8:
                this.checklist005 = ['8局']
                break
              case 12:
                this.checklist005 = ['12局']
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
        this.isDingQue = true
        this.isHuan3Card = true
        this.menqing = true
        this.haidihu = true
        this.zhongzhang = true
        this.tiandihu = true
        this.jiangdui = true
        this.checklist001 = [ '点杠花自摸' ]
        this.checklist002 = [ '自摸加番' ]
        this.checklist003 = [ '4番' ]
        this.checklist004 = [ '大赢家支付' ]
        this.checklist005 = [ '8局' ]
      },
      savedata () {
        var that = this
        var rule = {
          baseScore: 1,
          gametype: this.choiced ? 1001 : 1005,
          paytype: 1,
          seats: 4,
          type: (function () {
            if (that.checklist000[0] === '血战到底') return 'xzdd'
            if (that.checklist000[0] === '血流成河') return 'xlch'
          }()),
          maxFan: this.checklist003[0].substring(0, 1),
          maxGames: parseInt(this.checklist005[0]),
          zimo: (function () {
            if (that.checklist002[0] === '自摸加番') return 1
            if (that.checklist002[0] === '自摸加底') return 0
            if (that.checklist002[0] === '自摸不加') return 2
          }()),
          tiandihu: this.tiandihu,
          jingougou: true,
          menqing: this.menqing,
          haidihu: this.haidihu,
          jiangdui: this.jiangdui,
          dianganghua: (function () {
            if (that.checklist001[0] === '点杠花自摸') return 1
            if (that.checklist001[0] === '点杠花点炮') return 0
          }()),
          maozhuanyu: this.maozhuanyu,
          isDingQue: this.isDingQue,
          isHuan3Card: this.isHuan3Card,
          quan19: this.jiangdui,
          zhongzhang: this.zhongzhang
        }
        var param = {
          teamid: this.teamid,
          introduce: this.circledata.introduce,
          welcome: this.circledata.welcome,
          userid: this.$store.state.wxToken.userid,
          price: this.price,
          rule: JSON.stringify(rule),
          addprice: [{
            condition: 4,
            addprice: this.tableData[0].addprice
          }, {
            condition: 8,
            addprice: this.tableData[1].addprice
          }, {
            condition: 12,
            addprice: this.tableData[2].addprice
          }]
        }
        this.$vux.loading.show({
          text: '正在保存'
        })
        circleService.setTeamInfo(param).then(res => {
          this.$vux.loading.hide()
          if (!res.data.errcode) {
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
      },
      visiblity (val) {
        // let curValue = `、${val}`
        this[`${val}`] = !this[`${val}`]
        if (!this[`${val}`]) this.$refs[val].style.transform = 'rotate(0deg)'
        else this.$refs[val].style.transform = 'rotate(90deg)'
      }
    },
    watch: {
      cardnum: function (newval) {
        this.tableData[this.editnowGz].addprice = this.cardnum[0]
      },
      checklist000: function (newval, old) {
        if (!newval.length) this.$set(this.checklist000, 0, old[0])
      },
      checklist001: function (newval, old) {
        if (!newval.length) this.$set(this.checklist001, 0, old[0])
      },
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
      }
    }
  }
</script>
<style>
.weui-cells_checkbox .weui-cell__hd {
    padding-right: 0em !important;
}
  .weui-cell{
    float: left;
    padding: 10px 0 !important;
  }
  .weui-cells_checkbox .weui-check:checked + .vux-checklist-icon-checked:before{
    color: #2297fe !important;
  }
  .weui-cells{
    background: #eeeeee !important;
  }
  .weui-cells_checkbox .weui-icon-checked:before{
    /*content: 'checkbox' !important;*/
  }
</style>
<style scoped lang="less">
  .style{
    line-height: 2;
    height: 2;
    font-size: 17px;
    margin-left:5px;
    margin-right: 5px;
  }
  .innerstyle{
    vertical-align: top;
    margin-left: 0.3rem;
  }
  .icon {
    vertical-align:middle;
  }
  .wrapperBody{
    background-color: #1a1a1d;
    height: 100%;
    overflow: hidden;
  }
  .svg-icon{
    width:0.6rem;
    height:0.5rem;
    color:#666;
  }
  .icon{
    color:#2297fe;
    z-index:55;
  }
  .editCard{
    display:inline-block;
    width:1.5rem;
    height:0.5rem;
    line-height:0.5rem;
    background-color:#ffae00;
    padding:0 0.15rem;
    border-radius:0.3rem;
    color:#ffffff;
  }
  .header{
    height:1rem;
    background-color: #ffffff;
    padding:0.02rem 0.3rem;
    border-radius: 0.3rem;
  }
  .title{
    font-size: 20px;
    font-weight: 700
  }
  .bodyWrapper{
    background-color: #eeeeee;
    color:#100e0e;
    border-radius: 0.2rem;
    padding:0.2rem;
    & .divp {
      & span.style {
        display: inline-block;
      }
    }
  }
  input{
    margin-left: 0.3rem;
  }
  a{
    display: inline-block;
  }
  table tr{
    text-align: center;
    border-bottom:1px solid #cccccc;
    font-weight:700;
  }
  table tr th {
    font-weight:400;
    padding:0.2rem 0;
    vertical-align: top;
  }
  tr:last-child {
    border-bottom:none;
  }
  .spadding td{
    padding:0.2rem;
  }
  .lists{
    display:flex;
    flex-wrap: nowrap;
    justify-content:space-around;
    margin-top: 0.3rem;
/*    align-items: flex-end;*/
  }
  .contentLine{
   margin-top:0.5rem;
  }
  .Overflowcontent{
    max-height: 100%;
    overflow: auto;
    height: 100%;
    padding-bottom: 3rem;
    &  .vux-cell-box{
      display:none;
    }
    &  .opticon {
      transition: all .5s;
    }
    &  .opticons {
      transform: rotate(90deg);
    }
  }
  .leftWrapper,.rightWapper{
    display: inline-block;
  }
  .rightContent{
    text-align: left;
    padding-left: 0.5rem;
  }
  img{
    height:0.7rem;
    float:right;
    margin-right:0.3rem;
  }
  .connent{
    height: 3.1rem;
    padding:0.2rem 0;
  }
  .contentWrapper{
    position:relative;
    width:100%;
    float: left;
    text-align: left;
    padding:0.2rem 0.2rem;
    max-height:100%;
    height:100%;
    overflow: auto;
    &  .divbottom{
      position:absolute;
      z-index:2;
      bottom:0;
      width:100%;
      height:1.5rem;
      background: black;
      bottom:1.2rem;
      display:flex;
      justify-content:center;
      align-items: center;
      left: 0;
      box-shadow: 2px -3px 2px black;
    }
  }
  .content{
    box-shadow: #dcdcdc;
    background-color: #fefefe;
    border:1px solid #dcdcdc;
    margin-top:0.2rem;
    border-radius: 10px;
    padding:0.2rem 0 0 0;
  }
  .common{
    color:#ffffff;
    padding:0 1rem;
    border-radius: 0.5rem;
    height:1.1rem;
    line-height:1.1rem;
    font-size: 16px;
    margin-left:0.5rem;
  }
  .disRelate{
    background-color:#fe6362;
  }
  .save{
    background-color:#2297fe;
  }
</style>
