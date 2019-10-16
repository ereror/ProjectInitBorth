<template lang='pug'>
    div(style="width:100%;")
        loading(v-model="isLoading")
        div(style="height:44px;")
          sticky
            tab
                tab-item(selected @on-item-click="onItemClick" active-class="active-6-2") 我的分利树
                tab-item(@on-item-click="onItemClick('wecle')" style="color:#7f7f7f") 我的圈子
                tab-item(@on-item-click="onItemClick('earnings')" style="color:#7f7f7f") 我的收益
        group.group(style="margin:-10px 0;")
            div(style="padding:10px;overflow:hidden")
                .row2(style="width:100%;")
                    div.line_s.contentbox4(style="float:left")
                        img(:src="data.icon")
                    div.content(style="float:left;align-items:center;padding:0 .5em;font-size:.8em;border-bottom:1px solid #e5e5e5;height:1.5rem;padding-top:.5em;width:calc(100% - 1.5rem);" @click='data.showmore = !data.showmore')
                        div(style='display:flex;display:-webkit-box;')
                          .title {{data.nick}}
                          .data(style="margin:0 .5em;" v-show='data.total_one')
                              |(
                              span.number(style="color:green;font-weight:600") {{data.total_one}}
                              span.number(style="color:orange;font-weight:600" v-show='data.total_two') /{{data.total_two}}
                              span.number(style="color:red;font-weight:600" v-show='data.total_three') /{{data.total_three}}
                              |)
                        div(style="text-align:left")
                          span(style="color:gray") ID:{{data.userid}}
                        div(style="float:right;margin-top:-1rem"  v-show='data.total_one')
                          span 
                            icon.icon(name='ico_arrow_up' style="width:1.5em;height:1.5em;color:#47a4ed" v-show='data.showmore')
                            icon.icon(name='ico_arrow_down' style="width:1.5em;height:1.5em;color:#47a4ed" v-show='!data.showmore')
                    transition-group(name="slide-fade" tag="div" style="width:100%")
                      .row2(v-for='(oneitem, oneindex) in data.down', :key='oneitem.userid' v-show="data.showmore")
                        .row2
                            div.line_c.contentbox3
                        .row2
                            div.contentbox(:class="{'line_r': oneindex !== data.down.length - 1, 'line_e': oneindex === data.down.length - 1}")
                            div.line_s.contentbox4
                                img(:src="oneitem.icon")
                            div.content(style="align-items:center;padding:0 .5em;font-size:.8em;border-bottom:1px solid #e5e5e5;height:1.5rem;padding-top:.5em;width:calc(100% - 2.5rem);" @click="showdetail('oneindex', oneindex)")
                              div(style='display:flex;display:-webkit-box;')
                                .title {{oneitem.nick}}
                                .data(style="margin:0 .5em;" v-show="oneitem.total_one")
                                    |(
                                    span.number(style="color:orange;font-weight:600" v-show="oneitem.total_one") {{oneitem.total_one}}
                                    span.number(style="color:red;font-weight:600" v-show="oneitem.total_two") /{{oneitem.total_two}}
                                    |)
                              div(style="text-align:left")
                                span(style="color:gray") ID:{{oneitem.userid}}
                              div(style="float:right;margin-top:-1rem" v-show="oneitem.total_one")
                                span
                                  icon.icon(name='ico_arrow_up' style="width:1.5em;height:1.5em;color:#47a4ed" v-show="oneitem.showmore")
                                  icon.icon(name='ico_arrow_down' style="width:1.5em;height:1.5em;color:#47a4ed" v-show="!oneitem.showmore")
                            transition-group(name="slide-fade" tag="div" style="width:100%")
                              .row2(v-for="(twoitem, twoindex) in oneitem.down", :key='twoitem.userid' v-show="oneitem.showmore")
                                .row2
                                    div.contentbox3(:class="{'line_c': oneindex < data.down.length - 1}")
                                    div.contentbox3(:class="{'line_c': oneindex < data.down.length}")
                                .row2
                                    div.contentbox(:class="{'line_c': oneindex < data.down.length - 1}")
                                    div.contentbox(:class="{'line_r': twoindex !== oneitem.down.length - 1, 'line_e': twoindex === oneitem.down.length - 1}")
                                    div.line_s.contentbox4
                                        img(:src="twoitem.icon")
                                    div.content(style="align-items:center;padding:0 .5em;font-size:.8em;border-bottom:1px solid #e5e5e5;height:1.5rem;padding-top:.5em;width:calc(100% - 3.5rem);" @click="showdetail('twoindex', oneindex, twoindex)")
                                      div(style='display:flex;display:-webkit-box;')
                                        .title {{twoitem.nick}}
                                        .data(style="margin:0 .5em;" v-show='twoitem.total_one')
                                            |(
                                            span.number(style="color:orange;font-weight:600") {{twoitem.total_one}}
                                            |)
                                      div(style="text-align:left")
                                        span(style="color:gray") ID:{{twoitem.userid}}
                                      div(style="float:right;margin-top:-1rem"  v-show='twoitem.total_one')
                                        span
                                          icon.icon(name='ico_arrow_up' style="width:1.5em;height:1.5em;color:#47a4ed" v-show="twoitem.showmore")
                                          icon.icon(name='ico_arrow_down' style="width:1.5em;height:1.5em;color:#47a4ed" v-show="!twoitem.showmore")
                                    transition-group(name="slide-fade" tag="div" style="width:100%")
                                      .row2(v-for="(threeitem, threeindex) in twoitem.down", :key='threeitem.userid' v-show="twoitem.showmore")
                                        .row2
                                            div.contentbox3(:class="{'line_c': oneindex < data.down.length - 1}")
                                            div.contentbox3(:class="{'line_c': twoindex < oneitem.down.length - 1}")
                                            div.line_c.contentbox3 
                                        .row2
                                            div.contentbox(:class="{'line_c': oneindex < data.down.length - 1}")
                                            div.contentbox(:class="{'line_c': twoindex < oneitem.down.length - 1}")
                                            div.contentbox(:class="{'line_r': threeindex !== twoitem.down.length - 1, 'line_e': threeindex === twoitem.down.length - 1}")
                                            div.line_s.contentbox4
                                                img(:src="threeitem.icon")
                                            div.content(style="padding:0 .5em;font-size:.8em;border-bottom:1px solid #e5e5e5;height:1.5rem;padding-top:.5em;width:calc(100% - 4.5rem);")
                                              div(style='display:flex;display:-webkit-box;')
                                                .title {{threeitem.nick}}
                                              div(style="text-align:left")
                                                span(style="color:gray") ID:{{threeitem.userid}}
</template>
<script>
  import { Tab, TabItem, Grid, GridItem, XTextarea, Group, XInput, Loading, Sticky } from 'vux'
  import { calcrem } from '@/utils/common'
  import circleService from '@/service/userScircle'
  calcrem()
  export default {
    name: 'circlepolif',
    components: {
      Tab,
      TabItem,
      Group,
      Grid,
      GridItem,
      XTextarea,
      XInput,
      Loading,
      Sticky
    },
    data () {
      return {
        isb: 1, // 倍率
        gongao: '',
        imgsrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        data: {
          userid: 9527689,
          nick: '冷风的一次尝试',
          icon: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          showmore: false,
          down: [
            {
              userid: 904152,
              nick: '李雨桐',
              icon: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
              showmore: false,
              down: [
                {
                  userid: 904153,
                  nick: '狗仔1号',
                  icon: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                  showmore: false,
                  down: [
                    {
                      userid: 904154,
                      nick: '狗仔A号',
                      icon: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff'
                    },
                    {
                      userid: 904155,
                      nick: '狗仔B号',
                      icon: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff'
                    }
                  ]
                }, {
                  userid: 904156,
                  nick: '狗仔2号',
                  icon: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                  showmore: false,
                  down: [{
                    userid: 904157,
                    nick: '狗仔c号',
                    icon: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff'
                  }, {
                    userid: 904158,
                    nick: '狗仔D号',
                    icon: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff'
                  }, {
                    userid: 904159,
                    nick: '狗仔E号',
                    icon: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff'
                  }]
                }
              ]
            }
          ]
        }
      }
    },
    computed: {
      isLoading () {
        return this.$store.state.loading.isLoading
      }
    },
    created () {
      document.title = '我的分利'
      this.data = {
        userid: this.$store.state.wxToken.userid,
        nick: this.$store.state.wxToken.unickname,
        icon: this.$store.state.wxToken.uheadeimgurl,
        down: [],
        showmore: false
      }
      // this.calcCount(this.data) // 对数据进行排序
      this.getUserDownData()
    },
    methods: {
      showdetail (val, index, twoindex) {
        if (val === 'oneindex') {
          this.data.down[index].showmore = !this.data.down[index].showmore
          this.$set(this.data.down, index, this.data.down[index])
        }
        if (val === 'twoindex') {
          this.data.down[index].down[twoindex].showmore = !this.data.down[index].down[twoindex].showmore
          this.$set(this.data.down[index].down, twoindex, this.data.down[index].down[twoindex])
        }
      },
      getUserDownData () {
        circleService.GetUserDown({userid: this.$store.state.wxToken.userid}).then(res => {
          if (!res.errcode) {
            // this.data.down = res.data
            this.$set(this.data, 'down', res.data)
            this.calcCount(this.data)
          }
        })
      },
      checkItem (val) {
        console.log(val)
        this.isb = val
      },
      onItemClick (val) {
        if (val === 'earnings') this.$router.push({ name: 'earnings' })
        if (val === 'wecle') this.$router.push({ name: 'wecle' })
      },
      calcCount (data) {
        data.total_one = data.down.length || 0
        data.total_two = 0
        data.total_three = 0
        data.showmore = false
        data.down.map(v => {
          if (v.down && v.down.length) {
            data.total_two += v.down.length
            v.total_one = v.down.length
            v.total_two = 0
            v.showmore = false
            v.down.map(j => {
              if (j.down && j.down.length) {
                data.total_three += j.down.length
                v.total_two += j.down.length
                j.total_one = j.down.length
                j.showmore = false
              }
            })
          }
        })
      }
    }
  }
</script>
<style lang='less' scoped>
    .row2 {
        width:100%;
        clear:both;
        & > div {
            float: left;
        }
    }
    .row {
        overflow:hidden;
        display: flex;
        justify-content:flex-start;
         & .content {
          color:gray;
         }
        & .content .data .number {
           font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
           font-size: 1em;
           color: red;
           font-weight:bolder;
           margin:0 .1em;
        }
    }
    .active-6-2 {
      color: black !important;
      border-color: #04be02 !important;
    }
    .group{
        background: #e5e5e5;
        margin:.5em 0em;
        width: 100%;
        & img {
            height:100%;
            width:100%;
        }
        & .contentbox {
            height:1.5rem;width:1rem;
        }
        & .contentbox2 {
            height:0.75rem;width:1rem;
        }
        & .contentbox3 {
            height:0.6rem;width:1rem;
        }
        & .contentbox4 {
            height:1.5rem;width:1.5rem;
            & img {
              border-radius:50%;
            }        
        }
        & .title {
            text-align: left;
            font-size:1.1em;
            color: black;
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
</style>
<style lang='less'>
    .slide-fade-enter-active {
      transition: all .3s ease;
    }
    .slide-fade-leave-active {
      transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active 在低于 2.1.8 版本中 */ {
      transform: translateY(0px);
      opacity: 0;
    }
    .line_c:before, .line_r:before{
        display:inline-block;
        content:'';
        width:2px;
        height:100%;
        margin:0 auto;
        border:1px solid gray;
    }
    .line_r, .line_e {
        position: relative;
    }
    .line_e:before {
        display:inline-block;
        content:'';
        width:2px;
        height:50%;
        margin:0 auto;
        border:1px solid gray;        
    }
    .line_r:after, .line_e:after{
        position:absolute;
        top:calc(50% - 2);
        display:inline-block;
        content:'';
        width:50%;
        height:2px;
        margin:0 auto;
        border:1px solid gray;        
    }
</style>
