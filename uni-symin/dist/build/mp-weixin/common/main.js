(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"034f":function(o,e,n){"use strict";var t=n("9938"),a=n.n(t);a.a},"3dfd":function(o,e,n){"use strict";n.r(e);var t,a,l=n("3e72"),c=l["a"],i=(n("034f"),n("2877")),d=Object(i["a"])(c,t,a,!1,null,null,null);e["default"]=d.exports},"3e72":function(o,e,n){"use strict";(function(o){var t=n("66fd"),a=n("82f8"),l=n.n(a),c=n("8212"),i=n.n(c),d=n("88d3"),s=n.n(d);e["a"]=t["default"].extend({mpType:"app",globalData:{code:"",openid:"",token:""},onLaunch(){console.log("App Launch");let e=this.$options;i.a.attachInfo(),i.a.getCode().then(n=>{return n?(e.globalData.code=n,new Promise((o,e)=>{o(n),console.log(n)})):(o.showToast({title:"用户登录失败，请重新获取登录！",icon:"none"}),new Promise((o,e)=>{e(0)}))}).then(n=>{l.a.uerLogin({code:n}).then(o=>{let n=o.data;1e4===n.code?(e.globalData.token=n.token,e.globalData.uid=n.uid,s.a.setItem("token",e.globalData.token)):99999===n.code&&(e.globalData.openid=n.openid,s.a.setItem("openid",e.globalData.openid))}).catch(e=>{o.showToast({title:e,icon:"none"})})})},onShow(){console.log("App Show")},onHide(){console.log("App Hide")}})}).call(this,n("543d")["default"])},9938:function(o,e,n){}},[["cd49","common/runtime","common/vendor"]]]);