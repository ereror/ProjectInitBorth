(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-message-visitor"],{"0ac0":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=r(i("e143")),n=r(i("6d8e")),s=r(i("88d3")),o=r(i("8212"));function r(t){return t&&t.__esModule?t:{default:t}}function c(t){return f(t)||d(t)||l()}function l(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function d(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function f(t){if(Array.isArray(t)){for(var e=0,i=new Array(t.length);e<t.length;e++)i[e]=t[e];return i}}var u=getApp(),v=a.default.extend({data:function(){return{title:"Hello",STATUS_BAR_HEIGHT:wx.STATUS_BAR_HEIGHT,DEFAULT_HEADER_HEIGHT:wx.DEFAULT_HEADER_HEIGHT,barconfig:{CustomBar:wx.STATUS_BAR_HEIGHT+wx.DEFAULT_HEADER_HEIGHT,StatusBar:wx.STATUS_BAR_HEIGHT,title:"最近来访",bgset:"bg-gradual-dred",tset:"bg-gradual-tred",hiddenTitle:2,isArrow:2},choseCheck:1,vicon:"https://sns-cdn.myxianxiaobao.com/sfximao/iconH.jpg",Iitemimg:"https://mzw-sns.oss-cn-beijing.aliyuncs.com/images/default/def_avatar_boy.png",Iitemimgw:"https://mzw-sns.oss-cn-beijing.aliyuncs.com/images/default/def_avatar_girl.png",newbar:"https://sns-cdn.myxianxiaobao.com/sfximao/newTag.png",param:{page:1,pagesize:10,current_page:0},paramV:{page:1,pagesize:10},loadConf:{loading:!1,current_page:1,last_page:1,len:0},loadConfV:{loading:!1,current_page:1,last_page:1,len:0},visitorTag:{},visitors:[],visitorsO:[],userInfo:{}}},onLoad:function(){this.getVisit(),this.getByVisit(),this.userInfo=u.globalData.userInfo},onReachBottom:function(){var t=1===this.choseCheck?this.paramV:this.param,e=t.current_page,i=t.last_page;t.page;t.loading||e==i||(t.page=e+1,1===this.choseCheck?this.getByVisit():this.getVisit())},methods:{choseFunc:function(t){this.choseCheck=t},setNewTag:function(){var t=s.default.getItem("visitors");t=t.length?JSON.parse(t):{},this.visitorsO.map(function(e){!t[e.id]&&(new Date).getTime()-new Date(1e3*e.time)<2592e5?(t[e.id]=!1,e.isNew=!0):(e.isNew=!1,t[e.id]||delete t[e.id])}),this.visitorTag=t,s.default.setItem("visitors",t)},getVisit:function(){var t=this,e=this.param;e.page===e.current_page||this.loadConf.loading||(this.loadConf.loading=!0,n.default.getVisitList(e).then(function(e){if(t.loadConf.loading=!1,1e4===e.code){var i=e.data;if(o.default.isEmpty(i))t.visitors=[];else{var a=i.last_page,n=i.current_page,s=i.total,r=i.data;t.loadConf.last_page=t.param.last_page=a||0,t.loadConf.current_page=t.param.current_page=n||0,t.loadConf.len=r&&r.length||0,t.param.total=s||0,t.visitors=[].concat(c(t.visitors),c(r))}}else o.default.showFail("数据获取失败")}))},getByVisit:function(){var t=this,e=this.paramV;e.page===e.current_page||this.loadConfV.loading||(this.loadConf.loading=!0,n.default.getBeVisitList(e).then(function(e){if(t.loadConfV.loading=!1,1e4===e.code){var i=e.data;if(o.default.isEmpty(i))t.visitorsO=[];else{var a=i.last_page,n=i.current_page,s=i.total,r=i.data;t.loadConfV.last_page=t.paramV.last_page=a||0,t.loadConfV.current_page=t.paramV.current_page=n||0,t.loadConfV.len=r&&r.length||0,t.paramV.total=s||0,t.visitorsO=[].concat(c(t.visitorsO),c(r)),t.visitorsO.length&&t.setNewTag()}}else o.default.showFail("数据获取失败")}))},goDetail:function(t){var e=t.currentTarget.dataset,i=e.key,a=e.id,n=e.mid;1===this.choseCheck&&(this.visitorTag[a]=!0,this.visitorsO[i].isNew=!1,this.$set(this.visitorsO,i,this.visitorsO[i]),s.default.setItem("visitors",this.visitorTag)),uni.navigateTo({url:"/pages/userinfo/othersd?id=".concat(n)})}},filters:{timeForm:function(t){var e=new Date(1e3*t),i=[e.getMonth()+1,e.getDate(),e.getHours(),e.getMinutes()],a=i[3]>10?i[3]:"0"+i[3],n=i[0]+"-"+i[1]+"  "+i[2]+":"+a;return n}}});e.default=v},"0f57":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return[i("custombar",{attrs:{name:"uni-app",barconfig:t.barconfig}}),i("v-uni-view",{staticClass:"v-bar-box"},[i("v-uni-view",{class:["v-bar-item",1===t.choseCheck?"v-bar-item-checked":""],on:{click:function(e){e=t.$handleEvent(e),t.choseFunc(1)}}},[t._v("来访者")]),i("v-uni-view",{class:["v-bar-item",2===t.choseCheck?"v-bar-item-checked":""],on:{click:function(e){e=t.$handleEvent(e),t.choseFunc(2)}}},[t._v("我看过的人")])],1),i("v-uni-view",{staticClass:"v-box"},[i("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:1===t.choseCheck,expression:"choseCheck === 1"}],staticClass:"v-item-box"},t._l(t.visitorsO,function(e,a){return i("v-uni-view",{key:e.id,staticClass:"v-item",attrs:{"data-key":a,"data-mid":e.memberID,"data-id":e.id},on:{click:function(e){e=t.$handleEvent(e),t.goDetail(e)}}},[i("v-uni-image",{staticClass:"v-icon",attrs:{src:e.header_url,mode:"aspectFill"}}),i("v-uni-view",{staticClass:"v-content"},[i("v-uni-view",{staticClass:"v-text"},[t._v(t._s(e.nickname?e.nickname:1===e.gender?"小哥哥XDGF9878":"小姐姐XDGF9878"))]),e.isNew?i("v-uni-image",{staticClass:"newtag",attrs:{src:t.newbar}}):t._e()],1),i("v-uni-view",{staticClass:"v-time"},[t._v(t._s(t._f("timeForm")(e.time)))])],1)}),1),i("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:2===t.choseCheck,expression:"choseCheck === 2"}],staticClass:"v-item-box"},t._l(t.visitors,function(e){return i("v-uni-view",{key:e.id,staticClass:"v-item",attrs:{"data-mid":e.visitID,"data-id":e.id},on:{click:function(e){e=t.$handleEvent(e),t.goDetail(e)}}},[i("v-uni-image",{staticClass:"v-icon",attrs:{src:e.header_url,mode:"aspectFill"}}),i("v-uni-view",{staticClass:"v-content"},[i("v-uni-view",{staticClass:"v-text"},[t._v(t._s(e.nickname?e.nickname:1===e.gender?"小哥哥XDGF9878":"小姐姐XDGF9878"))])],1),i("v-uni-view",{staticClass:"v-time"},[t._v(t._s(t._f("timeForm")(e.time)))])],1)}),1)],1),i("loading",{attrs:{loadConfig:1===t.choseCheck?t.loadConfV:t.loadConf}})]},n=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return n})},"5d49":function(t,e,i){var a=i("7a1a");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("8ab650c0",a,!0,{sourceMap:!1,shadowMode:!1})},"7a1a":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,'.v-box[data-v-93928b00]{padding:%?60?% %?30?% %?40?% %?30?%;margin-top:%?60?%}.v-bar-box[data-v-93928b00]{padding:%?40?% %?30?% %?20?% %?30?%;width:100%;position:fixed;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;line-height:1;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;background:#fff}.v-bar-item[data-v-93928b00]{font-size:%?28?%;margin-right:%?60?%}.v-bar-item-checked[data-v-93928b00]{font-size:%?36?%;text-align:center;font-weight:600}.v-bar-item-checked[data-v-93928b00]:after{display:block;content:" ";width:80%;margin:%?10?% auto;height:%?10?%;border-radius:%?10?%;background:#f81f5e}.v-item[data-v-93928b00]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding:%?20?% 0}.v-icon[data-v-93928b00]{height:%?80?%;width:%?80?%;border-radius:50%}.v-content[data-v-93928b00]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;padding:0 %?30?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.v-text[data-v-93928b00]{font-size:%?26?%;color:#252837}.newtag[data-v-93928b00]{margin-left:%?10?%;width:%?48?%;height:%?24?%}.v-time[data-v-93928b00]{font-size:%?26?%;color:#666;line-height:%?40?%}',""])},"95f2":function(t,e,i){"use strict";i.r(e);var a=i("0f57"),n=i("e75f");for(var s in n)"default"!==s&&function(t){i.d(e,t,function(){return n[t]})}(s);i("e3dd");var o=i("2877"),r=Object(o["a"])(n["default"],a["a"],a["b"],!1,null,"93928b00",null);e["default"]=r.exports},e3dd:function(t,e,i){"use strict";var a=i("5d49"),n=i.n(a);n.a},e75f:function(t,e,i){"use strict";i.r(e);var a=i("0ac0"),n=i.n(a);for(var s in a)"default"!==s&&function(t){i.d(e,t,function(){return a[t]})}(s);e["default"]=n.a}}]);