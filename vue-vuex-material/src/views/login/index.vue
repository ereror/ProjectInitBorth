<template>
  <div style="padding:0" class='loginbox'>
          <nav class="navbar navbar-expand-lg navbar-dark fixed-top scrolling-navbar">
            <div class="container">
              <a class="navbar-brand" href="#">
                <strong>PWC</strong>
              </a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-7" aria-controls="navbarSupportedContent-7" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent-7">
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item active">
                    <a class="nav-link" href="#">Home
                      <span class="sr-only">(current)</span>
                    </a>
                  </li>
                </ul>
                <form class="form-inline">
                  <div class="md-form my-0">
                    <mdb-input type="text" placeholder="更多惊喜" aria-label="Search" />
                  </div>
                </form>
              </div>
            </div>
          </nav>
          <!-- Navbar -->
          <!-- Full Page Intro -->
          <div class="view viewbg" style="background-repeat: no-repeat; background-size: cover; background-position: center center;">
            <!-- Mask & flexbox options-->
            <div class="mask rgba-gradient align-items-center" style='display:flex;'>
              <!-- Content -->
              <div class="container">
                <!--Grid row-->
                <div class="row mt-5 align-items-center" style='display:flex;'>
                  <!--Grid column-->
                  <div class="col-md-6 mb-5 mt-md-0 mt-5 white-text text-center text-md-left">
                    <h1 class="h1-responsive font-weight-bold wow animated fadeInLeft" data-wow-delay="0.5s">陪我抽奖，多多多! </h1>
                    <hr class="hr-light wow animated fadeInLeft" data-wow-delay="0.3s">
                    <h6 class="mb-3 wow animated fadeInDown" data-wow-delay="0.3s">
                      <span>'巧者劳'</span>
                      <br/>
                      <span>'智者忧'</span>
                      <br/>
                      <span>'唯无能者无所求'</span>
                    </h6>
                    <a class="btn btn-outline-white wow hover animated fadeInLeft" data-wow-delay="0.3s">了解更多</a>
                  </div>
                  <!--Grid column-->
                  <!--Grid column-->
                  <div class="col-md-6 col-xl-5 mb-4">
                    <!--Form-->
                    <section class="form-dark animated fadeInRight">
                      <mdb-row>
                        <mdb-col md="12">
                          <mdb-card class="card-image" :style="{'backgroundImage': 'url(https://mdbootstrap.com/img/Photos/Others/pricing-table7.jpg)', 'width': '28rem', 'background-size': 'cover'}">
                            <div class="text-white rgba-stylish-strong py-5 px-5 z-depth-4">
                              <div class="text-center">
                                <h3 class="white-text mb-5 mt-4 font-weight-bold"><strong>LOGIN</strong> <a class="green-text font-weight-bold"><strong> ON</strong></a></h3>
                              </div>
                              <mdb-input label="用户名" type="text" v-model="form.username" color="white" class='loginipt'/>
                              <mdb-input label="密码" type="password" v-model="form.password" color="white" class='loginipt'/>
                              <mdb-input class="my-5" type="checkbox" label="接受条款和条件?"/>
                              <mdb-row class="d-flex align-items-center mb-4">
                                <div class="text-center mb-3 col-md-12">
                                  <mdb-btn color="success" rounded type="button" class="btn-block z-depth-1" @click="login">登录</mdb-btn>
                                </div>
                              </mdb-row>
                              <mdb-col md="12">
                                <p class="font-small white-text d-flex justify-content-end">Have an account? <a href="#" class="green-text ml-1 font-weight-bold"> Sign up</a></p>
                              </mdb-col>
                            </div>
                          </mdb-card>
                        </mdb-col>
                      </mdb-row>
                    </section>
                    <!--/.Form-->
                  </div>
                  <!--Grid column-->
                </div>
                <!--Grid row-->
              </div>
              <!-- Content -->
            </div>
            <!-- Mask & flexbox options-->
          </div>
          <!-- Full Page Intro -->
        </header>
        <!-- Main navigation -->
        <!--Main Layout-->
    </div>
</template>
<script>
  import localservice from '@/services/storage'
  import common from '@/services/common'
  export default {
    name: 'login',
    data() {
      return {
        errorTime: 0,
        isdev: false,
        form: {
          username: '',
          password: '',
          verifiCode: ''
        }
      }
    },
    mounted() {
      localservice.remove('userinfo')
    },
    created() {
      localservice.remove('userinfo')
    },
    methods: {
      login() {
        let userdetail = {
          logined: true,
          username: 'admin',
          logintime: new Date().getTime()
        }
        let that = this
        if (this.isdev) {
          this.$store.commit('loginchange', 'yuyu')
          localservice.set('userinfo', JSON.stringify(userdetail))
          this.$router.push({name: 'home'})
          return
        }
        if (this.form.username && this.form.password) {
          let param = {
            name: this.form.username,
            pass: this.form.password
          }
          common.login(param).then(res => {
            if (res.status === 200 && res.data && res.data.code === 404) {
              this.message('密码错误！', false)
              return
            }
            if (res.status === 200 && res.data && res.data.code === 200) {
              let userdetail = {
                token: res.data && res.data.data && res.data.data.token || '',
                level: res.data && res.data.data && res.data.data.level || 2,
                logined: true,
                username: res.data && res.data.data && res.data.data.name || this.form.username,
                logintime: new Date().getTime()
              }
              localservice.set('userinfo', JSON.stringify(userdetail))
              this.$store.commit('loginchange', this.form.username)
              this.message('登录成功！', true)
              setTimeout(() => {
                that.$router.push({name: 'home'})
              }, 500)
            } else {
              this.message('登录失败请稍后重试！', false)
            }
          })
        } else {
          this.message('用户名和密码不能为空！', false)
        }
      },
      // message (str, model) {
      //   let funcname = model ? 'success' : 'error'
      //   this.$notify[funcname]({message: str, position: 'top right', timeOut: 1000})
      // },
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
  .body-container{
    width:100%;
    background:url(~assets/imgs/bg_big.png);
  }
  .cardbg {
    background:url(~assets/imgs/card0.jpg);
    background-size:100% 100%;
  }
  .loginipt {
    color:white;
    & input {
      color:white !important;
    }
  }
</style>
<style>
  .view {
    height:100%;
    width:100%;
  }
  .loginipt input{
    color:white !important;
  }
  .form-check-input {
    display: none;
  }
  .form-dark .font-small {
    font-size: 0.8rem; 
  }
  .form-dark [type="radio"] + label,
  .form-dark [type="checkbox"] + label {
    font-size: 0.8rem; 
  }
  .form-dark [type="checkbox"] + label:before {
    top: 2px;
    width: 15px;
    height: 15px;
  }

  .form-dark .md-form label {
    color: #fff; 
  }

  .form-dark input[type=text]:focus:not([readonly]) {
    border-bottom: 1px solid #00C851;
    -webkit-box-shadow: 0 1px 0 0 #00C851;
    box-shadow: 0 1px 0 0 #00C851;
  }

  .form-dark input[type=text]:focus:not([readonly]) + label {
    color: #fff;
  }
  .form-dark input[type=password]:focus:not([readonly]) {
    border-bottom: 1px solid #00C851;
    -webkit-box-shadow: 0 1px 0 0 #00C851;
    box-shadow: 0 1px 0 0 #00C851;
  }
  .form-dark input[type=password]:focus:not([readonly]) + label {
    color: #fff;
  }
  @media (max-width: 740px) {
    html,body,header,.view {
      height: 1000px;
    }
  }
  @media (min-width: 800px) and (max-width: 850px) {
    html,body,header,.view {
      height: 650px;
    }
  }
  .top-nav-collapse {
    background-color: #3f51b5 !important;
  }
  .viewbg {
    background-image: url('~assets/imgs/bg2.jpg')
  }
  .loginbox .navbar {
    margin-top: 0;
  }
  .navbar:not(.top-nav-collapse) {
    background: transparent !important;
  }

  @media (max-width: 991px) {
    .navbar:not(.top-nav-collapse) {
      background: #3f51b5 !important;
    }
  }

  .rgba-gradient {
    background: -webkit-linear-gradient(bottom left, rgba(0, 0, 0, 0.7), rgba(72, 15, 144, 0.4) 100%);
    background: -o-linear-gradient(bottom left, rgba(0, 0, 0, 0.7), rgba(72, 15, 144, 0.4) 100%);
    background: linear-gradient(to top right, rgba(0, 0, 0, 0.7), rgba(72, 15, 144, 0.4) 100%);
  }

  .loginbox .md-form label {
    color: #ffffff;
  }

  h6 {
    line-height: 1.7;
  }
</style>
