 <template lang="pug">
  // 文件头
  div
    .header(style='position:relative;')
      .h-z.center
        .h-l
          a
            img(src="~@/assets/image/logo.png")
        .h-r(style='position:absolute;right:400px;top:30px;')
          a
            img(src="~@/assets/image/logo1.png")
        br
        .h-r
          ul
            li(v-for="item in headerlist", :class="(distance === item.distance || distance === 'index' && item.distance === '/') ? 'active': ''")
              a(@click="distance = item.distance;goto()", :destans="item.distance") {{item.value}}
      .h-r(style='position:absolute;z-index:2;top: 30px;right: 20px;' v-show='false')
          a
            img(src="~@/assets/image/logo1.png" height="30px;")
    div
        slot    
    .footer
      .MN-06
        .MN-06-z
          ul
            li(v-for="item in footerlist")
              a(@click="distance = item.distance;goto()" destans="item.distance") {{item.value}}
      .foot.center
        p.yqlj
          span 友情链接：
          a(href="https://www.vipcn.com" target="_blank") 
            | 清风绿色软件下载
          a(href="https://www.hackhome.com" target="_blank") 网侠手机站
          a(href="http://www.downcc.com" target="_blank") 绿色资源网
          a(href="http://www.newasp.net" target="_blank") 星云下载
          a(href="http://www.xpgod.com" target="_blank") 系统天堂
          a(href="http://www.huacolor.com" target="_blank") 华彩软件站
          a(href="http://www.d9soft.com" target="_blank") 第九软件网
          a(href="http://www.greenxf.com" target="_blank") 绿色先锋
        p 
          span
            | Copyright©2016-2017 版权所有 成都复程网络科技有限公司 蜀ICP备 
            a(href='http://www.miitbeian.gov.cn' target="_blank" style='display:inline-block;') 17021434号-3
            |  川网文 （2017）7847-326号
        p 地址：中国（四川）自由贸易试验区成都高新区益州大道中段722号3栋1单元902 电话：028-65772681  公司邮箱fc@twiceway.com
        p 健康游戏公告：抵制不良游戏 拒绝盗版游戏 注意自我保护 谨防上当受骗 适度游戏益脑 沉迷游戏伤身 合理安排时间 享受健康生活
        p 未满18周岁的未成年人用户请在家长的监督下进行游戏

</template>
<script>
  export default {
    name: 'zHeader',
    data () {
      return {
        username: '管理员',
        distance: '',
        headerlist: [{
          distance: '/',
          value: '首页'
        },
        {
          distance: 'companyprof',
          value: '公司介绍'
        },
        {
          distance: 'joinus',
          value: '加入我们'
        },
        {
          distance: 'parentcare',
          value: '家长监护工程'
        }],
        footerlist: [{
          distance: '/',
          value: '游戏介绍'
        },
        {
          distance: 'companyprof',
          value: '关于我们'
        },
        {
          distance: 'joinus',
          value: '加入我们'
        },
        {
          distance: 'parentcare',
          value: '家长监护工程'
        }]
      }
    },
    created () {
      this.distance = this.$router.currentRoute.name
      console.log(this.distance)
    },
    methods: {
      goto () {
        if (this.distance) this.$router.push(this.distance)
      }
    }
  }
</script>
<style scoped lang='less'>
  .h-r ul li a { cursor:pointer; }
  .yqlj {
    display:flex;
    justify-content: center;
    color: #c4c4c4;
    & a {
      color:#c4c4c4;
      margin-left:1em;
      &:hover {
        color:white;
      }
    }
  }
</style>

