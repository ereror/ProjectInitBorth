(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-message-join"],{"2af7":function(t,e,a){var i=a("3d35");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=a("4f06").default;n("1377c017",i,!0,{sourceMap:!1,shadowMode:!1})},"3d35":function(t,e,a){e=t.exports=a("2350")(!1),e.push([t.i,"uni-page-body[data-v-2456f66a]{background:#6267f9;height:100%;overflow:hidden}.j-box[data-v-2456f66a]{padding:%?20?% %?30?% %?40?%}.j-ad[data-v-2456f66a]{width:%?630?%;height:%?592?%;margin:0 auto}.j-lititle[data-v-2456f66a]{text-align:center;font-size:%?32?%;line-height:%?44?%;color:#fff}.j-text-box[data-v-2456f66a]{width:%?340?%;margin:0 auto;padding:%?16?% 0}.j-text[data-v-2456f66a]{text-align:center;font-size:%?24?%;line-height:%?32?%;color:#fff}.j-text-big[data-v-2456f66a]{font-size:%?32?%;border-radius:%?17?%;height:%?34?%;line-height:%?34?%;background:#ffb400;color:#fff;font-weight:600;padding:0 .5em}.j-icon-box[data-v-2456f66a]{padding:%?40?% %?130?% %?30?%}.j-icon-item[data-v-2456f66a]{width:%?94?%}.j-icon[data-v-2456f66a]{width:%?94?%;height:%?94?%}.j-text[data-v-2456f66a]{margin-top:%?16?%;text-align:center;font-size:%?26?%;color:#fff}.j-smtitle[data-v-2456f66a]{font-size:%?24?%;text-decoration:underline;color:#fff;text-align:center}.j-btn[data-v-2456f66a]{margin-top:%?20?%;width:%?690?%;height:%?88?%;border-radius:%?30?%;background:#ffb400!important;font-size:%?32?%;color:#fff;letter-spacing:.1em}body.?%PAGE?%[data-v-2456f66a]{background:#6267f9}",""])},"476f":function(t,e,a){"use strict";a.r(e);var i=a("fd41"),n=a("c436");for(var o in n)"default"!==o&&function(t){a.d(e,t,function(){return n[t]})}(o);a("48ef");var s=a("2877"),c=Object(s["a"])(n["default"],i["a"],i["b"],!1,null,"2456f66a",null);e["default"]=c.exports},"48ef":function(t,e,a){"use strict";var i=a("2af7"),n=a.n(i);n.a},c436:function(t,e,a){"use strict";a.r(e);var i=a("f66b"),n=a.n(i);for(var o in i)"default"!==o&&function(t){a.d(e,t,function(){return i[t]})}(o);e["default"]=n.a},f66b:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=s(a("e143")),n=s(a("8212")),o=s(a("6d8e"));function s(t){return t&&t.__esModule?t:{default:t}}var c=getApp(),r=i.default.extend({data:function(){return{title:"Hello",STATUS_BAR_HEIGHT:wx.STATUS_BAR_HEIGHT,DEFAULT_HEADER_HEIGHT:wx.DEFAULT_HEADER_HEIGHT,barconfig:{CustomBar:wx.STATUS_BAR_HEIGHT+wx.DEFAULT_HEADER_HEIGHT,StatusBar:wx.STATUS_BAR_HEIGHT,title:"立即加入",bgset:"bg-gradual-sfdesc",tset:"bg-gradual-tred",hiddenTitle:2,isArrow:2},jadImg:"https://sns-cdn.myxianxiaobao.com/sfximao/join-ad.png",jicon01:"https://sns-cdn.myxianxiaobao.com/sfximao/join-icon-01.png",jicon02:"https://sns-cdn.myxianxiaobao.com/sfximao/join-icon-02.png",jicon03:"https://sns-cdn.myxianxiaobao.com/sfximao/join-icon-03.png",type:""}},onLoad:function(t){this.type=t.type,this.type&&this.saveUserInfo()},methods:{goUrl:function(t){n.default.goUrl(t)},saveUserInfo:function(){var t=c.globalData.userInfo;c.$vm.saveData(t).then(function(t){uni.$emit("getUserInfo",{msg:"更新用户信息"})})},joinFunc:function(){var t=this,e={pay_from:wx.IS_IOS?1:2,platform:1,app_name:"51y"};o.default.getGateCheck(e).then(function(e){if(1e4===e.code)uni.$emit("getUserInfo",{msg:"更新用户信息"}),uni.reLaunch({url:"/pages/index/index?fromType=vip"});else if(99997===e.code){var a=e.data&&1*e.data.order_id;t.createOrder(a)}else t.messageFunc("加入失败，请重试")})},createOrder:function(t){var e=this;o.default.getGatePay({order_id:t}).then(function(a){if(1e4===a.code){var i=a.data;n.default.pay(i).then(function(a){console.log(a),a?e.messageFunc("加入成功！",function(){uni.$emit("getUserInfo",{msg:"更新用户信息"}),uni.reLaunch({url:"/pages/index/index?fromType=vip"})}):e.messageFunc("支付取消！",function(){o.default.cancle({order_id:t})})}).catch(function(){e.messageFunc("支付取消！",function(){o.default.cancle({order_id:t})})})}else e.messageFunc("生成订单失败，请重试")})},createFormId:function(t){t.detail.formId&&c.$vm.sendFormId(t.detail.formId)},messageFunc:function(t,e){wx.showToast({title:t,duration:1e3,icon:"none",success:function(){e&&e()}})}}});e.default=r},fd41:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return[a("custombar",{attrs:{name:"uni-app",barconfig:t.barconfig}}),a("v-uni-view",{staticClass:"j-box"},[a("v-uni-image",{staticClass:"j-ad",attrs:{src:t.jadImg,mode:"widthFix"}}),a("v-uni-view",{staticClass:"j-lititle"},[t._v("立即加入51约")]),a("v-uni-view",{staticClass:"j-text-box"},[a("v-uni-view",{staticClass:"j-text"},[a("v-uni-text",{staticClass:"j-text-big"},[t._v("23000+")]),a("v-uni-text",[t._v("位经过身份认证")])],1),a("v-uni-view",{staticClass:"j-text"},[a("v-uni-text",[t._v("高素质女性等你加入")])],1),a("v-uni-view",{staticClass:"j-text"},[a("v-uni-text",[t._v("加入51约仅")]),a("v-uni-text",{staticClass:"j-text-big"},[t._v("￥29")])],1)],1),a("v-uni-view",{staticClass:"j-icon-box flex-b"},[a("v-uni-view",{staticClass:"j-icon-item"},[a("v-uni-image",{staticClass:"j-icon",attrs:{src:t.jicon01}}),a("v-uni-view",{staticClass:"j-text"},[t._v("无酒托")])],1),a("v-uni-view",{staticClass:"j-icon-item"},[a("v-uni-image",{staticClass:"j-icon",attrs:{src:t.jicon02}}),a("v-uni-view",{staticClass:"j-text"},[t._v("无诈骗")])],1),a("v-uni-view",{staticClass:"j-icon-item"},[a("v-uni-image",{staticClass:"j-icon",attrs:{src:t.jicon03}}),a("v-uni-view",{staticClass:"j-text"},[t._v("高质量")])],1)],1),a("v-uni-view",{staticClass:"j-smtitle",attrs:{"data-url":"/pages/message/sfdesc"},on:{click:function(e){e=t.$handleEvent(e),t.goUrl(e)}}},[t._v("为什么收会员费")]),a("v-uni-form",{attrs:{"report-submit":!0},on:{submit:function(e){e=t.$handleEvent(e),t.createFormId(e)}}},[a("v-uni-button",{staticClass:"c-btn lg j-btn",attrs:{"form-type":"submit"},on:{click:function(e){e=t.$handleEvent(e),t.joinFunc(e)}}},[t._v("立即加入")])],1)],1)]},n=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return n})}}]);