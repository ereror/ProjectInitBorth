<template lang='pug'>
  .content
     loading(v-model="loading" style="position:absolute;z-index:99999")
     h4.align-l 视频指导手册
     group(style="margin-top:-20px")
       cell(is-link v-for="item in linkListX", :key='item.key' value-align='left', :title='item.name',  :link='item.link')
     h4.align-l(v-show="false") 圈主使用指南
     group(style="margin-top:-20px" v-show="false")
       cell(is-link v-for="item in linkListY", :key='item.key' value-align='left', :title='item.name',  :link='item.link')
     h4.align-l(style="margin-top:1em") 玩家使用指南
     group(style="margin-top:-20px")
       cell(is-link v-for="item in linkList", :key='item.key' value-align='left', :title='item.name', :link='item.link')
</template>
<script>
  import { Group, Cell, Loading } from 'vux'
  import dudutool from '@/service/dudutool'
  export default {
    name: 'helpdoc',
    components: {
      Group,
      Cell,
      Loading
    },
    data () {
      return {
        loading: true,
        linkList: [],
        linkListY: [],
        linkListX: []
      }
    },
    created () {
      document.title = '操作指南'
      dudutool.wxaccessToken().then(res => {
        this.getTuwen()
      })
    },
    methods: {
      gotodetail (item) {
        this.$store.commit('setContent', item)
        this.$router.push({ name: 'helpdetail' })
      },
      getTuwen () {
        var param = {
          type: 'news',
          offset: 0,
          count: 20
        }
        dudutool.getmaterial(param).then(res => {
          this.loading = false
          if (res.status === 200 && res.data && res.data.item) {
            console.log(res.data.item)
            this.linkList = []
            this.linkListY = []
            res.data.item.map(v => {
              if ((v.media_id === 'pLz8rqgsB1wZt_0BWmf3SY6aZXCGjl1U4djRtgs4SA4' || v.media_id === 'pLz8rqgsB1wZt_0BWmf3SUYPwuVhf18z-nbTySAjx1M' || v.media_id === 'pLz8rqgsB1wZt_0BWmf3Say0RYEdH7llF0qeqx6P0AU') && v.content && v.content.news_item) {
                v.content.news_item.map(j => {
                  var param = {
                    name: j.title,
                    link: j.url,
                    id: j.thumb_media_id,
                    content: j.content
                  }
                  if (v.media_id === 'pLz8rqgsB1wZt_0BWmf3SUYPwuVhf18z-nbTySAjx1M') this.linkList.push(param)
                  if (v.media_id === 'pLz8rqgsB1wZt_0BWmf3SY6aZXCGjl1U4djRtgs4SA4') this.linkListY.push(param)
                  if (v.media_id === 'pLz8rqgsB1wZt_0BWmf3Say0RYEdH7llF0qeqx6P0AU') this.linkListX.push(param)
                })
              }
            })
          }
        })
      }
    }
  }
</script>
<style scoped lang='less'>
  .vux-label {
    text-align: left !important;
  }
  .align-l {
    text-align: left;
    background:white;
    padding:10px 15px;
    font-weight:600;
    font-family:simhei;
  }
  .content {
    height:100%;
    width:100%;
  }
  .itemcontent {
    padding:2em 0;
  }
  .title {
    width:60%;
    margin:0 auto;
    text-align:center;
    padding:1.5em 0;
    font-weight:bolder;
    font-size:1.1em;
  }
  .itemli {
    width:60%;
    margin:0 auto;
    & li {
      text-align: left
    }
  }
</style>
<style lang='less'>
  .qrcode{
    & img {
      border:1px solid #d6d6d6;
      width:260px;
      height:260px;
    }
  }
</style>
