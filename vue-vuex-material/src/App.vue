<template lang="pug">
  div.full-container
    zHeader(v-show="logined", :username='username', :type='level', :logintime='logintime')
    el-row(style='height:100%;overflow:hidden;')
      navMenu.navbar(v-show="logined")
      router-view.body-container(style="float:left")
</template>
<script>
  import localservice from '@/services/storage'
  export default {
    name: 'app',
    data() {
      return {
        showleftbar: true,
        username: '',
        level: '1',
        logintime: 1
      }
    },
    computed: {
      logined () {
        return this.$store.state.user.logined
      }
    },
    created () {
      var userinfo = localservice.get('userinfo')
      var time = new Date().getTime()
      if (!userinfo || !userinfo.logined || (userinfo && (time - userinfo.logintime > 8 * 60 * 60 * 1000))) {
        this.$router.push({name: 'login'})
        return
      } else {
        this.$store.commit('loginchange', 'yuyu')
      }
    }
  }
</script>
<style src="./assets/css/style.css"></style>
<style>
  .searchBox .form-control {
    font-size: inherit;
  }
  .flex-c {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .flex-l {
    display: flex;
    justify-content: flex-start;
    align-items: center;    
  }
  .flex-s {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .flex-y {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  .flex-r {
    display: flex;
    justify-content: flex-end;
    align-items: center;    
  }
  .flex-b {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .full-container {
    width: 100%;
    min-width: 1220px;
    min-height: 820px;
    height: 100%;
    background: url('~assets/imgs/bg_interface.png') repeat-x bottom;
  }
  .navbar {
    float:left;
    margin-top: 62px;
  }
  .body-container {
    float:left;
    width: calc(100% - 200px);
    height: 100%;
    padding: 15px 30px;
    display: inline-block;
    overflow: auto;
  }
  .float-l {
    float:left;
  }
  .float-r {
    float:right;
  }
  .animated {
    animation-duration: 0.3s;
    animation-timing-function: linear;
  }
  .errorfont {
    font-size: 48px;
    margin-right: 20px;
  }
  .input-box {
    & .el-form-item__content {
      height: 36px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &::before {
        content: none;
      }
      &::after {
        content: none;
      }
    }
  }
</style>
