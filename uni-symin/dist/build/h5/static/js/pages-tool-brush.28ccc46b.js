(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-tool-brush"],{"41dc":function(t,e,i){"use strict";var a=i("6e12"),o=i.n(a);o.a},"494a":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,'uni-page-body[data-v-801336f4]{background:#f9f9fb}.b-bar[data-v-801336f4]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end;padding:%?30?% %?32?%}.b-bar-1[data-v-801336f4]{margin-top:%?-40?%}.b-text[data-v-801336f4]{font-size:%?28?%;color:#666}.b-iconcz[data-v-801336f4]{width:%?22?%;height:%?22?%;margin-left:%?22?%}.b-bar-2[data-v-801336f4]{position:relative;overflow:hidden;margin-top:%?60?%;width:%?750?%;border-radius:%?30?% %?30?% 0 0;padding-bottom:%?110?%}.b-bar-col[data-v-801336f4]{position:absolute;z-index:99;top:0;right:0;bottom:%?0?%;left:0}.b-bar-2[data-v-801336f4]:before{display:block;content:"\\9AD8\\7EA7\\641C\\7D22";width:100%;line-height:%?60?%;text-align:center;font-size:%?28?%;color:#fff;height:%?182?%;background:#6267f9;border-radius:%?30?% %?30?% 0 0}.b-bar-box[data-v-801336f4]{z-index:22;border-radius:%?30?% %?30?% 0 0;margin-top:%?-122?%;background:#f9f9f8;min-height:%?400?%;padding:%?40?% %?30?%}.b-range[data-v-801336f4]{margin-bottom:%?40?%\n/* \t\tbackground: white;\n\t\tborder-radius:30rpx; */}.b-range-text[data-v-801336f4]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;line-height:%?40?%;font-size:%?28?%;color:#000}.b-choose[data-v-801336f4]{border-radius:%?30?%;overflow:hidden}.b-choose2[data-v-801336f4],.b-choose3[data-v-801336f4]{margin-top:%?40?%}.b-choose2-tite[data-v-801336f4]{margin-bottom:%?10?%;height:%?40?%;line-height:%?40?%;font-size:%?28?%}.b-choose3-tite[data-v-801336f4]{margin-top:%?20?%;text-align:center;font-size:%?32?%;color:#4a4a4a;line-height:1}.b-choose3-box[data-v-801336f4]{padding:%?40?% 0}.brush-btn[data-v-801336f4]{width:%?690?%;height:%?88?%;border-radius:%?30?%}.b-content[data-v-801336f4]{padding:%?56?% %?132?%}.b-title[data-v-801336f4]{font-size:%?28?%;line-height:%?48?%;font-weight:600;color:#f92a66}.b-title-02[data-v-801336f4]{color:#333}.uinfo-d-btnbox[data-v-801336f4]{position:fixed;z-index:488;bottom:0;padding:%?10?% %?30?%;background:#f9f9f8}body.?%PAGE?%[data-v-801336f4]{background:#f9f9fb}',""])},5191:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(i("e143")),o=n(i("8212")),s=n(i("88d3"));function n(t){return t&&t.__esModule?t:{default:t}}var r=getApp(),c=a.default.extend({data:function(){return{title:"Hello",STATUS_BAR_HEIGHT:wx.STATUS_BAR_HEIGHT,DEFAULT_HEADER_HEIGHT:wx.DEFAULT_HEADER_HEIGHT,barconfig:{CustomBar:wx.STATUS_BAR_HEIGHT+wx.DEFAULT_HEADER_HEIGHT,StatusBar:wx.STATUS_BAR_HEIGHT,title:"筛选",bgset:"bg-gradual-dred",tset:"bg-gradual-tred",hiddenTitle:2,isArrow:2},boxconfig:{key:0,model:1,btn:{ok:"确定",okcolor:"d-color-r",cancel:"取消",cancolor:"d-color-b"}},orderType:[{text:"最近上线",isbgcolor:"cho-dct"},{text:"离我最近",isbgcolor:"cho-dct"}],sexArr:[{text:"不限",isbgcolor:"cho-dct"},{text:"男生",isbgcolor:"cho-dct"},{text:"女生",isbgcolor:"cho-dct"}],checkArr:[{text:"查看全部",isbgcolor:"cho-dct"},{text:"只看认证用户",isbgcolor:"cho-dct"}],ageWidth:690,thumbStyle:{background:"#f81f5e",border:"2px solid white","box-shadow":"0 0 4px #f81f5e"},brushTool:[{key:"0",title:"年收入",icon:"",content:"",arrow:!0,size:40,type:"button",url:"",isBorderR:!1,placeholder:"",isInput:!1,selfconf:!1},{key:"1",title:"职业",icon:"",content:"",arrow:!0,size:40,type:"url",url:"/pages/tool/job",isBorderR:!1,placeholder:"",isInput:!1,selfconf:!1,last:!0},{key:"2",title:"最新加入的会员",icon:"",content:"",arrow:!1,size:40,type:"text",url:"",isBorderR:!1,placeholder:"",isInput:!1,selfconf:!0,last:!0}],items:[],showChoosebox:!1,selfTypes:[],selfPays:[],queryParamInit:{},jobObj:{title:"",id:""},queryParam:{recentR:!1,choseKey:-1,recent:0,sort:1,gender:0,video:0,occupation:0,occupation_str:"",revenue:0,objective:[],ageVal:[18,70],heightVal:[150,220]},isVip:!1,showVip:!1}},onLoad:function(){this.selfTypes=Object.assign(r.globalData.selfTypes),this.selfPays=r.globalData.selfPays,this.items=this.selfPays;var t=r.globalData.userInfo;this.queryParam.gender=t&&1===t.gender?2:1,this.queryParamInit=Object.assign({},this.queryParam),this.init()},onShow:function(){r.globalData.isBrush=!1,this.setJob()},onUnload:function(){r.globalData.isBrush||(this.queryParam.ageVal=[18,70],this.queryParam.heightVal=[150,220])},methods:{init:function(){var t=this,e=s.default.getItem("queryParam");if(e.length)try{e=e&&JSON.parse(e)}catch(i){e={}}else e={};this.queryParam=Object.assign(this.queryParam,e),this.selfTypes.map(function(e){e.isChoose=!1,e.icon=r.globalData.yYtype[e.title],e.imgStyle="width:40%;border-radius:0",e.imgStyleR="background: #6267F9",~t.queryParam.objective.indexOf(e.id)&&(e.isChoose=!0)}),this.brushTool[0].content=-1!==this.queryParam.choseKey&&this.items[this.queryParam.choseKey].text||"",this.jobObj={title:this.queryParam.occupation_str||"",id:this.queryParam.occupation},this.brushTool[1].content=this.queryParam.occupation_str,this.brushTool[1].url="/pages/tool/job?id="+this.queryParam.occupation,this.isVip=r.globalData.userInfo.vip_id>0},showVipBox:function(){this.boxconfig.model=1,this.boxconfig.btn.ok="成为会员",this.boxconfig.btn.cancel="再看看",this.showVip=!0,this.showChoosebox=!0},resetfunc:function(){this.queryParam=Object.assign(this.queryParam,this.queryParamInit),this.queryParam.ageVal=[18,70],this.queryParam.heightVal=[150,220],this.brushTool[0].content="",this.brushTool[1].content="",this.selfTypes.map(function(t){t.isChoose=!1})},setJob:function(){var t=getCurrentPages(),e=t[t.length-1],i=!o.default.isEmpty(e.data.jobObj)&&e.data.jobObj;i&&!i.id&&(i=this.jobObj),this.brushTool[1].content=i.title||"",this.brushTool[1].url="/pages/tool/job?id="+i.id,this.jobObj=i,this.queryParam.occupation=i.id||0,this.queryParam.occupation_str=i.title},sexfunc:function(t){var e=t.detail,i=e.key,a=e.val;switch(1*i){case 1:this.queryParam.sort=a;break;case 2:this.queryParam.gender=a;break;case 3:this.queryParam.video=a;break;default:break}},getsliderValA:function(t){this.queryParam.ageVal=t.detail.value},getsliderValH:function(t){this.queryParam.heightVal=t.detail.value},chooseItem:function(t){var e=t.detail.val;1*e===0?(this.items=this.selfPays,this.boxconfig.model=2,this.boxconfig.btn.ok="确定",this.boxconfig.btn.cancel="取消",this.showChoosebox=!0):1*e===1&&o.default.goUrl(t)},surefunc:function(t){var e=t.detail,i=(e.key,e.choseIndex);e.val;if(this.showVip)return uni.navigateTo({url:"/pages/userinfo/vip"}),this.showChoosebox=!1,void(this.showVip=!1);this.queryParam.choseKey=1*i,this.queryParam.revenue=1*i+1,this.brushTool[0].content=this.items[1*i].text,this.showChoosebox=!1},cancelfunc:function(){this.showChoosebox=!1,this.showVip=!1},switchChange:function(t){var e=t.detail.value;this.queryParam.recentR=Boolean(1*e)},itemHfunc:function(t){var e=this;this.queryParam.objective=[];var i=t.detail,a=(i.key,i.val,i.res);this.selfTypes=a||[],this.selfTypes.map(function(t){t.isChoose&&e.queryParam.objective.push(t.id)})},goBack:function(){r.globalData.isBrush=!0,s.default.setItem("queryParam",this.queryParam,function(){uni.navigateBack()})},createFormId:function(t){t.detail.formId&&r.$vm.sendFormId(t.detail.formId)}}});e.default=c},"64cf":function(t,e,i){"use strict";i.r(e);var a=i("66c87"),o=i("e3e7");for(var s in o)"default"!==s&&function(t){i.d(e,t,function(){return o[t]})}(s);i("41dc");var n=i("2877"),r=Object(n["a"])(o["default"],a["a"],a["b"],!1,null,"801336f4",null);e["default"]=r.exports},"66c87":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return[i("custombar",{attrs:{name:"uni-app",barconfig:t.barconfig}}),t.showChoosebox?i("dialogbox",{attrs:{items:t.items,boxconfig:t.boxconfig,choseKey:t.queryParam.choseKey},on:{surefunc:function(e){e=t.$handleEvent(e),t.surefunc(e)},cancelfunc:function(e){e=t.$handleEvent(e),t.cancelfunc(e)}}},[t.showVip?[i("v-uni-view",{staticClass:"b-content"},[i("v-uni-view",{staticClass:"b-title flex-c"},[t._v("VIP会员高级筛选")]),i("v-uni-view",{staticClass:"b-title b-title-02 flex-c"},[t._v("高级筛选需要成为VIP")])],1)]:t._e()],2):t._e(),i("v-uni-view",{staticClass:"b-bar",on:{click:function(e){e=t.$handleEvent(e),t.resetfunc(e)}}},[i("v-uni-view",{staticClass:"b-text"},[t._v("重置")]),i("v-uni-view",{staticClass:"iconfont icon-sync b-iconcz"})],1),i("v-uni-view",{staticClass:"b-bar-1"},[i("choose",{attrs:{choArr:t.orderType,choCount:t.queryParam.sort,choTitle:"排序",keys:"1"},on:{setValue:function(e){e=t.$handleEvent(e),t.sexfunc(e)}}}),i("choose",{attrs:{choArr:t.sexArr,choCount:t.queryParam.gender,choTitle:"性别",keys:"2"},on:{setValue:function(e){e=t.$handleEvent(e),t.sexfunc(e)}}}),i("choose",{attrs:{choArr:t.checkArr,choCount:t.queryParam.video,choStyle:"margin-bottom: 20rpx;",choTitle:"视频认证",keys:"3"},on:{setValue:function(e){e=t.$handleEvent(e),t.sexfunc(e)}}})],1),i("v-uni-view",{staticClass:"b-bar-2"},[t.isVip?t._e():i("v-uni-view",{staticClass:"b-bar-col",on:{click:function(e){e=t.$handleEvent(e),t.showVipBox(e)}}}),i("v-uni-view",{staticClass:"b-bar-box"},[i("v-uni-view",{staticClass:"b-range"},[i("v-uni-view",{staticClass:"b-range-text"},[i("v-uni-view",[t._v("年龄")]),i("v-uni-view",[t._v(t._s(t.queryParam.ageVal[0])+" ~ "+t._s(t.queryParam.ageVal[1]))])],1),i("v-uni-view",{staticClass:"b-range-bar"},[i("slide",{attrs:{width:t.ageWidth,value:t.queryParam.ageVal,min:"18",max:"70","thumb-style":t.thumbStyle,"active-color":"#f81f5e","slider-weight":"2"},on:{change:function(e){e=t.$handleEvent(e),t.getsliderValA(e)}}})],1)],1),i("v-uni-view",{staticClass:"b-range"},[i("v-uni-view",{staticClass:"b-range-text"},[i("v-uni-view",[t._v("身高")]),i("v-uni-view",[t._v(t._s(t.queryParam.heightVal[0])+" ~ "+t._s(t.queryParam.heightVal[1]))])],1),i("v-uni-view",{staticClass:"b-range-bar"},[i("slide",{attrs:{width:t.ageWidth,value:t.queryParam.heightVal,min:"150",max:"220","thumb-style":t.thumbStyle,"active-color":"#f81f5e","slider-weight":"2"},on:{change:function(e){e=t.$handleEvent(e),t.getsliderValH(e)}}})],1)],1),i("v-uni-view",{staticClass:"b-choose"},[i("iptitem",{attrs:{inputconfig:t.brushTool[0]},on:{choose:function(e){e=t.$handleEvent(e),t.chooseItem(e)}}}),i("iptitem",{attrs:{inputconfig:t.brushTool[1]},on:{choose:function(e){e=t.$handleEvent(e),t.chooseItem(e)}}})],1),i("v-uni-view",{staticClass:"b-choose2"},[i("v-uni-view",{staticClass:"b-choose2-tite"},[t._v("最新")]),i("v-uni-view",{staticClass:"b-choose"},[i("iptitem",{attrs:{inputconfig:t.brushTool[2]}},[i("v-uni-switch",{attrs:{"data-key":"1",color:"#F81F5E",checked:t.queryParam.recentR},on:{change:function(e){e=t.$handleEvent(e),t.switchChange(e)}}})],1)],1)],1),i("v-uni-view",{staticClass:"b-choose3"},[i("v-uni-view",{staticClass:"b-choose3-tite"},[t._v("邀约项目")]),i("v-uni-view",{staticClass:"b-choose3-box"},[i("itemh",{attrs:{itemData:t.selfTypes},on:{setValue:function(e){e=t.$handleEvent(e),t.itemHfunc(e)}}})],1)],1)],1)],1),i("v-uni-form",{staticClass:"uinfo-d-btnbox",attrs:{"report-submit":!0},on:{submit:function(e){e=t.$handleEvent(e),t.createFormId(e)}}},[i("v-uni-button",{staticClass:"c-btn bg-red2 brush-btn",attrs:{"form-type":"submit"},on:{click:function(e){e=t.$handleEvent(e),t.goBack(e)}}},[t._v("确定")])],1)]},o=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return o})},"6e12":function(t,e,i){var a=i("494a");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var o=i("4f06").default;o("045fd6ca",a,!0,{sourceMap:!1,shadowMode:!1})},e3e7:function(t,e,i){"use strict";i.r(e);var a=i("5191"),o=i.n(a);for(var s in a)"default"!==s&&function(t){i.d(e,t,function(){return a[t]})}(s);e["default"]=o.a}}]);