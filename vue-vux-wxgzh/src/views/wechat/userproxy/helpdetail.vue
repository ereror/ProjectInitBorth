<template lang='pug'>
  div(style="width:100%" id="content") 
   div(v-html='content')
</template>
<script>
  import { Group, Cell } from 'vux'
  var html2canvas = require('html2canvas')
  export default {
    name: 'helpdetail',
    components: {
      Group,
      Cell
    },
    data () {
      return {
        title: ['如何下载九点麻将？', '如何注册成为九点麻将的会员？', '如何获取专属二维码？', '如何邀请新玩家？', '如何查看自己的收益？', '如何进入圈子？', '如何在圈子内开房？'],
        model: 1,
        content: ''
      }
    },
    created () {
      var item = this.$store.state.loading.content
      document.title = item.name
      this.content = item.content
    },
    methods: {
      copey () {
        var canvas = document.createElement('canvas')
        var w = document.body.scrollWidth
        var h = document.body.scrollHeight
        canvas.width = w * 2
        canvas.height = h * 2
        canvas.style.width = w + 'px'
        canvas.style.height = h + 'px'
        var context = canvas.getContext('2d')
         // 然后将画布缩放，将图像放大两倍画到画布上
        context.scale(2, 2)
        html2canvas(document.body, {
          canvas: canvas,
          onrendered: function (canvas) {
            document.body.appendChild(canvas)
          }
        })
      }
    }
  }
</script>
<style>
  body {
    background:white !important;
  }
</style>
