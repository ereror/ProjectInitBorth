(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tool/adviceback"],{"24f5":function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=s(o("66fd")),n=s(o("db49")),i=s(o("82f8")),u=s(o("6d8e")),c=s(o("8212"));function s(t){return t&&t.__esModule?t:{default:t}}function l(t){return f(t)||d(t)||r()}function r(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function d(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function f(t){if(Array.isArray(t)){for(var e=0,o=new Array(t.length);e<t.length;e++)o[e]=t[e];return o}}var h=a.default.extend({data:function(){return{title:"Hello",STATUS_BAR_HEIGHT:wx.STATUS_BAR_HEIGHT,DEFAULT_HEADER_HEIGHT:wx.DEFAULT_HEADER_HEIGHT,barconfig:{CustomBar:wx.STATUS_BAR_HEIGHT+wx.DEFAULT_HEADER_HEIGHT,StatusBar:wx.STATUS_BAR_HEIGHT,title:"匿名举报",bgset:"bg-gradual-default",tset:"bg-gradual-rblack",hiddenTitle:2,isArrow:1},addImg:"https://sns-cdn.myxianxiaobao.com/sfximao/vip-x.png",showChoosebox:!1,boxconfig:{key:0,model:2,btn:{ok:"确定",okcolor:"d-color-r",cancel:"取消",cancolor:"d-color-b"}},imageList:[],items:[],choseKey:5,adValue:"",id:""}},onLoad:function(t){this.id=t.uid},onShow:function(){this.items=Object.assign(n.default.selfadvice)},methods:{delImg:function(t){var e=c.default.getData(t),o=e.index;this.imageList.splice(o,1)},chooseImg:function(){var t=this;wx.chooseImage({count:3,sourceType:["album","camera"],success:function(e){for(var o=e.tempFiles,a=[],n=function(t){s=new Promise(function(e,a){i.default.upload({filePath:o[t].path}).then(function(o){console.log(o.id," at pages\\tool\\adviceback.vue:105"),o.id?e(o):a(t+1)})}),a.push(s)},u=0;u<o.length;u++){var s;n(u)}c.default.showLoading("上传中"),Promise.all(a).then(function(e){c.default.showSuccess("上传成功");for(var a=0,n=e.length;a<n;a++){var i=e[a];o[a].id=i.id,o[a].path=i.url}t.imageList=[].concat(l(t.imageList),l(o)),c.default.hideAll()}).catch(function(t){if(console.log(t," at pages\\tool\\adviceback.vue:125"),1==o.length)c.default.showFail("图片上传失败");else{var e=t.join(",");c.default.showFail("warn 第"+e+"张图片上传失败",1e3)}c.default.hideAll()})}})},showChooseboxFunc:function(){this.showChoosebox=!0},surefunc:function(t){var e=t.detail,o=e.choseIndex;e.val;this.choseKey=1*o,this.showChoosebox=!1},cancelfunc:function(){this.showChoosebox=!1},setAdvalue:function(t){this.adValue=t.detail.value},saveAdvice:function(e){var o={complaint_id:this.id,content:this.adValue,type:this.items[this.choseKey].text,picture:JSON.stringify(this.imageList)};return this.id?this.adValue?(c.default.showLoading("数据保存中..."),void u.default.addAccusation(o).then(function(e){c.default.hideAll(),1e4===e.code?(c.default.showSuccess("数据保存成功！"),t.navigateBack()):c.default.showSuccess("数据保存失败！")}).catch(function(t){c.default.hideAll()})):c.default.showFail("当前举报内容不能为空"):c.default.showFail("当前用户id不能为空")}}});e.default=h}).call(this,o("6e42")["default"])},8159:function(t,e,o){},ab20:function(t,e,o){"use strict";o.r(e);var a=o("24f5"),n=o.n(a);for(var i in a)"default"!==i&&function(t){o.d(e,t,function(){return a[t]})}(i);e["default"]=n.a},d207:function(t,e,o){"use strict";var a=o("8159"),n=o.n(a);n.a},d6a0:function(t,e,o){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},n=[];o.d(e,"a",function(){return a}),o.d(e,"b",function(){return n})},e59c:function(t,e,o){"use strict";o.r(e);var a=o("d6a0"),n=o("ab20");for(var i in n)"default"!==i&&function(t){o.d(e,t,function(){return n[t]})}(i);o("d207");var u=o("2877"),c=Object(u["a"])(n["default"],a["a"],a["b"],!1,null,null,null);e["default"]=c.exports}},[["4d9f","common/runtime","common/vendor"]]]);