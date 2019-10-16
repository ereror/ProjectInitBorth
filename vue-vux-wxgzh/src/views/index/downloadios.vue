<template lang='pug'>
  div.imgbg
    div.contentimg
      img.conimg(src='~@/assets/image/iosnotice.jpg')
    div.bottombar(style='background:black;opacity:.8;')
      a(:href='downloadurl')
      img.imgbtnxr(src='~@/assets/image/iosbtn.png' @click='setafunc' height="30px")
</template>
<script>
  export default {
    name: 'downloadios',
    data () {
      return {
        downloadurl: 'itms-services://?action=download-manifest&url=https://www.twiceway.com/9dmj.plist',
        ahref: 'http://www.9diangame.com/huamajiang.mobileprovision',
        xhref: '',
        dhref: ''
      }
    },
    created () {
    },
    destroyed () {
    },
    methods: {
      setafunc () {
        location.href = this.ahref
      }
    }
  }
</script>
<style scoped>
  #app { 
    overflow:hidden;
  }
	.imbg {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
	}
  .contentimg {
    height: calc(100% - 2rem);
    overflow:auto;
    max-height: calc(100% - 2rem);
  }
  .conimg {
    width: 100%;
  }
  .bottombar {
    position:absolute;
    bottom:0;
    width:100%;
    height:3.4rem;
  }
  .imgbtnxr {
    width: 90%;
    margin: .4rem auto;
    height: 2.6rem;
    margin-left: 5%;
  }
</style>
