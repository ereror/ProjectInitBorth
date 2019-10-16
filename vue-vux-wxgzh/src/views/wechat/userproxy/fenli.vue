<template lang='pug'>
  .content
</template>
<script>
  import dudutool from '@/service/dudutool'
  export default {
    name: 'fenli',
    data () {
      return {
      }
    },
    beforeMount () {
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
        this.$vux.loading.show()
        dudutool.getmaterial(param).then(res => {
          this.$vux.loading.hide()
          if (res.status === 200 && res.data && res.data.item) {
            console.log(res.data.item)
            res.data.item.map(v => {
              if (v.media_id === 'pLz8rqgsB1wZt_0BWmf3ScP9bE9zbdSIz9eexKWjViw' && v.content && v.content.news_item) {
                location.href = v.content.news_item[0].url
              }
            })
          }
        })
      }
    }
  }
</script>
