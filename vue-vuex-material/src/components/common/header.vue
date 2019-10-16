<template lang="pug">
  //- App头部
  mdb-navbar.top-nav-collapse.blue-gradient(position="top" dark color="primary" scrolling style='display:flex;')
    mdb-navbar-brand(href="#") 陪我抽奖后台管理
    mdb-navbar-toggler
      mdb-navbar-nav
        mdb-icon(icon="bars" size="2x" @click.native="handleBtnAClick" color="white")
      mdb-navbar-nav(right)
        mdb-nav-item(waves-fixed) 
          mdb-avatar(class="mx-auto white")
            img(src="~assets/imgs/140_tx.png" class="rounded-circle img-fluid" style='width:35px;height:auto;')
          span {{username}}
        mdb-nav-item(waves-fixed @click.native='mfunc' style='line-height:2;')
          span 修改密码
          el-popover(placement="bottom" width="380" trigger="click" v-model='chanpass')
            div(style='padding:10px 20px;' name='reference'  v-loading="loading")
              .rowli.clearfix
                span.setpassl 密码
                mdb-input.setipt(size='small' v-model='pass' type='password')
              .rowli.clearfix
                span.setpassl 确认密码
                mdb-input.setipt(size='small' v-model='passagin' type='password')
              .rowli(style='text-align:right;padding-right:15px;')
                mdb-btn(type='primary' size='small' @click='chanpass = false') 取消
                mdb-btn(type='primary' size='small' @click='chanpassfunc') 确定
        mdb-nav-item(waves-fixed @click.native="loginout" style='line-height:2;') 注销
</template>
<script>
  import localservice from '@/services/storage'
  import CommonService from '@/services/common'
  export default {
    name: 'zHeader',
    data() {
      return {
        chanpass: false,
        loading: false,
        pass: '',
        passagin: ''
      }
    },
    props: {
      username: {
        type: String,
        default: 'admin'
      },
      type: {
        type: String,
        default: '1'
      },
      logintime: {
        type: Number
      }
    },
    created() {
    },
    methods: {
      chanpassfunc () {
        var time = new Date().getTime()
        console.log(time - this.logintime)
        if (this.logintime && time - this.logintime >= 60 * 1000 * 15) {
          this.message('修改密码需要重新登录', false)
          this.loginout()
          return
        }
        // 修改密码
        var str = ''
        if (!this.pass) str = '密码不能为空!'
        else if (!this.passagin) str = '确认密码不能为空!'
        else if (this.pass !== this.passagin) str = '两次密码不一致请重新输入'
        console.log(str)
        if (str) return this.message(str, false)
        var temp = {
          name: this.username,
          pass: this.pass
        }
        this.loading = true
        CommonService.changePass(temp).then(res => {
          this.loading = false
          if (res.status === 200 && res.data && !res.data.errcode) {
            this.message('密码修改成功！', true)
            this.chanpass = false
            this.pass = ''
            this.passagin = ''
            var that = this
            setTimeout(function () {
              that.loginout()
            }, 1000)
          } else {
            this.message('密码修改失败，请稍后重试！', false)
          }
        })
      },
      mfunc () {
        this.$notify.info({
          title: '提示',
          message: '暂不支持修改密码，请联系相关人员！',
          duration: 1000,
          iconClass: 'el-icon-success'
        })
      },
      loginout() {
        console.log('233')
        this.$store.commit('loginchange', '')
        // location.href = '/login'
        localservice.remove('userinfo')
        // location.href = 'http://www.9diangame.com:3101/login?#/login'
        this.$router.push({name: 'login'})
      },
      message (str, boolen) {
        if (boolen) {
          this.$notify.success({
            title: '成功',
            message: str,
            duration: 1000,
            iconClass: 'el-icon-success'
          })
        } else {
          this.$notify.error({
            title: '失败',
            message: str,
            duration: 1000,
            iconClass: 'el-icon-error'
          })
        }
      }
    }
  }
</script>
<style scoped>
  .navbar {
    margin-top: 0;
  }
  .app-header {
    position:fixed;
    z-index:477;
    width:100%;
    display: flex;
    justify-content: space-between;
    height: 100%;
    height: 60px;
    padding: 16px 40px 16px 30px;
    /*background: #606266 url(~assets/imgs/yuyu.jpeg) no-repeat 20px 5px;*/
    background-size: 48px 48px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.97)
  }
  .app-title {
    color: #FFFFFF;
    font-size: 20px;
    font-weight: 500;
    padding-left: 48px;
    line-height: 28px;
  }
  .rowli {
    margin-bottom:5px;
  }
  .setpassl {
    display:inline-block;
    height:40px;
    line-height:40px;
    font-weight: 600;
    width:100px;
  }
  .setipt {
    width:200px;
  }
  .control-panel {
    display: flex;
    &>li {
      color: #FFFFFF;
      cursor: pointer;
      line-height: 28px;
    }
    &>li:not(:last-child) {
      margin-right: 40px;
    }
    /*选中样式*/
    &>li.current {
      font-size: 18px;
      font-weight: 500;
    }
    & img {
      margin-right: 10px;
      vertical-align: middle;
    }
  }
</style>
