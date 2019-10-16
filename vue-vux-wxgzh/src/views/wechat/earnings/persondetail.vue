<template lang='pug'>
    div(style="width:100%;")
        div(style="padding: 10px 0;overflow: hidden;background:white" v-for="item in list")
          masker(style="border-radius: 2px;" color="white" :opacity="0.2")
            div(class="m-img" :style="{backgroundImage: 'url(' + item.img + ')'}")
            div(slot="content" class="m-title")
              //- div.title(style="line-height:1em;padding-left:1em;text-align:left;margin-bottom:10px;") 关系
              div.content(style="display:flex;align-items:center;justify-content:center")
                div(style="display:inline-block")
                  img(src="http://placeholder.qiniudn.com/60x60/3cc51f/ffffff" style="border-radius:50%")
                  div {{userData.nick}}
                //- div(style="display:inline-block;padding:0 5px;margin-top:-25px;")
                //-   icon.icon(name='ico_arrow_r' style="height:1.5rem;width:1.5rem")
                //- div(style="display:inline-block")
                //-   img(src="http://placeholder.qiniudn.com/60x60/3cc51f/ffffff" style="border-radius:50%")
                //-   div 直接下线
                //- div(style="display:inline-block;padding:0 5px;margin-top:-25px;")
                //-   icon.icon(name='ico_arrow_r' style="height:1.5rem;width:1.5rem")
                //- div(style="display:inline-block")
                //-   img(src="http://placeholder.qiniudn.com/60x60/3cc51f/ffffff" style="border-radius:50%")
                //-   div 二级
        group(style="margin-top:-5px")
            .content(style="padding:0 10px;margin:10px 0;")
              div(v-for='item in polif.data', :key='item.key')
                ul(v-for='months in item.months', :key='months.key')
                    li(style="margin:.5em 0;background:#f2f2f2;height:2em;line-height:2em" v-for="(content, index) in months.details", :key='content.key')
                        div.polifItem(:style="{width: ((0.6 * (content.score - maxpolif) / maxpolif + 1)* 100 + '%'),background: colors[index] || colors[colors.length - 1]}")
                            div(style="width:70%;text-align:left;padding-left:.5em;font-size:0.9em")
                                span {{item.time + '-' + months.time}}
                            div(style="width:30%;text-align:right;padding-right:.5em;font-weight:bolder;color:white")
                                span {{content.score}}
</template>
<script>
  import { Tab, TabItem, Group, Masker } from 'vux'
  import LocalStorageService from '@/service/storage'
  import circleService from '@/service/userScircle'
  export default {
    name: 'persondetail',
    components: {
      Tab,
      TabItem,
      Group,
      Masker
    },
    data () {
      return {
        isb: 1, // 倍率
        gongao: '',
        list: [{
          title: '5000',
          img: 'http://p0.so.qhimgs1.com/t01c6a1466ababe29fc.jpg'
        }],
        maxpolif: 0,
        userData: {},
        colors: ['#9546c3', '#8d4dc8', '#8651cb', '#7b58ce', '#735ed5', '#6d62d8', '#6568dd', '#6267dc', '#5d6ee2', '#5374e5'],
        polif: {
          data: [{
            time: 2017,
            total: 5,
            details: [{
              userid: 788912,
              nick: '13900000003',
              score: 5
            }],
            months: [{
              time: 7,
              total: 5,
              details: [
                {
                  time: 7,
                  userid: 788912,
                  nick: '13900000003',
                  score: 8
                }, {
                  time: 5,
                  userid: 788912,
                  nick: '13900000002',
                  score: 5
                }
              ]
            }, {
              time: 5,
              total: 20,
              details: [
                {
                  time: 9,
                  userid: 788912,
                  nick: '芙蓉王小区',
                  score: 10
                }, {
                  time: 12,
                  userid: 788912,
                  nick: '怡馨花园',
                  score: 5
                }
              ]
            }]
          }],
          total: 5
        }
      }
    },
    created () {
      document.title = '个人收益详情'
      var persondetail = LocalStorageService.get('persondetail')
      console.log(persondetail)
      if (persondetail) { this.userData = persondetail }
      this.getUserScorePolif()
      // this.polif.data.map(v => {
      //   if (v.months) {
      //     v.months.map(j => {
      //       j.details = j.details.sort(function (a, b) {
      //         return b.score - a.score
      //       })
      //       j.maxtotal = j.details[0] && j.details[0].score
      //       if (j.maxtotal > this.maxpolif) this.maxpolif = j.maxtotal
      //     })
      //   }
      // })
    },
    methods: {
      onItemClick (val) {
        console.log(val)
        this.isb = val
      },
      getUserScorePolif () {
        circleService.getUserScorePolif({userid: this.userData.userid}).then(res => {
          if (res.status === 200 && res.data) {
            this.polif = res.data
            if (this.polif.data) {
              this.polif.data.map(v => {
                if (v.months) {
                  v.months.map(j => {
                    j.details = j.details.sort(function (a, b) {
                      return b.score - a.score
                    })
                    j.maxtotal = j.details[0] && j.details[0].score
                    if (j.maxtotal > this.maxpolif) this.maxpolif = j.maxtotal
                  })
                }
              })
            }
          }
        })
      },
      sortObject (obj, param, attr, type) {
        obj[param] = obj[param].sort(function (a, b) {
          if (type === 'aesc') return a[attr] - b[attr]
          if (type === 'desc') return b[attr] - a[attr]
        })
      }
    }
  }
</script>
<style lang='less'>
  body {color:#f5f5f5}
  .polifItem{display:flex;min-width:40%;max-width:100%;background:#ff9999;}
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
