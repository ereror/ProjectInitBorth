<template>
  <div class="wrap">
    <zHeader>
    <div class="MN-01">
      <img src="~@/assets/image/in-1.png" alt="">
      <a class="btn" @click="gotoDownload">免费下载</a>
    </div>  
      
    <div class="MN-02">
      <div class="MN-02-z center">
        <h1>熟人约局</h1>
        <p class="pp1">微信一键登录，随时随地和小伙伴一起过瘾的血战</p>
        <p class="pp2"></p>
        <p class="pp3"><a href="#"><img src="~@/assets/image/in-2.png" alt=""></a></p>
      </div>
    </div>  
      
    <div class="MN-03">
      <div class="MN-03-z center">
        <h1>熟人约局</h1>
        <p class="pp1">微信一键登录，随时随地和小伙伴一起过瘾的血战</p>
        <p class="pp2"></p>
        <div class="div1">
          <div class="div1-l"><a href="#"><img src="~@/assets/image/in-3.png" alt=""></a></div>
          <div class="div1-r">
            <p><a href="#">血战到底</a></p>
            <p><a href="#">缺一门</a></p>
            <p><a href="#">刮风下雨</a></p>
            <p><a href="#">流局查大叫</a></p>
          </div>
        </div>
      </div>
    </div>    
      
    <div class="MN-04">
      <img src="~@/assets/image/in-5.png" alt="">
      <h1>请根据操作系统选择需要下载的版本</h1>
      <div class="div2">
        <p class="fl"><img src="~@/assets/image/in-4.png" alt=""></p>
        <p class="fr"><img src="~@/assets/image/in-4.png" alt=""></p>
      </div>
      <div class="div3">
        <p class="fl ras2">ISO版本下载</p>
        <p class="fr ras2">安卓版本下载</p>
      </div>
    </div>  
      
    <div class="MN-05">
      <div class="MN-05-z center">
        <h1>公司介绍</h1>
        <p>成都复程网络科技有限公司成立于2017年6月，注册资本500万元人民币，办公地点在成都市高新区天府二街复城国际广场。
    公司致力于移动互联网的创新商业模式开拓，规划的第一代产品是融入了社交基因的综合性棋牌游戏平台，目前正在有
    序的进行设计和开发，计划于2017年12月底之前正式上线。公司的研发团队已经组建并合作了两年以上，有多款棋牌游
    戏作品已经上线，团队成员目前有6人，其中核心成员在游戏行业有10年以上的工作经验。</p>
        <router-link to="joinus">加入我们</router-link>
      </div>
    </div>  
    </zHeader>   
  </div>
</template>

<script>
export default {
  name: 'index',
  methods: {
    gotoDownload () {
      var time
      var count = 0
      time = setInterval(function () {
        if (count >= 1000) clearInterval(time)
        document.body.scrollTop += count
        count += 60
      }, 80)
    }
  }
}
</script>

<style lang="less">
  @import '../../assets/css/index.less';
</style>
