(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{226:function(e,a,t){"use strict";t.r(a);var n=t(40),i=t.n(n),s=t(9),d=t.n(s),l=t(10),c=t.n(l),o=t(19),r=t.n(o),m=t(20),p=t.n(m),h=t(39),u=t.n(h),f=t(21),g=t.n(f),v=t(0),w=t.n(v),b=t(98),E=t(29),x=t(88),N=t(16),y=t(78),C=t(24),k=t(30),T=(t(11),t(81)),j=["被曝光的名称/微信昵称不能为空","标题不能超过15个字数","曝光标题不能为空","被曝光人微信号不能为空","图片数量至少有一个最多九张","电话号码只能11位","被曝光人微信号只能是数字、下划线、中横线或字母","曝光人微信号只能是数字或字母"],O=function(e){function a(e){var t;return d()(this,a),(t=r()(this,p()(a).call(this,e))).state={disname:"",disnameT:"",diswx:"",disphone:"",disqq:"",diszfb:"",disdesc:"",distitle:"",desc:"",files:[],isHiddn:!1,openId:""},t.handleChange=t.handleChange.bind(u()(t)),t.descChange=t.descChange.bind(u()(t)),t.onFileChange=t.onFileChange.bind(u()(t)),t.isHiddenName=t.isHiddenName.bind(u()(t)),t.saveData=t.saveData.bind(u()(t)),document.title="我要曝光",t}return g()(a,e),c()(a,[{key:"componentDidMount",value:function(e){var a=decodeURIComponent(location.href),t=Object(y.a)(a);t.length&&this.props.getUserInfo(t)}},{key:"componentWillReceiveProps",value:function(e){this.state.openId=e.userInfo.openId}},{key:"onFileChange",value:function(e,a,t){var n=this;if("add"===a){var i=e.pop();if("image/gif"===i.type)return b.g.fail("图片上传不支持gif图片，请重新选择上传",3);var s=new FormData;s.append("file",i.file),s.append("orientation",i.orientation),b.g.loading("图片上传中...",0),E.a.uploadImgFile(s).then(function(a){if(b.g.hide(),1*a.code==200){var t=a.result&&a.result.fileId;if(t){b.g.success("图片上传成功!",1);var i={id:t,url:N.fileServer+t};e.push(i),n.setState({files:e})}else b.g.fail("图片上传失败!",1)}else b.g.fail("图片上传失败!",1)}).catch(function(e){console.log(e),b.g.fail("图片上传失败!",1)})}else"remove"===a&&n.setState({files:e})}},{key:"handleChange",value:function(e){var a=e.target.dataset.key,t=e.target.value;this.setState(i()({},a,t))}},{key:"isHiddenName",value:function(e){console.log(e),this.setState({isHiddn:e})}},{key:"descChange",value:function(e){console.log(e),this.setState({desc:e})}},{key:"saveData",value:function(){var e=this,a=function(){var a=-1;if(!e.state.diswx.length)return a=0;if(!e.state.distitle.length)return a=2;if(e.state.distitle&&e.state.distitle.length>15)return a=1;if(!e.state.disnameT.length)return a=3;if(!e.state.files.length)return a=4;if(e.state.disphone&&11!=e.state.disphone.length)return a=5;var t=/^[A-Za-z0-9_-]+$/g;return e.state.diswx.match(t)?e.state.disnameT.match(t)?a:a=7:a=6}(),t="";if(-1!==a)return t=j[a],void b.g.fail(t,3);var n={bName:e.state.disname,rWeixin:e.state.disnameT,bWeixin:e.state.diswx,bPhone:e.state.disphone,bQq:e.state.disqq,bZfb:e.state.diszfb,bOther:e.state.disdesc,title:e.state.distitle,content:e.state.desc,anonymous:Number(e.state.isHiddn)+"",imgList:e.state.files,openId:e.state.openId};b.g.loading("数据保存中...",0),x.a.saveTip(n).then(function(a){if(b.g.hide(),1*a.code==200){b.g.success("数据保存成功！",1);var t=a.result&&a.result.id;e.props.history.push({pathname:"/detail",state:{id:t,openId:e.state.openId}})}else b.g.fail("数据保存失败！",1)}).catch(function(e){b.g.hide(),b.g.fail("数据保存失败！",1)})}},{key:"render",value:function(){var e=this.state,a=e.disname,t=e.files;return w.a.createElement("div",{className:"page-box flex-w"},w.a.createElement("div",{className:"cardbox addnewbox"},w.a.createElement("div",{className:"addnew-box"},w.a.createElement("div",{className:"addnew-box-title"},"被曝光者信息(必填*)"),w.a.createElement("div",{className:"addnew-item flex-b"},w.a.createElement("div",{className:"addnew-title flex-c"},"标题",w.a.createElement("span",{className:"addnew-icon"},"*")),w.a.createElement("div",{className:"addnew-content"},w.a.createElement("input",{className:"addnew-ipt","data-key":"distitle",placeholder:"请填写曝光标题",value:this.state.distitle,onChange:this.handleChange,type:"text"}))),w.a.createElement("div",{className:"addnew-item addnew-line flex-b"},w.a.createElement("div",{className:"addnew-title flex-c"},"微信号",w.a.createElement("span",{className:"addnew-icon"},"*")),w.a.createElement("div",{className:"addnew-content"},w.a.createElement("input",{className:"addnew-ipt","data-key":"diswx",placeholder:"请填写被曝光人微信号",value:this.state.diswx,onChange:this.handleChange}))))),w.a.createElement("div",{className:"cardbox addnew"},w.a.createElement("div",{className:"addnew-box"},w.a.createElement("div",{className:"addnew-box-title colorg"},"被曝光者其他信息(选填)"),w.a.createElement("div",{className:"addnew-item addnew-line flex-b"},w.a.createElement("div",{className:"addnew-title flex-c"},"名字/昵称"),w.a.createElement("div",{className:"addnew-content"},w.a.createElement("input",{className:"addnew-ipt",type:"text","data-key":"disname",placeholder:"请填写被曝光人名字/昵称",value:a,onChange:this.handleChange}))),w.a.createElement("div",{className:"addnew-item addnew-line flex-b"},w.a.createElement("div",{className:"addnew-title flex-c"},"手机/电话"),w.a.createElement("div",{className:"addnew-content"},w.a.createElement("input",{className:"addnew-ipt",type:"number","data-key":"disphone",placeholder:"请填写被曝光人手机/电话",value:this.state.disphone,onChange:this.handleChange}))),w.a.createElement("div",{className:"addnew-item addnew-line flex-b"},w.a.createElement("div",{className:"addnew-title flex-c"},"QQ"),w.a.createElement("div",{className:"addnew-content"},w.a.createElement("input",{className:"addnew-ipt","data-key":"disqq",placeholder:"请填写被曝光人QQ号",type:"number",value:this.state.disqq,onChange:this.handleChange}))),w.a.createElement("div",{className:"addnew-item addnew-line flex-b"},w.a.createElement("div",{className:"addnew-title flex-c"},"支付宝/银行卡"),w.a.createElement("div",{className:"addnew-content"},w.a.createElement("input",{className:"addnew-ipt","data-key":"diszfb",placeholder:"请填写被曝光人支付宝/银行卡",type:"number",value:this.state.diszfb,onChange:this.handleChange}))),w.a.createElement("div",{className:"addnew-item addnew-line flex-b"},w.a.createElement("div",{className:"addnew-title flex-c"},"其他"),w.a.createElement("div",{className:"addnew-content"},w.a.createElement("input",{className:"addnew-ipt","data-key":"disdesc",placeholder:"例:陌陌xxxxx",value:this.state.disdesc,onChange:this.handleChange}))))),w.a.createElement("div",{className:"cardbox addnew02"},w.a.createElement("div",{className:"addnew-line addnew-text-area"},w.a.createElement(b.f,{autoHeight:!0,rows:5,count:2e3,placeholder:"请填写具体内容，必须对自己所描述的事件负全部责任","data-key":"desc",className:"addnew-content-text",value:this.state.desc,onChange:this.descChange})),w.a.createElement("div",{className:"addnew-img"},w.a.createElement(b.c,{files:t,onChange:this.onFileChange,onImageClick:function(e,a){return console.log(e,a)},onAddImageClick:this.onImageClick,selectable:t.length<10,multiple:!1,length:3}))),w.a.createElement("div",{className:"cardbox addnew03"},w.a.createElement("div",{className:"addnew-box"},w.a.createElement("div",{className:"addnew-item addnew-line flex-b"},w.a.createElement("div",{className:"addnew-title flex-c"},"微信号",w.a.createElement("span",{className:"addnew-icon"},"*")),w.a.createElement("div",{className:"addnew-content"},w.a.createElement("input",{className:"addnew-ipt","data-key":"disnameT",placeholder:"请填写曝光人微信号",value:this.state.disnameT,onChange:this.handleChange}))),w.a.createElement("div",{className:"addnew-item addnew-line flex-b"},w.a.createElement("div",{className:"addnew-title2 flex-s"},"是否匿名(仅管理员可见)"),w.a.createElement("div",{className:"addnew-content flex-end"},w.a.createElement(b.e,{onChange:this.isHiddenName,checked:this.state.isHiddn}))))),w.a.createElement("div",{className:"width90"},w.a.createElement(T.a,null)),w.a.createElement("div",{className:"querybtn addnewbtn",onClick:this.saveData},"提交曝光"))}}]),a}(v.PureComponent);a.default=Object(C.connect)(function(e){return e},{getUserInfo:k.b})(O)},78:function(e,a,t){"use strict";t.d(a,"a",function(){return i}),t.d(a,"b",function(){return s});var n=t(29);function i(e){var a="",t=e.match(/(?:code=)(\w*)/gi);return t&&t.length&&(a=t[0].substring(5)),a}function s(e){var a=location.href.split("#")[0];n.a.getJsconfig({url:a}).then(function(a){if(1*a.code==200){var t=a.result,n=window.wx||{};n.config({debug:!1,appId:"wx6357f5dafdb1c45d",timestamp:t.timestamp,nonceStr:t.noncestr,signature:t.signature,jsapi_ticket:t.jsapi_ticket,jsApiList:["chooseImage","onMenuShareAppMessage","hideOptionMenu","showOptionMenu","onMenuShareTimeline","updateAppMessageShareData","updateTimelineShareData"]}),n.ready(function(){e?n.hideOptionMenu():n.showOptionMenu()})}})}},79:function(e,a,t){e.exports=t.p+"7b8e8d2f21e711168c14ba6f931da1a0.jpg"},81:function(e,a,t){"use strict";t.d(a,"a",function(){return v});var n=t(9),i=t.n(n),s=t(10),d=t.n(s),l=t(19),c=t.n(l),o=t(20),r=t.n(o),m=t(21),p=t.n(m),h=t(0),u=t.n(h),f=t(79),g=t.n(f),v=function(e){function a(){return i()(this,a),c()(this,r()(a).apply(this,arguments))}return p()(a,e),d()(a,[{key:"render",value:function(){g.a;return u.a.createElement("div",{className:"gzh-code-box"},u.a.createElement("div",{className:"gzh-code-wa"},u.a.createElement("span",null,"微信搜索"),u.a.createElement("span",{className:"gzh-code-wa-big"},"“火眼金睛打妖怪”"),u.a.createElement("span",null,"或"),u.a.createElement("span",{className:"gzh-code-wa-big"},"“hyjjdyg”"),u.a.createElement("span",null,"，以及长按右侧二维码与微信扫一扫关注公众号使用更多功能，举报网络欺诈传播正能量从我做起。")),u.a.createElement("div",{className:"gzhbox"},u.a.createElement("img",{className:"gzhbox-img",src:g.a}),u.a.createElement("div",{className:"gzhbox-text"},"长按扫码")))}}]),a}(h.PureComponent)},88:function(e,a,t){"use strict";var n=t(9),i=t.n(n),s=t(10),d=t.n(s),l=t(14),c=function(){function e(){i()(this,e)}return d()(e,[{key:"saveData",value:function(e){return Object(l.a)("admin/Index/login",e,{method:"POST",headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json;charset=utf-8"}})}},{key:"listTip",value:function(e){return Object(l.a)("dataSyn/api/listTip",e,{method:"GET",headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json;charset=utf-8"}})}},{key:"searchTip",value:function(e){return Object(l.a)("dataSyn/api/searchTip",e,{method:"GET",headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json;charset=utf-8"}})}},{key:"getIdBycode",value:function(e){return Object(l.a)("dataSyn/api/getbycode",e,{method:"POST",headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json;charset=utf-8"}})}},{key:"saveTip",value:function(e){return Object(l.a)("dataSyn/api/saveTip",e,{method:"POST",headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json;charset=utf-8"}})}},{key:"detailTip",value:function(e){return Object(l.a)("dataSyn/api/detailTip",e,{method:"GET",headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json;charset=utf-8"}})}},{key:"dzOrCai",value:function(e){return Object(l.a)("dataSyn/api/dzOrCai",e,{method:"POST",headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json;charset=utf-8"}})}},{key:"getOpenId",value:function(e){return Object(l.a)("dataSyn/api/getOpenId",e,{method:"POST",headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json;charset=utf-8"}})}},{key:"topTip",value:function(e){return Object(l.a)("dataSyn/api/topTip",e,{method:"GET",headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json;charset=utf-8"}})}}]),e}();a.a=new c}}]);