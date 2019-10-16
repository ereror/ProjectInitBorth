<template lang="pug">
  .wrapperBody
    .contentWrapper
      .Overflowcontent
        button-tab(style="margin-bottom:0.5rem;  height:1rem;font-weight:700;")
          button-tab-item(selected @on-item-click="clickHandle('memeberLists')") 成员列表
          //- button-tab-item(@on-item-click="clickHandle('dynamic')") 微信群动态
        .memberList(v-if="curValue==='memeberLists'" style="height:14.5rem;overflow:hidden;")
          .div(style="position: relative;height: 1.2rem;")
            .group
              p(v-if="curSel==='selectAll'")
                span(style="color:#f8b300") {{curSelName}}
                img(v-if="curSel==='selectAll'"  src="~assets/image/arrow.png" @click="selectFun" style="transform:rotate(90deg);height:0.6rem;margin-right:0.2rem;float:right;margin-top:0.1rem")
              p(v-if="curSel==='selectSome' || selectVisible" style="border-top:1px solid #ffffff;text-align:left;margin-left:0.3rem" @click="jumpTo")
                span(style="") {{nextSelName}}
            div.parSearch(style="")
              input.search(type="text" v-model="keysword" placeholder="输入你要搜索的玩家")
              icon.icon(style="position:absolute;" name="ico_search_light")
          .divcontentdetail(style="height:100%;overflow:auto;margin-top:.5rem;padding-bottom: 2.5rem;")
              .content(v-for="(item, index) in meberlists", :key="index", :class="{'backwhite': !item.showDeatil}" v-show="(item.nick.indexOf(keysword) !== -1) || !keysword")
                .header(style="margin-top: 0.1rem;", :class="{'smdetail': !item.showDeatil}")
                  img.head_icon(:src="item.icon")
                  div(style="display:inline-block;vertical-align:super")
                    p(style="font-weight:700") {{item.nick || '玩家' + (index + i)}}
                    p ID:{{item.userid}}
                  img.showmoreimg(src="~assets/image/arrow.png" @click="visiblity(index)", :class="{'moredetail': item.showDeatil}" v-show="item.userid !== userid")
                .div
                    .bodyWrapper(v-if="item.inviter && item.showDeatil")
                      //- .subcontent(style="padding:0.05rem 0.2rem; border-bottom:0.5px solid #cccccc;font-size:12px")
                      //-   span 邀请人信息：{{item.invitorwx | formart('nick')}} {{item.invitorwx | formart('wxid')}}
                      //-   span(style="float:right") 入群时间：{{item.invitorwx.time}}
                      .hiddencontent( style="padding:0.05rem 0.2rem;")
                        span 备注信息：{{item.inviter}}
                    .bottom(v-if="item.showDeatil" style="margin:0.4rem 0.4rem 0.05rem 1.78rem;text-align: right;")
                      button.common.disRelate(style="background-color:#ffb300" @click="showpersonfunc(item, index)") 邀请人信息
                      button.common.save(style="background-color:#fe6362" @click="deletMeber(index, item)" v-show='item.userid !== userid') 删除成员
        .memberList(v-if="curValue==='dynamic'" style="height:14.5rem;overflow:hidden;")
          .div(style="position: relative;height: 1.2rem;")
            div.subSearch
              input.search(type="text" v-model="winxKeyword" placeholder="输入你要搜索的玩家ID")
              icon.icon(style="position:absolute;" name="ico_search_light")
          .divcontentdetail(style="height:12rem;overflow:auto;margin-top:.5rem;")     
              .content1(v-for="(items, index) in newactions", :key="index")
                .line
                  b
                  span(style="color:#ffffff;width:25%;display:inline-block;text-align:center") {{items[0].time.substring(0,10)}}
                  b
                .divcontent(v-for="(item, index) in items" v-show="(item.nick.indexOf(winxKeyword) !== -1) || !winxKeyword")
                  .header(style="margin-top: 0.1rem;")
                    img.head_icon(:src="item.icon" v-show='item.icon')
                    img.head_icon(src="~assets/image/tempicon.png" v-show='!item.icon')
                    div(style="display:inline-block")
                      p {{item.nick | lenform}}
                      p {{item.wxid | formatLen}}
                    div(style="display:inline-block;float:right;margin-top: 0.22rem; ")
                      p {{item.time}}
                      p(v-if="item.type === 1" style="color:#26648a;float:right;font-weight:700;") 建群
                      p(v-if="item.type === 2" style="color:#fd0893;float:right;font-weight:700;") 入群
                      p(v-if="item.type === 3" style="color:#1b95ff;float:right;font-weight:700;") 退群
                      p(v-if="item.type === 4" style="color:#ffa000;float:right;font-weight:700;") 改名
                  .body(v-if="item.type === 4 && item.nick_other" style="border-top:0.5px solid #dddddd;padding:0.3rem")
                    span(v-show="item.nick_other") {{item.nick_other | lenform}}
                    span(style="color:#ffa000;") 改名为
                    span(style="font-weight:700") {{item.nick | lenform}}
    mytabbar
    confirm(v-model="showpersonstatus" show-input title="修改人邀请人信息" @on-confirm="changeperson" ref="confirm" @on-show="onShowFunc")
</template>
<script>
  import { XHeader, ButtonTab, ButtonTabItem, Group, Selector, Confirm } from 'vux'
  import date from '@/filter/date'
  import LocalStorageService from '@/service/storage'
  import circleService from '@/service/userScircle'
  export default{
    components: { XHeader, ButtonTab, ButtonTabItem, Group, Selector, Confirm },
    name: 'memberDetail',
    data () {
      return {
        showMore: true,
        curSel: 'selectAll',
        curSelName: '所有人',
        nextSelName: '群外成员',
        selectVisible: false,
        showDeatil: false,
        memeberLists: false,
        dynamic: false,
        edititem: {},
        showperson: '',
        editnowindex: '',
        showpersonstatus: false,
        curValue: 'memeberLists',
        keysword: '',
        winxKeyword: '',
        circledata: {
          id: '',
          gid: ''
        },
        weixinList: [],
        members: [],
        actions: [],
        newactions: [],
        meberlists: []
      }
    },
    computed: {
      userid () {
        return this.$store.state.wxToken.userid
      }
    },
    created () {
      document.title = '圈子成员'
      var store = LocalStorageService.get('storeState')
      if (store) this.$store.commit('setstore', store)
      var circledata = LocalStorageService.get('circlestr')
      if (circledata) {
        this.teamid = circledata.id
        if (circledata) this.circledata = circledata
        if (circledata.id) this.getMerber(circledata.id)
      }
    },
    methods: {
      onShowFunc () {
        this.$refs.confirm.setInputValue(this.showperson)
      },
      showpersonfunc (item, editnowindex) {
        this.showpersonstatus = !this.showpersonstatus
        this.showperson = item.invitorwx && item.invitorwx.nick
        this.edititem = item
        this.editnowindex = editnowindex
      },
      changeperson (val) {
        var temp = {
          userid: this.$store.state.wxToken.userid,
          teamid: this.teamid,
          memberid: this.edititem.userid || '',
          memberinvitor: val
        }
        circleService.getChgInvitor(temp).then(res => {
          if (res.status === 200 && res.data && !res.data.errcode) {
            this.messageAlert('邀请人信息修改成功！')
            this.meberlists[this.editnowindex].inviter = val
            this.$set(this.meberlists, this.editnowindex, this.meberlists[this.editnowindex])
            this.editnowindex = ''
          } else {
            this.messageAlert('邀请人信息修改失败，请稍后重试！')
          }
        })
      },
      deletMeber (index, item) {
        var temp = {
          userid: this.$store.state.wxToken.userid,
          teamid: this.teamid,
          bekickid: item.userid
        }
        circleService.getKickTeamMember(temp).then(res => {
          if (res.status === 200 && res.data && !res.data.errcode) {
            this.messageAlert('成员删除成功！')
            this.meberlists.splice(index, 1)
          } else {
            this.messageAlert('成员删除失败，请稍后重试！')
          }
        })
      },
      calcActions () {
        let newactions = []
        this.actions.forEach(e => {
          let datestr = e.time.substring(0, 10)
          let flag = true
          newactions.forEach(ne => {
            if (ne[0].time.substring(0, 10) === datestr) {
              if (e.time) e.time = date(e.time, 'yyyy-MM-dd HH:mm')
              ne.push(e)
              flag = false
            }
          })
          if (flag) {
            newactions.push([e])
          }
        })
        this.newactions = newactions
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
      getMerber (id) {
        circleService.getTeamMembers({teamid: id}).then(res => {
          if (res.status === 200 && res.data) {
            if (!res.data.errcode) {
              this.members = res.data.members
              this.meberlists = this.members
            }
          }
        })
      },
      getWeiXinMerber (id) {
        circleService.getTeamActions({gid: id}).then(res => {
          if (res.status === 200 && res.data) {
            if (!res.data.errcode) {
              this.actions = res.data.actions
              this.calcActions()
            }
          }
        })
      },
      objMerberFormat () {
        if (!this.members || !this.members.length) return
        // var newmember = JSON.parse(JSON.stringify(this.members))
        var wxidlist = []
        var index
        this.members.map((v, i) => {
          v.submember = []
          if (v.invitorwx && v.invitorwx.time) v.invitorwx.time = date(v.invitorwx.time, 'yyyy-MM-dd HH:mm')
          if (v.wxid) wxidlist.push(v.wxid)
          else wxidlist.push(new Date().getTime() + i)
        })
        this.members.map(j => {
          if (j.invitorwx && j.invitorwx.wxid) {
            index = wxidlist.indexOf(j.invitorwx.wxid)
            var param = {
              wxid: j.wxid,
              nick: j.nick
            }
            this.members[index].submember.push(param)
          }
        })
        console.log(this.members)
      },
      clickHandle (val) {
        this.dynamic = false
        this.curValue = val
        if (val === 'dynamic' && !this.weixinList.length) {
          if (this.circledata && this.circledata.gid) {
            this.getWeiXinMerber(this.circledata.gid)
          }
        }
      },
      visiblity (index) {
        this.meberlists[index].showDeatil = !this.meberlists[index].showDeatil
        this.$set(this.meberlists, index, this.meberlists[index])
      },
      selectFun () {
        this.selectVisible = !this.selectVisible
      },
      jumpTo () {
        let temp = this.curSelName
        this.curSelName = this.nextSelName
        this.nextSelName = temp
        this.selectVisible = false
      }
    },
    filters: {
      lenform: function (val) {
        if (!val || val.length <= 6) return val
        else return val.substring(val.length - 6)
      },
      formatLen: function (val) {
        if (!val) return
        return val.substr(-6)
      },
      formart: function (val, type) {
        if (!val) return
        if (type === 'nick' && val.nick) {
          return val.nick.substring(val.nick.length - 6)
        } else if (type === 'wxid' && val.wxid) {
          return val.wxid.substring(val.wxid.length - 6)
        } else {
          return val
        }
      }
    }
  }
</script>
<style scoped>
  .group{
    position: absolute;
    border-radius: 4rem;
    background-color:#4a4848;
    display:inline-block;
    width:40%;
    text-align:center;
    color:#ffffff;
    font-size:20px;
    font-weight:700;
    padding:0.2rem 0.2rem
  }
  .subSearch{
    height: 1.25rem;
    border: 0;
    margin: 1rem auto;
    width: 90%;
  }
  b{
    background: #ddd;
    margin: -4px auto;
    display: inline-block;
    width: 3rem;
    height: 1px;
    overflow: hidden;
    vertical-align: middle;
  }
  .parSearch{
     position:relative;
     height:1.25rem;
     width:50%;
     float:right;
     border:0;
  }
  .search{
    height:1.25rem;
    width:100%;
    background:#4a4848;
    border-radius:3rem;
    border:0px;
    color:#ffffff;
    text-indent:0.35rem;
    outline:0;
  }
  .svg-icon{
     margin: .3rem auto auto -1rem;
     font-weight:700;
  }
  .weui-cells{
    margin-top:0px !important
  }
  .weui-search-bar{
    border-radius: 5rem;
    background-color: #4a4848 !important;
  }
</style>
<style scoped lang='less'>
  .wrapperBody{
    height:100%;
    background-color: black;
  }
  .weui-search-bar{
    background-color: #313436;
    color:#f9fcfe;
    padding:0;
  }
  .weui-search-bar__form{
    background-color: #313436;
    color:#f9fcfe;
  }
  .header{
    height:1.5rem;
    background-color: #ffffff;
    padding:0.02rem 0.3rem;
    border-radius: 0.3rem;
    margin-top: 0.1rem;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .topBar{
    height:30px;
    color:#ffffff;
  }
  .bodyPhoto{
    height: 5rem;
    width: 100%;
    background-color: #1c1c1f;
    color:#ffffff;
  }
  .head_icon{
    display: inline-block;
    width: 1.1rem;
    height: 1.1rem;
    border-radius: 50%;
    margin-right: 0.3rem;
    margin-top: 0.2rem;
    vertical-align: bottom;
  }
  .btn{
    margin-right: 0.25rem;
    color: #ffffff;
    background-color: #ffae00;
    padding: 0.1rem 0.33rem;
    border-radius: 0.5rem;
    border:none;
  }
  .vux-button-group > a.vux-button-group-current {
    color: #f8b300;
    background: #323337;
    font-size:20px
  }
  .common{
    color:#ffffff;
    padding:0 0.3rem;
    border-radius: 0.5rem;
    height:1rem;
    line-height:1rem;
    margin-left:0.4rem;
    box-shadow: 1px 1px 10px grey;
  }
  .disRelate{
    background-color:#fe6362;
  }
  .save{
    background-color:#2297fe;
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
    font-size:20px;
    height:1.2rem;
    line-height:1.2rem;
    padding:0 1rem;
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
  .contentLine{
   margin-top:0.5rem;
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
    padding:0 0.3rem;
    background-color: black;
  }
  .divcontent{
    box-shadow: #dcdcdc;
    background-color: #eeeeee;
    border:1px solid #dcdcdc;
    border-radius: 10px;
    margin-top: 0.3rem;
    & .header{
      background: none;
      margin-top: 0;
    }
  }
  .line {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: .5rem;
  }
  .content{
    padding:0 0 .3rem 0;
    box-shadow: #dcdcdc;
    background-color: #eeeeee;
    border-radius: 15px;
    margin-bottom: 0.5rem;
    &  .header {
      &  .showmoreimg {
        transform: rotate(0deg);
        height:0.7rem;
        margin-right:0.1rem;
        float:right;
        margin-top: 0.4rem;
        transition: all .5s;
      }
      &  .moredetail {
        transform: rotate(90deg);        
      }
    }
    &  .smdetail {
      border-bottom-right-radius: 0.3rem;
      border-bottom-left-radius: 0.3rem;
    }
  }
  .content.backwhite {
    padding: 0;
  }
</style>

