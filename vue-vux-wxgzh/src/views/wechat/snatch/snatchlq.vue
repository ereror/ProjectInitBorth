<template lang="pug">
	.containlq
		.iheader
			.iheaderlq
				.itemcontent(:style="{width: calc()}" id="contentbox")
					div.item(v-for="(item, index) in prizelist", :class="{'itemnow': prizenow === index + 1}")
						div.title 第{{item.sectionid}}期
						div.prize(v-show='item.rank') {{prizes[item.rank]}} {{item.pointscore}}
						div.prize(v-show='!item.rank') 等待开奖
		.contentlq
			.waitPrize(v-show='!prizelist[prizenow - 1].rank')
				.prizemes
					span 等待开奖……
			.waitMess(v-show='!prizelist[prizenow - 1].rank')
				.lqquan 
					span 夺宝券编号:
					span {{prizelist[prizenow - 1].prizenewno}}
				.lqtime
					span {{prizelist[prizenow - 1].opentime | getTimeFormat}}
			.waitIsPrize.clearfix(v-show='prizelist[prizenow - 1].rank')
				.headerIs.fl
					.lqtitleIs
						span {{prizes[prizelist[prizenow - 1].rank]}} {{prizelist[prizenow - 1].pointscore}}元
				.fl.headerDetail
					div.dbq 夺宝券编号：{{prizelist[prizenow - 1].prizenewno}}
					div.dbjf 额外获得{{prizelist[prizenow - 1].totolsharescore || 0}}积分
					div.dbyhjf
						span 已收货{{prizelist[prizenow - 1].newdownnum || 0}}个下级会员
						span.fr 查看
			.waitDianz
				ul.clearfix
					li(v-for='item in 5', :class="{'libg': item <= prizelist[prizenow - 1].sharetime}")
				.detailmsg
					span 再收集{{(5 - prizelist[prizenow - 1].sharetime) || 0}}个赞，就能领取奖品哦！
			.detailbtn
				.btn.leftbtn(@click="shareFriend()") 分享给朋友集赞
				.btn 完成集赞，领取奖品
			.waitContent
				img(src='~assets/image/snatch/ljgz.png')
</template>
<script>
  import slider from 'vue-concise-slider'
  import activityService from '@/service/activity'
  import { wxconfig } from '../../../../config/app'
  var querystring = require('querystring')
  export default {
    name: 'snatchlq',
    components: {
      slider
    },
    data () {
      return {
        itemlist: 0,
        prizenow: 1,
        prizes: ['特等奖', '一等奖', '二等奖', '三等奖', '四等奖', '五等奖', '六等奖', '幸运奖'],
        prizelist: [{
          rank: 1,
          prize: 1000,
          desc: '一等奖'
        }, {
          rank: 2,
          prize: 500,
          desc: '一等奖'
        }, {
          rank: 3,
          prize: 500,
          desc: '一等奖'
        }, {
          rank: 4,
          prize: 500,
          desc: '一等奖'
        }, {
          rank: 5,
          prize: 500,
          desc: '一等奖'
        }, {
          rank: 6,
          prize: 500,
          desc: '一等奖'
        }, {
          rank: 7,
          prize: 500,
          desc: '一等奖'
        }, {
          rank: 8,
          prize: 500,
          desc: '一等奖'
        }]
      }
    },
    created () {
    },
    mounted () {
      this.getSection()
    },
    methods: {
      shareFriend () {
        var param = {
          appid: wxconfig.appid,
          redirect_uri: 'http://www.' + wxconfig.domain + '.com/#/snatch/shareapp?userid=305521&sectionid=' + this.prizelist[this.prizenow - 1].sectionid + '&prizeno=' + this.prizelist[this.prizenow - 1].prizeno,
          response_type: 'code',
          scope: 'snsapi_userinfo',
          state: '1'
        }
        var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?' + querystring.stringify(param) + '#wechat_redirect'
        var title = '中了！！仲文 中了 ' + this.prizelist[this.prizenow - 1].baseprize + ' 元！！'
        var desc = '仲文在九点麻将中了' + this.prizelist[this.prizenow - 1].baseprize + '元，帮他点个赞吧！'
        function onBridgeReady () {
          var temp = {
            appid: 'wx6a4658a3d166e6c8',
            img_url: 'http://www.' + wxconfig.domain + '.com/static/xueliu.png',
            img_width: 200,
            img_height: 200,
            link: url,
            desc: desc,
            title: title
          }
          var WeixinJSBridge = WeixinJSBridge || window.WeixinJSBridge
          WeixinJSBridge.invoke('sendAppMessage', temp, function (res) {
          })
        }
        if (typeof WeixinJSBridge === 'undefined') {
          if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
          } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
          }
        } else {
          onBridgeReady()
        }
      },
      getSection () {
        this.$vux.loading.show()
        var param = {userid: '305521'}
        activityService.getMyPrizeList(param).then(res => {
          this.$vux.loading.hide()
          if (res.status === 200 && res.data && !res.data.errcode) {
            this.prizelist = res.data.list
            this.prizelist.map(v => {
              var prizeno = v.sectionid * 10000 + v.prizeno + ''
              if (prizeno.length < 6) prizeno = '0' + prizeno
              v.prizenewno = prizeno
            })
            if (this.prizelist.length) {
              this.itemlist = this.prizelist.length
              this.addEventScroll()
            } else {
              this.$vux.alert.show({
                title: '提示',
                content: '当前没有夺宝券'
              })
            }
          }
        })
      },
      calc () {
        var result = 100
        if (this.itemlist >= 5) result = this.itemlist * 20
        return result + '%'
      },
      addEventScroll () {
        if (this.itemlist > 5) {
          var mouseDownX
          var destance = 40
          var maxlist = 40
          var minlist = (1 - this.itemlist) * 20 + 40
          var obj = document.getElementById('contentbox')
          var that = this
          obj.addEventListener('touchstart', function (e) {
            mouseDownX = e.touches[0].pageX
            that.moveInDoc(obj, function (e) {
              var mouseMoveX = e.touches[0].pageX
              if (mouseMoveX - mouseDownX > 0 && destance < 40 && destance >= minlist) destance += 2
              if (mouseMoveX - mouseDownX < 0 && destance <= 40 && destance > minlist) destance -= 2
              that.calcNowItem(destance)
              if (Math.abs(destance) < maxlist && destance > 0 || Math.abs(destance) <= Math.abs(minlist) && destance < 0) obj.style.marginLeft = destance + '%'
            })
            if (e.cancelable) {
              // 判断默认行为是否已经被禁用
              if (!e.defaultPrevented) {
                e.preventDefault()
              }
            }
          }, { passive: false })
        }
      },
      moveInDoc (doc, callBack) {
        doc = doc || document
        doc.addEventListener('touchmove', callBack, { passive: false })
        doc.addEventListener('touchend', stopMove, { passive: false })
        function stopMove () {
          doc.removeEventListener('touchmove', callBack, { passive: false })
          doc.removeEventListener('touchend', stopMove, { passive: false })
        }
      },
      calcNowItem (distan) {
        if (distan >= 30 && distan <= 40) this.prizenow = 1
        else if (distan < 30) {
          this.prizenow = Math.floor((distan - 10) / (-20) + 3)
        }
        console.log(this.prizenow)
      }
    },
    filters: {
      getTimeFormat (time) {
        if (!time || !new Date(time).getTime()) return time
        var nowtime = new Date(new Date(time).getTime())
        var year = nowtime.getFullYear()
        var mouth = nowtime.getMonth() + 1 < 10 ? ('0' + (nowtime.getMonth() + 1)) : (nowtime.getMonth() + 1)
        var day = nowtime.getDate() < 10 ? ('0' + (nowtime.getDate() + 1)) : (nowtime.getDate() + 1)
        var hours = nowtime.getHours() > 12 ? ('晚' + (nowtime.getHours() - 12)) : ('早' + nowtime.getHours())
        return year + '-' + mouth + '-' + day + ' ' + hours + '点 '
      }
    }
  }
</script>
<style lang='less' scoped>
    body {
    	height: 100%;
    	overflow: hidden;
    	background:black;
    }
	.containlq {
		height: 100%;
		padding: 20px;
		background: black;
		&  .iheader {
            height: 1.5rem;
            width: 100%;
            background: #c32534;
            border-radius:5px;
            overflow: hidden;
            &  .iheaderlq {
            	height: 100%;
            	width: 100%;
            	overflow: hidden;
            }
            &  .itemcontent {
            	height: 1.6rem;
            	overflow: auto;
            	display: flex;
            	min-width:100%;
            	transition: all .5s;
            	margin-left: 40%;
            	overflow-y: hidden;
            	&  .item {
            		width: 20%;
            		&  .title {
            			font-size: .4rem;
            			font-weight:bold;
            			color: #cacaca;
            			align:center;
            			display: flex;
            			align-items:center;
            			justify-content: center;
            			margin-top:.2rem;
            		}
            		&  .prize {
            			font-size: .3rem;
            			font-weight:bolder;
            			color: #cacaca;
            			align:center;
            			display: flex;
            			align-items:center;
            			justify-content: center;
            		}
            	}
            	&  .itemnow {
            		&  .title {color: yellow;font-size: .5rem;margin-top: 0;}
            		&  .prize {color: yellow;font-size: .3rem;}
            	}
            }
		}
		&  .contentlq {
			position: relative;
			background: #c32534;
			margin-top: .8rem;
            border-radius:5px;
			padding-bottom: .5rem;
            padding-top: .1rem;
			&:before {
    			position: absolute;
    			content: '';
    			height: .6rem;
    			width: .6rem;
    			background: #c32534;
    			z-index: 2;
    			top: -.3rem;
    			-webkit-transform: rotate(90deg);
    			transform: rotate(45deg);
    			margin-left: -.3rem;
			}
			&  .waitPrize {
				position:relative;
				width: 2.5rem;
				height: 2.5rem;
				margin: 0 auto;
				margin-top: .4rem;
				background: url('~assets/image/snatch/hbao.png');
				background-size: 100% 100%;
				&  .prizemes {
					height: .6rem;
					position: absolute;
					bottom: 0;
					width: 100%;
					text-align: center;
					line-height: .6rem;
					font-weight: 600;
					font-size: .36rem;
				}
			}
			&  .waitMess {
				height: 1rem;
				width: 4rem;
				margin: 0 auto;
				margin-top: .2rem;
				&  .lqquan {
					font-size: .4rem;
					font-weight: 600;
					color: yellow;
					line-height: 1;
				}
				&  .lqtitle {
					font-weight: 600;
					color: white;
					padding-top: .2rem;
					font-size: .4rem;
				}
				&  .lqtime {
					font-weight: 600;
					color: white;
					font-size: .4rem;
				}
			}
			&  .waitContent {
				margin: 10px;
				/* color: #bdb431; */
				/* width: 100%; */
				/* height: 4rem; */
				background-color: bisque;
				padding: 10px;
				border-radius: 5px;
				margin-top: 15px;
				box-shadow: 0 0 20px black;
			}
			&  .waitIsPrize {
				height:2.5rem;
				margin:10px;
				border:5px;
				background:#a31523;
				padding:0.2rem;
				&  .headerIs {
					position:relative;
					height:2rem;
					width:2.2rem;
					background:url('~assets/image/snatch/hbao.png');
					background-size:100% 100%;
					&  .lqtitleIs {
						position: absolute;
						bottom: 0;
						height: .3rem;
						line-height:.2rem;
						font-weight: bolder;
						font-size:.3rem;
						left: .1rem;
					}
				}
				&  .headerDetail {
					margin-left:1rem;
					&  .dbq {color:yellow;font-size:.4rem;font-weight:600;text-align:left;}
					&  .dbjf {color:white;font-size:.3rem;margin-top:.5rem;text-align:left;}
					&  .dbyhjf {color:white;font-size:.3rem;text-align:left;}
				}
			}
			&  .waitDianz {
				height:2rem;width:100%;position: relative;
				&  ul {
					position: absolute;width:100%; height:1.5rem; padding:0 .8rem;
					& li {float:left;width:1.2rem;height:1.2rem;background:url('~assets/image/snatch/isGoodn.png');background-size:100% 100%;margin-left:.2rem;}
					& li.libg {background:url('~assets/image/snatch/isGoody.png');background-size:100% 100%;}
				}
				&  .detailmsg {position: absolute;bottom: .1rem;text-align: center;color: #fbfb00;width: 100%;font-size: .3rem;}
			}
			&  .detailbtn{
				padding-top: .2rem;
				& .btn {
					display: inline-block;
					width: 4rem;
					height: .8rem;
					background: gray;
					border-radius: 50px;
					line-height: .8rem;
					padding: 0 .2rem;
					font-size: .3rem;
    				font-weight: bold;
    				color: white;
				}
				&  .leftbtn {
					margin-right: 0.2rem;
    				background: orange;
				}
			}
		}
	}
</style>
