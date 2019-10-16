<template lang='pug'>
	.contain
		.header.clearfix
			.float-l.xy
				img.xydetail(src='~assets/image/xy.png' @click="dealxy()")
				img.gou(src='~assets/image/gou.png')
			.float-r
				img.dtgz(src='~assets/image/dtgz.png')
		.detail(style="position:absolute;bottom:20px;border:1px solid gray;width:1340px;height:420px;left:60px;")
			.title.clearfix
				.float-l
					span 第xx期
					span.lefty （ 01-01 晚 9:00 ~ 01-07 晚 9:00 ）
				.float-r
					span 开奖倒计时
					span.lefty 7天23:12:12
			.content.clearfix
				.item
					.prize
						span 
							| 一等奖
							span.num 5000
							| 元
					.person
						span 5人
				.item
					.prize
						span 
							| 二等奖
							span.num 1000
							| 元
					.person
						span 10人
				.item
					.prize
						span 
							| 三等奖
							span.num 500
							| 元
					.person
						span 50人
				.item(style="margin-right:0;")
					.prize
						span 
							| 四等奖
							span.num 300
							| 元
					.person
						span 500人
			.bottombox.clearfix
				.btnleft
					.btn.float-r
						span 第1期名单
				.center
					.detailbox
						div
							.float-l(style="width:240px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;")
								span 玩家：名称六个字哦
							.float-l(style="width:220px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;")
								span 奖券：123456
							.float-l(style="width:80px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;")
								span 一等奖
						div
							.float-l(style="width:240px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;")
								span 玩家：名称六个字哦
							.float-l(style="width:220px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;")
								span 奖券：123456
							.float-l(style="width:80px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;")
								span 一等奖
						div
							.float-l(style="width:240px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;")
								span 玩家：名称六个字哦
							.float-l(style="width:220px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;")
								span 奖券：123456
							.float-l(style="width:80px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;")
								span 一等奖
				.btnright
					.btn
						span 我的夺宝券
</template>
<script>
  export default {
    name: 'nowd',
    data () {
      return {
        agree: true
      }
    },
    created () {
    },
    methods: {
      dealxy () {
        this.agree = !this.agree
      }
    }
  }
</script>
<style lang='less'>
  .contain {
  	position: relative;
  	width:1468px;
  	height:968px;
  	background:url('~assets/image/penl2.png');
    background-size: 100% 100%;
  	& .float-l {
  		float: left;
  	}
  	& .float-r {
  		float: right;
  	}
  	& .header {
  	  height: 90px;
  	  & .xy {
  	  	position: relative;
  	  	font-size: 0;
  	  	& .xydetail {
  	  	  margin: 30px 0 0 30px;
  	  	}
  	  	& .gou {
  	  	  position: absolute;
  	  	  z-index: 2;
  	  	  top: 30px;
  	  	  left: 30px;
  	  	}
  	  }
  	  & .dtgz {
  	  	margin: 30px 30px 0 0;
  	  }
  	}
  	& .detail {
  		position:absolute;
  		bottom:20px;
  		border:1px solid gray;
  		width:1340px;
  		height:420px;
  		left:60px;
  		& .title {
  			font-size:26px;
  			color: #faf3b8;
			& .lefty {
				margin-left: 26px;
			}
  		}
  		& .content {
  			height: 230px;
  			width:100%;
  			margin-top: 10px;
  			& .item {
  				float:left;
  				width:24%;
  				height:230px;
  				margin-right: 1.3%;
  				background: url('~assets/image/hbao.png');
    			background-size: 100% 100%;
    			& .prize {
    				text-align: center;
					font-size:36px;
					color: #775315;
					font-weight: bold;
					& .num {
						color: #f12400;
					}
    			}
    			&  .person {
    			   margin-top: 50px;
                   text-align: center;
                   font-size: 36px;
                   font-weight: 600;
    			   background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#fbfbfb), to(#f7de92));
			       -webkit-background-clip: text;
			       -webkit-text-fill-color: transparent;
    			}
  			}
  		}
  		&  .bottombox {
  			&  .btnleft, &  .btnright {
  				width: 25%;
  				float: left;
  				text-align: center;
  				&  .btn {
  					width:292px;
  					height:100px;
  					background: url('~assets/image/tybtn.png');
  					background-size: 100% 100%;
  					margin:20px 10px;
  					color: white;
  					&  span {
  						font-size: 36px;
  						color: #ffffff;
						line-height:80px;
						text-align: center;
						letter-spacing: .2em;
						text-shadow:#a2410a 3px 0 0,#a2410a 0 3px 0,#a2410a -3px 0 0,#a2410a 0 -3px 0;
						-webkit-text-shadow:#a2410a 3px 0 0,#a2410a 0 3px 0,#a2410a -3px 0 0,#a2410a 0 -3px 0;
						-moz-text-shadow:#a2410a 3px 0 0,#a2410a 0 3px 0,#a2410a -3px 0 0,#a2410a 0 -3px 0;
  					}
  				}
  			}
   			&  .center {
  				width: 50%;
  				height:120px;
   				float: left;
   				background: url('~assets/image/gdlun.png');
				background-size: 100% 110%;
				padding: 20px 60px;
				line-height:1.2;
				& .detailbox {
					font-size:24px;
					color:#c3c3c3;
				}
  			}
  		}
  	}
  }
</style>
