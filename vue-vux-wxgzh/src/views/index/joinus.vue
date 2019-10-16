<template>
  <div class="wrap">
    <zHeader>
      <div class="MM-2">
        <img src="~@/assets/image/gs-1.png" alt="">
        <div class="MM-2-a show">
          <div class="MM-2-a1">
            <a :class="content ==='java' ? 'active' : '' " @click="content = 'java'">JAVA工程师</a>
            <a :class="content ==='c++' ? 'active' : '' " @click="content = 'c++'">C++服务器工程师</a>
          </div>
          <div class="MM-2-a2" v-show="content ==='java'">
            <h3>岗位职责</h3>
            <p>
              1、负责游戏服务器网络、数据库底层开发；<br>
              2、负责游戏服务器游戏逻辑开发；<br>
              3、负责游戏服务器辅助工具开发.
            </p>
            <h3>任职要求</h3>
            <p>
              1、精通c/c++语言特性；<br>
              2、精通vs/gdb等开发工具进行开发，调试；<br>
              3、精通多线程、socket、数据库开发；<br>
              4、熟悉数据结构，对算法有独特见解；<br>
              5、计算机、信息、通信相关专业本科及以上学历；3年以上C++服务器开发经验；<br>
              6、至少熟悉一种以上脚本开发语言；<br>
              7、具备大型游戏服务器端程序开发经验者优先；<br>
              8、 有棋牌类游戏（麻将，斗地主）项目经验更佳。
            </p>
            <a href="#">联系邮箱</a>
            <p>fuchengwangluo@aliyun.com</p>
          </div>
          <div class="MM-2-a2" v-show="content ==='c++'">
              <h3>岗位职责</h3>
              <p>
                1、负责后台系统开发；<br>
                2、负责数据库维护；<br>
                3、负责对策划提出的设计需求的技术可行性进行评估和更正；<br>
                4、负责研究及优化游戏和架构的方法；<br>
                5、负责对游戏上线运营期间产生的各种故障和问题及时解决
              </p>
              <h3>任职要求</h3>
              <p>
                1、统招本科及以上学历，基础扎实，5年以上开发经验；<br>
                2、熟练使用eclipse、tomcat， spring+springmvc+mybatis；<br>
                3、熟练掌握mysql，熟悉复杂sql的处理，有大数据处理经验优先考虑；<br>
                4、熟悉常用的linux命令，了解nginx；<br>
                5、jquery、css、ajax、freemarker、bootstrap；<br>
                6、了解分布式系统的开发，熟悉常用的缓存memcach、redis；<br>
                7、良好的编码分隔，熟悉常用的设计模式，能够独立完成应用系统的开发，具有一定的架构经验。
              </p>
              <a href="#">联系邮箱</a>
              <p>fuchengwangluo@aliyun.com</p>
          </div>
        </div>
      </div>
   </zHeader>
  </div>
</template>

<script>
export default {
  name: 'joinus',
  data () {
    return {
      content: 'java'
    }
  }
}
</script>

<style lang="less">
  @import '../../assets/css/index.less';
</style>
