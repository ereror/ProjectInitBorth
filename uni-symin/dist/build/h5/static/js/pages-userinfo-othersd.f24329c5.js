(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-userinfo-othersd"],{"36ff":function(t,e,i){"use strict";i.r(e);var n=i("c1a3"),s=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);e["default"]=s.a},"5ce5":function(t,e,i){"use strict";var n=i("88a3"),s=i.n(n);s.a},"6ec8":function(t,e,i){"use strict";i.r(e);var n=i("95e6"),s=i("36ff");for(var o in s)"default"!==o&&function(t){i.d(e,t,function(){return s[t]})}(o);i("5ce5");var a=i("2877"),c=Object(a["a"])(s["default"],n["a"],n["b"],!1,null,"262cc998",null);e["default"]=c.exports},"88a3":function(t,e,i){var n=i("9cc3");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var s=i("4f06").default;s("fae2a64a",n,!0,{sourceMap:!1,shadowMode:!1})},"95e6":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.userInfoDetail.relationship&&!t.userInfoDetail.relationship.bh?[i("custombar",{attrs:{name:"uni-app",barconfig:t.barconfig}}),!t.isvideoRz&&t.tipShow?i("tips",{attrs:{tipContent:t.tipContent,tipStyle:t.tipStyle}},[i("v-uni-text",{staticClass:"iconfont icon-close-circle",on:{click:function(e){e=t.$handleEvent(e),t.tipShow=!1}}})],1):t._e(),i("v-uni-view",{staticClass:"uinfo-d-head"},[i("uswiper",{attrs:{items:t.items,swiperConfig:t.swiperConf}}),1===t.isvideoRz?i("v-uni-view",{staticClass:"I-d-rz"},[t._v("视频已认证")]):t._e()],1),i("v-uni-view",{staticClass:"uinfo-d-user"},[i("v-uni-view",{staticClass:"uinfo-d-user-msg"},[i("v-uni-view",{staticClass:"uinfo-d-user-name-box"},[i("v-uni-view",{staticClass:"uinfo-d-user-name"},[t._v(t._s(t.userInfoDetail.nickname?t.userInfoDetail.nickname:1===t.userInfoDetail.gender?"小哥哥XDGF9878":"小姐姐XDGF9878"))]),i("v-uni-view",{staticClass:"I-d-mark"},[t._v("/")]),i("v-uni-view",{staticClass:"I-d-text"},[t._v(t._s(t.userInfoDetail.age||"28"))]),i("v-uni-view",{staticClass:"I-d-mark"},[t._v("/")]),i("v-uni-view",{staticClass:"I-d-text"},[t._v(t._s(t.userInfoDetail.constellation||"双子座"))]),i("v-uni-view",{staticClass:"I-d-box flex-x-r",on:{click:function(e){e=t.$handleEvent(e),t.showchose=!0}}},[i("v-uni-image",{staticClass:"uinfo-d-user-rz-img-04",attrs:{src:t.d_icon_lh}})],1)],1),i("v-uni-view",{staticClass:"uinfo-d-user-status-box"},[i("v-uni-view",{staticClass:"uinfo-d-user-status-time"},[t._v(t._s(t.userInfoDetail.location&&t.userInfoDetail.location.login_time||""))]),i("v-uni-view",{staticClass:"uinfo-d-user-status-dest flex-x-l"},[i("v-uni-text",[t._v(t._s(t.userInfoDetail.addr||"四川成都 天府广场"))]),t.userInfoDetail.distance>.5?i("v-uni-text",{staticClass:"uinfo-d-user-status-destaddr"},[t._v(t._s(t.userInfoDetail.distance)+"km")]):t._e(),t.userInfoDetail.distance<.5&&1*t.userInfoDetail.distance>=.001?i("v-uni-text",{staticClass:"uinfo-d-user-status-destaddr"},[t._v(t._s(1e3*t.userInfoDetail.distance)+"m")]):t._e(),1*t.userInfoDetail.distance<.001?i("v-uni-text",{staticClass:"uinfo-d-user-status-destaddr"},[t._v("10m内")]):t._e(),t.userInfoDetail.heart_user?i("v-uni-view",{staticClass:"I-d-msgIcon"},[i("v-uni-image",{staticClass:"I-d-msgIcon-img",attrs:{src:t.vHot}})],1):t._e()],1)],1)],1),i("v-uni-view",{class:["uinfo-d-user-rz flex-c",t.isvideoRz?"isrz":"isrzf"]},[t.isvideoRz?i("v-uni-text",{attrs:{"data-url":"/pages/tool/video?type=rz"},on:{click:function(e){e=t.$handleEvent(e),t.checkVideo(e)}}},[t._v("视频已认证点击查看")]):i("v-uni-text",{attrs:{"data-url":"/pages/tool/video?type=nrz","data-key":"video"},on:{click:function(e){e=t.$handleEvent(e),t.sendMsg(e)}}},[t._v("视频未认证 提醒Ta")]),t.isvideoRz?i("v-uni-image",{staticClass:"uinfo-d-user-rz-img uinfo-d-user-rz-img-02",attrs:{src:t.d_icon_ck},on:{click:function(e){e=t.$handleEvent(e),t.checkVideo(e)}}}):t._e(),t.isvideoRz?t._e():i("v-uni-image",{staticClass:"uinfo-d-user-rz-img uinfo-d-user-rz-img-03",attrs:{src:t.d_icon_tx},on:{click:function(e){e=t.$handleEvent(e),t.sendMsg(e)}}})],1)],1),i("v-uni-view",{staticClass:"uinfo-d-box"},[i("iptitem",{attrs:{inputconfig:t.uinfoDetail[0]}}),i("iptitem",{attrs:{inputconfig:t.uinfoDetail[1]}}),i("iptitem",{attrs:{inputconfig:t.uinfoDetail[2]}}),i("iptitem",{attrs:{inputconfig:t.uinfoDetail[3]}}),i("iptitem",{attrs:{inputconfig:t.uinfoDetail[4]}},[t.userInfoDetail.is_wechat_number?i("v-uni-button",{staticClass:"c-btn c-btn-normal uinfo-check-btn",attrs:{"data-key":"wx"},on:{click:function(e){e=t.$handleEvent(e),t.checkDetail(e)}}},[i("v-uni-text",[t._v("点击查看")])],1):t._e(),t.userInfoDetail.is_wechat_number?t._e():i("v-uni-button",{staticClass:"c-btn c-btn-normal uinfo-check-btn",attrs:{"data-key":"wx"},on:{click:function(e){e=t.$handleEvent(e),t.sendMsg(e)}}},[i("v-uni-text",[t._v("提醒Ta认证")])],1)],1),i("iptitem",{attrs:{inputconfig:t.uinfoDetail[5],inputStyle:t.uinfoinputStyle}},[i("v-uni-button",{staticClass:"c-btn c-btn-normal uinfo-check-btn",attrs:{"data-key":"phone"},on:{click:function(e){e=t.$handleEvent(e),t.checkDetail(e)}}},[i("v-uni-text",[t._v("点击查看")])],1)],1)],1),i("v-uni-view",{staticClass:"uinfo-d-btnbox"},[i("v-uni-form",{staticClass:"flex-c",attrs:{"report-submit":!0},on:{submit:function(e){e=t.$handleEvent(e),t.createFormId(e)}}},[i("v-uni-button",{staticClass:"c-btn lg uinfo-d-btn",attrs:{"form-type":"submit",type:"submit"},on:{click:function(e){e=t.$handleEvent(e),t.goYue(e)}}},[t._v("邀 约")]),i("v-uni-button",{staticClass:"c-btn lg uinfo-d-btn2",attrs:{"form-type":"submit",type:"submit","open-type":"share"}},[t._v("分 享")])],1)],1),t.showChoosebox?i("dialogbox",{attrs:{boxconfig:t.boxconfig},on:{surefunc:function(e){e=t.$handleEvent(e),t.surefunc(e)},cancelfunc:function(e){e=t.$handleEvent(e),t.cancelfunc(e)}}}):t._e(),t.showchose?i("v-uni-view",{staticClass:"uinfo-d-box2 flex-c"},[i("v-uni-view",{staticClass:"uinfo-d-box2-detail"},[i("v-uni-view",{staticClass:"uinfo-d-content",attrs:{"data-url":"/pages/tool/adviceback","data-uid":t.userInfoDetail.memberID},on:{click:function(e){e=t.$handleEvent(e),t.goDetail(e)}}},[t._v("匿名举报")]),i("v-uni-view",{staticClass:"uinfo-d-btn-02",on:{click:function(e){e=t.$handleEvent(e),t.showchose=!1}}},[t._v("取消")])],1)],1):t._e()]:t._e()},s=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return s})},"9cc3":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,"uni-page-body[data-v-262cc998]{background:#f9f9fb}.uinfo-d-head[data-v-262cc998]{position:relative;width:%?690?%;border-radius:%?30?%;margin:%?30?% auto 0;overflow:hidden}.uinfo-d-user[data-v-262cc998]{margin:0 auto;width:%?690?%;height:%?284?%;background:#fff;border-radius:0 0 %?30?% %?30?%;padding-bottom:%?10?%}.uinfo-d-user-msg[data-v-262cc998]{background:#fff;height:%?184?%;border-radius:0 0 %?30?% %?30?%;padding-top:%?40?%}.uinfo-d-user-rz[data-v-262cc998]{width:%?630?%;height:%?80?%;line-height:%?48?%;border-radius:%?30?%;margin:0 auto;font-size:%?34?%;padding:%?16?% 0;color:#fff;text-align:center}.uinfo-d-user-rz-img[data-v-262cc998]{height:%?36?%;width:%?38?%;margin-left:%?20?%}.uinfo-d-user-rz-img-02[data-v-262cc998]{width:%?48?%;height:%?36?%}.uinfo-d-user-rz-img-03[data-v-262cc998]{width:%?30?%;height:%?36?%}.uinfo-d-user-rz-img-04[data-v-262cc998]{width:%?48?%;height:%?48?%}.isrz[data-v-262cc998]{background:#09d6a1}.isrzf[data-v-262cc998]{background:#ffb400}.I-d-rz[data-v-262cc998]{position:absolute;top:0;right:0;z-index:23;width:%?152?%;height:%?60?%;line-height:%?60?%;background:#09d6a1;border-radius:0 %?30?% 0 %?30?%;-webkit-box-shadow:%?-2?% %?-2?% 0 %?2?% #93e5d0;box-shadow:%?-2?% %?-2?% 0 %?2?% #93e5d0;font-size:%?28?%;text-align:center;color:#fff}.uinfo-d-user-name-box[data-v-262cc998],.uinfo-d-user-status-box[data-v-262cc998]{padding:0 %?30?%;font-size:%?34?%;font-weight:500;color:#000;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.uinfo-d-user-constellation[data-v-262cc998]{margin-left:%?30?%}.uinfo-d-user-status-box[data-v-262cc998]{margin-top:%?20?%;font-size:%?26?%}.uinfo-d-user-status-dest[data-v-262cc998]{margin-left:%?20?%}.uinfo-d-user-status-destaddr[data-v-262cc998]{margin-left:%?10?%}.uinfo-d-box[data-v-262cc998]{width:%?690?%;border-radius:%?30?%;overflow:hidden;background:#fff;margin:%?40?% auto 0;padding-bottom:%?120?%}.uinfo-d-btnbox[data-v-262cc998]{position:fixed;padding:%?10?% 0;z-index:478;bottom:0;width:100%;background:#f9f9fb}.I-d-mark[data-v-262cc998]{margin:0 %?10?%;font-size:%?26?%;font-weight:600}.I-d-text[data-v-262cc998]{font-size:%?24?%}.I-d-box[data-v-262cc998]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;text-align:right;color:#333}.I-d-sm[data-v-262cc998]{font-size:%?16?%;line-height:%?16?%}.I-d-bg[data-v-262cc998]{font-size:%?24?%\n        /* line-height: 40rpx; */}.uinfo-d-btn[data-v-262cc998]{width:%?540?%;height:%?88?%;border-radius:%?30?%;background:#f81f5e!important;color:#fff}.uinfo-d-btn2[data-v-262cc998]{width:%?130?%;height:%?88?%;border-radius:%?44?%;background-color:#f7f7f7!important;color:#f81f5e;margin-left:%?20?%;padding:0 %?20?%!important}.ui-pop[data-v-262cc998]{position:relative;z-index:9999}.lg[data-v-262cc998]{padding:0 %?40?%;font-size:%?32?%;height:%?88?%}.I-d-msgIcon-img[data-v-262cc998]{width:%?30?%;height:%?30?%;border-radius:%?30?%;margin-left:%?20?%}.uinfo-d-box2[data-v-262cc998]{position:fixed;top:0;right:0;left:0;bottom:0;background:rgba(0,0,0,.2);z-index:998}.uinfo-d-box2-detail[data-v-262cc998]{width:%?540?%;height:%?265?%;border-radius:%?30?%;background:#fff}.uinfo-d-content[data-v-262cc998]{padding:%?22?%;text-align:center;font-size:%?32?%;line-height:%?44?%;border-bottom:%?1?% solid #eee}.uinfo-d-btn-02[data-v-262cc998]{width:%?200?%;height:%?88?%;line-height:%?88?%;margin:%?40?% auto;background:#6267f9;border-radius:%?30?%;font-size:%?32?%;color:#fff;text-align:center}.uinfo-check-btn[data-v-262cc998]{font-size:%?24?%;line-height:%?34?%;border-radius:%?32?%;height:%?60?%;min-width:%?138?%;border-radius:%?30?%;padding:%?13?% %?20?%;background:#f7f7f7!important;color:#f81f5e}body.?%PAGE?%[data-v-262cc998]{background:#f9f9fb}",""])},c1a3:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=c(i("e143")),s=c(i("8212")),o=c(i("6d8e")),a=i("2f62");function c(t){return t&&t.__esModule?t:{default:t}}function r(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),i.push.apply(i,n)}return i}function u(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?r(i,!0).forEach(function(e){f(t,e,i[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):r(i).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))})}return t}function f(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var l=getApp(),d=n.default.extend({data:function(){return{model:1,title:"Hello",STATUS_BAR_HEIGHT:wx.STATUS_BAR_HEIGHT,DEFAULT_HEADER_HEIGHT:wx.DEFAULT_HEADER_HEIGHT,barconfig:{CustomBar:wx.STATUS_BAR_HEIGHT+wx.DEFAULT_HEADER_HEIGHT,StatusBar:wx.STATUS_BAR_HEIGHT,title:"51约",bgset:"bg-gradual-dred",tset:"bg-gradual-tred",hiddenTitle:2,isArrow:2},isvideoRz:0,id:"",tipShow:!0,tipContent:"视频没有认证",tipStyle:{background:"#ffb400",color:"white"},items:[],swiperConf:{interval:5e3,duration:500,autoplay:!0,circular:!0,mode:"aspectFill"},uinfoDetail:[{key:"0",title:"邀约项目",icon:"",content:"希望一起吃饭",arrow:!1,size:40,type:"text",url:"",isBorderR:!1,placeholder:"",isInput:!1,selfconf:!1},{key:"1",title:"身高",icon:"",content:"170cm",arrow:!1,size:40,type:"text",url:"",isBorderR:!1,placeholder:"",isInput:!1,selfconf:!1},{key:"2",title:"职业",icon:"",content:"IT/互联网",arrow:!1,size:40,type:"text",url:"",isBorderR:!1,placeholder:"",isInput:!1,selfconf:!1},{key:"3",title:"年收入",icon:"",content:"20~30w",arrow:!1,size:40,type:"text",url:"",isBorderR:!1,placeholder:"",isInput:!1,selfconf:!1},{key:"4",title:"微信已认证",icon:"",content:"",arrow:!1,size:40,type:"text",url:"",isBorderR:!1,placeholder:"",isInput:!1,selfconf:!0},{key:"5",title:"手机已认证",icon:"",content:"",arrow:!1,size:40,type:"text",url:"",isBorderR:!1,placeholder:"",isInput:!1,selfconf:!0,last:!0}],popmaskStyle:{"background-color":"rgba(0,0,0,.5)"},uinfoinputStyle:{"border-bottom":0},userInfo:{},userInfoDetail:{},selfTypes:[],selfPays:[],isWxrz:0,isSjrz:0,showChoosebox:!1,boxconfig:{key:0,model:1,title:"",content:"",btn:{ok:"确定",okcolor:"d-color-r",cancel:"取消",cancolor:"d-color-b"}},useKeys:5,checkType:"wx",copyStr:"",goVip:!1,isUseKey:0,goRz:!1,showchose:!1,d_icon_sh:"../../static/images/d-icon-sh.png",d_icon_ck:"../../static/images/d-icon-ck.png",d_icon_tx:"../../static/images/d-icon-tx.png",d_icon_lh:"../../static/images/d-icon-lh.png",vHot:"https://sns-cdn.myxianxiaobao.com/sfximao/v-hot.png"}},computed:u({},(0,a.mapGetters)({chatListaccount:"chatListaccount",chatListaccountsession:"chatListaccountsession",thischatList:"thischatList"})),onLoad:function(t){this.id=t.id||"",this.selfTypes=l.globalData.selfTypes,this.selfPays=l.globalData.selfPays,this.id&&this.getOtherInfo(this.id)},onShow:function(){this.userInfo=l.globalData.userInfo,this.locationInfo=l.globalData.locationInfo},onShareAppMessage:function(){var t=1===this.userInfoDetail.gender?"小哥哥":"小姐姐";return{title:"我发现一个有趣的".concat(t,"推荐给你"),path:"/pages/index/index?otherId="+this.userInfoDetail.memberID+"&from=user&id="+this.userInfo.memberID,imageUrl:this.userInfoDetail.header_url,success:function(t){}}},methods:{init:function(){var t=this;this.isWxrz=0,this.isSjrz=0,this.isvideoRz=0,this.userInfoDetail.nickname&&(this.barconfig.title=this.userInfoDetail.nickname),(this.userInfoDetail.video_permit||this.userInfoDetail.video_verfiy)&&(this.isvideoRz=1),0!==this.isvideoRz&&this.userInfo.video_url||(this.tipContent="对方未通过视频认证，谨防酒托，骗子"),this.userInfoDetail.picture=this.userInfoDetail.picture||[],this.userInfoDetail.height=this.userInfoDetail.height||170;var e=this.userInfoDetail.picture.filter(function(t){return t.src=t.value,t.src}),i=this.userInfoDetail.header_url?this.userInfoDetail.header_url:1===this.userInfoDetail.gender?l.globalData.Iitemimg:l.globalData.Iitemimgw,n={src:i};e.unshift(n),this.items=e;var o=this.selfTypes.filter(function(e){return e.value===1*t.userInfoDetail.objective}),a=this.selfPays.filter(function(e){return e.value===1*t.userInfoDetail.revenue});this.uinfoDetail[0].content=o&&o.length&&"希望一起"+o[0].text||"希望一起吃饭",this.uinfoDetail[1].content=this.userInfoDetail.height+"cm",this.uinfoDetail[2].content=this.userInfoDetail.occupation_str||"IT/互联网",this.uinfoDetail[3].content=a&&a.length&&a[0].text||"20-30w",this.userInfoDetail.is_wechat_number||(this.uinfoDetail[4].title="微信未认证"),s.default.isEmpty(this.userInfoDetail.location)||(this.userInfoDetail.addr=this.userInfoDetail.location&&this.userInfoDetail.location.location,this.userInfoDetail.loginTime=s.default.ctDate(this.userInfoDetail.location&&1e3*this.userInfoDetail.location.heartbeat),this.userInfoDetail.distance=s.default.distance(this.locationInfo.latitude,this.locationInfo.longitude,this.userInfoDetail.location.latitude,this.userInfoDetail.location.longitude))},getOtherInfo:function(t){var e=this;s.default.showLoading("加载中..."),o.default.getOtherUser({member_id:t}).then(function(t){s.default.hideAll(),1e4===t.code&&(e.userInfoDetail=t.data,e.userInfoDetail.relationship&&!e.userInfoDetail.relationship.bh?e.init():e.messageFunc("你已被对方拉黑无法再访问Ta",function(){uni.navigateBack()},1e3))})},checkVideo:function(t){var e=this;if(this.goRz=!1,this.goVip=!1,this.isUseKey=0,!this.id)return this.messageFunc("当前视频源出错了~");o.default.getOtherVideo({check_id:this.id}).then(function(t){switch(t.code){case 1e4:uni.navigateTo({url:"/pages/tool/video?url=".concat(t.data,"&from=other&type=rz&header_url=").concat(e.userInfoDetail.header_url,"&memberID=").concat(e.userInfoDetail.memberID,"&nickname=").concat(e.userInfoDetail.nickname)});break;case 99995:e.boxconfigfunc(t.msg,"去认证","取消",!0),e.goRz=!0;break;case 99994:e.boxconfigfunc(t.msg,"好的","",!0);break;default:e.boxconfigfunc(t.msg,"好的","",!0);break}})},checkDetail:function(t){this.goRz=!1,this.goVip=!1,this.isUseKey=0;var e=s.default.getData(t),i=e.key,n="phone"===i?"手机":"微信",o="phone"===i?1:2,a=this.userInfo&&this.userInfo.rest_key_num||this.userInfoDetail&&this.userInfoDetail.my&&this.userInfoDetail.my.rest_key_num||0;return this.checkType=i,1===o&&this.userInfoDetail.phone_permit?this.messageFunc("诶~该用户设置手机不可查看哦~"):2===o&&this.userInfoDetail.phone_permit?this.messageFunc("诶~该用户设置微信不可查看哦~"):1===o&&this.userInfoDetail&&this.userInfoDetail.relationship&&1===this.userInfoDetail.relationship.phone_status?(this.isUseKey=1,void this.checkPhoneOrWechat()):2===o&&this.userInfoDetail&&this.userInfoDetail.relationship&&1===this.userInfoDetail.relationship.wechat_status?(this.isUseKey=2,void this.checkPhoneOrWechat()):void(0===this.userInfo.vip_id?(this.boxconfigfunc("查看".concat(n,"需要升级会员"),"升级vip","取消",!0),this.goVip=!0):a<5&&this.userInfo.vip_id<4?(this.boxconfigfunc("查看".concat(n,"需要消耗钥匙").concat(this.useKeys," 您当前剩余钥匙").concat(a," 钥匙不足，需要升级VIP"),"升级vip","取消",!0),this.goVip=!0):this.userInfo.keys<5&&4===this.userInfo.vip_id?this.boxconfigfunc("钥匙已用完，你已经是最高等级VIP, 无法再升级, 明天再来查看Ta的".concat(n,"吧"),"好的","",!0):(this.boxconfigfunc("查看".concat(n,"需要消耗钥匙").concat(this.useKeys," 您当前剩余钥匙").concat(a),"使用","取消",!0),this.isUseKey="phone"===i?1:2))},goUrl:function(t){s.default.goUrl(t)},goYue:function(){if(this.goRz=!1,this.goVip=!1,this.isUseKey=0,this.userInfoDetail&&this.userInfoDetail.relationship&&this.userInfoDetail.relationship.relation)return this.createRelation();var t=this.userInfo&&this.userInfo.rest_key_num||this.userInfoDetail&&this.userInfoDetail.my&&this.userInfoDetail.my.rest_key_num||0;t>=1?(this.boxconfigfunc("您当前剩余钥匙".concat(t),"使用","取消",!0),this.isUseKey=3):t<1&&this.userInfo.vip_id<4?(this.goVip=!0,this.boxconfigfunc("钥匙已用完，升级会员","升级vip","取消",!0)):t<1&&4===this.userInfo.vip_id&&this.boxconfigfunc("钥匙已用完，你已经是最高 等级VIP,无法再升级 请明天再联系Ta吧~","好的","取消",!0)},surefunc:function(t){if(this.copyStr.length)return this.copyFunc(this.copyStr),void(this.copyStr="");if(this.isUseKey)return this.useKey();if(this.goRz){this.goRz=!1;var e="/pages/tool/videorz";return this.userInfo.video_url.length||(e="/pages/regist/stepvideo"),uni.navigateTo({url:e}),void(this.showChoosebox=!1)}if(this.goVip)return this.goVip=!1,uni.navigateTo({url:"/pages/userinfo/vip"}),void(this.showChoosebox=!1);0===this.userInfo.status&&uni.navigateTo({url:"/pages/userinfo/index",success:function(){this.showChoosebox=!1}}),this.showChoosebox=!1},cancelfunc:function(){this.boxconfigfunc()},useKey:function(){1!==this.isUseKey&&2!==this.isUseKey||this.checkPhoneOrWechat(),3===this.isUseKey&&this.createRelation()},createRelation:function(){var t=this;this.goRz=!1,this.goVip=!1,this.isUseKey=0,this.showChoosebox=!1;var e={accept_id:this.userInfoDetail.memberID};o.default.createRelation(e).then(function(e){if(1e4===e.code){t.messageFunc(e.msg),t.$store.dispatch("chatListaccount",t.userInfoDetail.yxID),t.$store.dispatch("chatListaccountsession","p2p"+t.userInfoDetail.yxID),t.RefreshtheDialogue();var i="我报名了你的".concat(t.uinfoDetail[0].content,"（项目）");1!=e.data.key&&(i="");var n="/pages/message/sessiondetails?chattype=".concat("p2p","&account=",t.userInfoDetail.yxID,"&avatar=").concat(t.userInfoDetail.header_url,"&nick=").concat(t.userInfoDetail.nickname,"&session=").concat("p2p"+t.userInfoDetail.yxID,"&uid=").concat(t.userInfoDetail.memberID,"&msg=").concat(i);uni.navigateTo({url:n,success:function(e){l.$vm.getUserInfo(!0).then(function(e){t.userInfo=e})},fail:function(){},complete:function(){}})}else 99992===e.code?(t.goVip=!0,t.boxconfigfunc("此人当前人气过高，升级VIP才可以邀约TA","升级vip","取消",!0)):t.messageFunc(e.msg)})},RefreshtheDialogue:function(){var t=this;wx.NIMFUN.getHistoryMsgs({scene:"p2p",to:this.chatListaccount,limit:20,asc:!0,endTime:0,done:function(e,i){e?uni.showToast({title:"请检查网络后重试",icon:"none",duration:3e3}):(console.log("当前用户：",t.chatListaccount,i.msgs),t.thischatList[t.chatListaccountsession]=i.msgs,t.$store.dispatch("thischatList",t.thischatList))}})},checkPhoneOrWechat:function(){var t=this,e=this.isUseKey;if(this.isCopy=0,1!==e&&2!==e||!this.id)return this.messageFunc("当前用户信息错误~");o.default.checkPhoneOrWechat({check_type:e,check_id:this.id}).then(function(e){if(1e4===e.code){var i=(t.userInfoDetail.nickname||"千年老怪")+"的"+(1===t.isUseKey?"手机号":"微信");t.boxconfigfunc("".concat(e.data),"点击一键复制","",!0,i),t.copyStr=e.data||"",l.$vm.getUserInfo(!0).then(function(e){t.userInfo=e}),t.setUserInfoDetail(1===t.isUseKey?"phone_status":"wechat_status",1)}else t.boxconfigfunc(e.msg,"好的","",!0),t.isUseKey=0}).catch(function(e){t.showChoosebox=!1,t.messageFunc("当前用户信息错误~")})},setUserInfoDetail:function(t,e){this.userInfoDetail.relationship[t]=e},copyFunc:function(t){var e=this,i=1===this.isUseKey?"手机号":"微信";wx.setClipboardData({data:t,success:function(t){e.messageFunc("复制".concat(i,"成功，赶紧去添加Ta吧"))},complete:function(){e.showChoosebox=!1}})},boxconfigfunc:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",n=arguments.length>3&&void 0!==arguments[3]&&arguments[3],s=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"";this.boxconfig.title=s,this.boxconfig.content=t,this.boxconfig.btn.ok=e,this.boxconfig.btn.cancel=i,this.showChoosebox=n},messageFunc:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;wx.showToast({title:t||"当前信息处理错误",duration:1e3,icon:"none",success:function(){setTimeout(function(){e&&e()},i)}})},sendMsg:function(t){var e=this,i=s.default.getData(t),n=i.key,a=1;"wx"===n&&(a=2);var c={notice_id:this.userInfoDetail.memberID,notice_type:a};s.default.showLoading(),o.default.sendNotice(c).then(function(t){s.default.hideAll(),1e4===t.code?e.messageFunc("提醒成功"):e.messageFunc(t.msg)})},relationShip:function(){var t=this,e=this.userInfoDetail.relationship&&!this.userInfoDetail.relationship.h,i={target_id:this.userInfoDetail.memberID,relation_type:1,value:Number(e)};o.default.pullgRelatioasdasn(i).then(function(i){if(1e4===i.code){t.userInfoDetail.relationship.h=!t.userInfoDetail.relationship.h;var n="取消拉黑成功";e&&(n="拉黑成功"),t.messageFunc(n)}else t.messageFunc(i.msg)})},goDetail:function(t){var e=s.default.getData(t),i=e.url,n=e.uid;i&&(uni.navigateTo({url:i+"?uid="+n}),this.showchose=!1)},goBack:function(){uni.navigateBack({})},createFormId:function(t){t.detail.formId&&l.$vm.sendFormId(t.detail.formId)}}});e.default=d}}]);