webpackJsonp([20],{115:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=t(52),o=t.n(i);n.default={name:"dealRecordDetail",components:{TopHeader:o.a},data:function(){return{info:JSON.parse(localStorage.listInfo,"{}")}},created:function(){},methods:{goBack:function(){this.$router.go(-1)}}}},144:function(e,n,t){n=e.exports=t(25)(!0),n.push([e.i,".btn-area[data-v-5da36bd5]{padding:0 0 0 .4rem}.base-area[data-v-5da36bd5]{display:flex;flex-direction:column;align-items:center}.base-area img[data-v-5da36bd5]{height:1.6rem;width:1.6rem;border-radius:1.6rem;margin-top:1.06666rem}.tab-log[data-v-5da36bd5]{padding-right:.4rem;height:1.76rem;display:flex;flex-direction:row;align-items:center;justify-content:space-between}","",{version:3,sources:["/Users/hejiaming/Documents/Project/Web/PayPC/src/pages/collection/logs/dealRecordDetail.vue"],names:[],mappings:"AACA,2BACE,mBAAsB,CACvB,AACD,4BACE,aAAc,AACd,sBAAuB,AACvB,kBAAoB,CACrB,AACD,gCACE,cAAe,AACf,aAAc,AACd,qBAAsB,AACtB,qBAAuB,CACxB,AACD,0BACE,oBAAsB,AACtB,eAAgB,AAChB,aAAc,AACd,mBAAoB,AACpB,mBAAoB,AACpB,6BAA+B,CAChC",file:"dealRecordDetail.vue",sourcesContent:["/* logsDetail.wxss */\n.btn-area[data-v-5da36bd5] {\n  padding: 0 0 0 0.4rem;\n}\n.base-area[data-v-5da36bd5] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.base-area img[data-v-5da36bd5] {\n  height: 1.6rem;\n  width: 1.6rem;\n  border-radius: 1.6rem;\n  margin-top: 1.06666rem;\n}\n.tab-log[data-v-5da36bd5] {\n  padding-right: 0.4rem;\n  height: 1.76rem;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between;\n}\n"],sourceRoot:""}])},166:function(e,n,t){var i=t(144);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);t(26)("5906af06",i,!0)},219:function(e,n){e.exports={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"dealRecordDetail"},[t("title",[e._v("交易记录")]),e._v(" "),t("div",{staticClass:"content"},[t("div",{staticClass:"base-area"},[t("img",{attrs:{src:e.info.bankLogo}}),e._v(" "),t("span",{staticClass:"f28",staticStyle:{"margin-top":"0.4rem"}},[e._v(e._s(e.info.bankName+e.info.cardType)+"（"+e._s(e._f("last4")(e.info.cardNO))+"）")]),e._v(" "),t("span",{staticClass:"b",staticStyle:{"margin-top":"0.8rem","font-size":"0.53333rem","text-align":"center"}},[e._v(e._s(e._f("toF2")(e.info.amount))+"元")])]),e._v(" "),t("div",{staticClass:"btn-area bg0 bb1 bt1 f32"},[t("div",{staticClass:"tab-log"},[t("span",[e._v("手续费")]),e._v(" "),t("span",[e._v(e._s(e._f("toF2")(e.info.serviceCharge))+"元")])]),e._v(" "),t("div",{staticClass:"tab-log bb1 bt1"},[t("span",[e._v("到账金额")]),e._v(" "),t("span",[e._v(e._s(e._f("toF2")(e.info.arrivalAmount))+"元")])]),e._v(" "),t("div",{staticClass:"tab-log"},[t("span",[e._v("交易时间")]),e._v(" "),t("span",[e._v(e._s(e._f("setTime")(e.info.transactionDate)))])])])])])},staticRenderFns:[]}},32:function(e,n,t){t(166);var i=t(11)(t(115),t(219),"data-v-5da36bd5",null);e.exports=i.exports},50:function(e,n){!function(n,t){e.exports=function(e,n){function t(n,t,i){e.WeixinJSBridge?WeixinJSBridge.invoke(n,o(t),function(e){s(n,e,i)}):l(n,i)}function i(n,t,i){e.WeixinJSBridge?WeixinJSBridge.on(n,function(e){i&&i.trigger&&i.trigger(e),s(n,e,t)}):i?l(n,i):l(n,t)}function o(e){return e=e||{},e.appId=B.appId,e.verifyAppId=B.appId,e.verifySignType="sha1",e.verifyTimestamp=B.timestamp+"",e.verifyNonceStr=B.nonceStr,e.verifySignature=B.signature,e}function a(e){return{timeStamp:e.timestamp+"",nonceStr:e.nonceStr,package:e.package,paySign:e.paySign,signType:e.signType||"SHA1"}}function r(e){return e.postalCode=e.addressPostalCode,delete e.addressPostalCode,e.provinceName=e.proviceFirstStageName,delete e.proviceFirstStageName,e.cityName=e.addressCitySecondStageName,delete e.addressCitySecondStageName,e.countryName=e.addressCountiesThirdStageName,delete e.addressCountiesThirdStageName,e.detailInfo=e.addressDetailInfo,delete e.addressDetailInfo,e}function s(e,n,t){"openEnterpriseChat"==e&&(n.errCode=n.err_code),delete n.err_code,delete n.err_desc,delete n.err_detail;var i=n.errMsg;i||(i=n.err_msg,delete n.err_msg,i=c(e,i),n.errMsg=i),t=t||{},t._complete&&(t._complete(n),delete t._complete),i=n.errMsg||"",B.debug&&!t.isInnerInvoke&&alert(JSON.stringify(n));var o=i.indexOf(":");switch(i.substring(o+1)){case"ok":t.success&&t.success(n);break;case"cancel":t.cancel&&t.cancel(n);break;default:t.fail&&t.fail(n)}t.complete&&t.complete(n)}function c(e,n){var t=e,i=h[t];i&&(t=i);var o="ok";if(n){var a=n.indexOf(":");o=n.substring(a+1),"confirm"==o&&(o="ok"),"failed"==o&&(o="fail"),-1!=o.indexOf("failed_")&&(o=o.substring(7)),-1!=o.indexOf("fail_")&&(o=o.substring(5)),o=o.replace(/_/g," "),o=o.toLowerCase(),("access denied"==o||"no permission to execute"==o)&&(o="permission denied"),"config"==t&&"function not exist"==o&&(o="ok"),""==o&&(o="fail")}return n=t+":"+o}function d(e){if(e){for(var n=0,t=e.length;t>n;++n){var i=e[n],o=g[i];o&&(e[n]=o)}return e}}function l(e,n){if(!(!B.debug||n&&n.isInnerInvoke)){var t=h[e];t&&(e=t),n&&n._complete&&delete n._complete,console.log('"'+e+'",',n||"")}}function u(e){if(!(y||I||B.debug||"6.0.2">x||T.systemType<0)){var n=new Image;T.appId=B.appId,T.initTime=k.initEndTime-k.initStartTime,T.preVerifyTime=k.preVerifyEndTime-k.preVerifyStartTime,E.getNetworkType({isInnerInvoke:!0,success:function(e){T.networkType=e.networkType;var t="https://open.weixin.qq.com/sdk/report?v="+T.version+"&o="+T.isPreVerifyOk+"&s="+T.systemType+"&c="+T.clientVersion+"&a="+T.appId+"&n="+T.networkType+"&i="+T.initTime+"&p="+T.preVerifyTime+"&u="+T.url;n.src=t}})}}function p(){return(new Date).getTime()}function f(n){C&&(e.WeixinJSBridge?n():v.addEventListener&&v.addEventListener("WeixinJSBridgeReady",n,!1))}function m(){E.invoke||(E.invoke=function(n,t,i){e.WeixinJSBridge&&WeixinJSBridge.invoke(n,o(t),i)},E.on=function(n,t){e.WeixinJSBridge&&WeixinJSBridge.on(n,t)})}if(!e.jWeixin){var g={config:"preVerifyJSAPI",onMenuShareTimeline:"menu:share:timeline",onMenuShareAppMessage:"menu:share:appmessage",onMenuShareQQ:"menu:share:qq",onMenuShareWeibo:"menu:share:weiboApp",onMenuShareQZone:"menu:share:QZone",previewImage:"imagePreview",getLocation:"geoLocation",openProductSpecificView:"openProductViewWithPid",addCard:"batchAddCard",openCard:"batchViewCard",chooseWXPay:"getBrandWCPayRequest",openEnterpriseRedPacket:"getRecevieBizHongBaoRequest",startSearchBeacons:"startMonitoringBeacons",stopSearchBeacons:"stopMonitoringBeacons",onSearchBeacons:"onBeaconsInRange",consumeAndShareCard:"consumedShareCard",openAddress:"editAddress"},h=function(){var e={};for(var n in g)e[g[n]]=n;return e}(),v=e.document,_=v.title,A=navigator.userAgent.toLowerCase(),S=navigator.platform.toLowerCase(),y=!(!S.match("mac")&&!S.match("win")),I=-1!=A.indexOf("wxdebugger"),C=-1!=A.indexOf("micromessenger"),w=-1!=A.indexOf("android"),b=-1!=A.indexOf("iphone")||-1!=A.indexOf("ipad"),x=function(){var e=A.match(/micromessenger\/(\d+\.\d+\.\d+)/)||A.match(/micromessenger\/(\d+\.\d+)/);return e?e[1]:""}(),k={initStartTime:p(),initEndTime:0,preVerifyStartTime:0,preVerifyEndTime:0},T={version:1,appId:"",initTime:0,preVerifyTime:0,networkType:"",isPreVerifyOk:1,systemType:b?1:w?2:-1,clientVersion:x,url:encodeURIComponent(location.href)},B={},M={_completes:[]},V={state:0,data:{}};f(function(){k.initEndTime=p()});var P=!1,O=[],E={config:function(e){B=e,l("config",e);var n=!1!==B.check;f(function(){if(n)t(g.config,{verifyJsApiList:d(B.jsApiList)},function(){M._complete=function(e){k.preVerifyEndTime=p(),V.state=1,V.data=e},M.success=function(e){T.isPreVerifyOk=0},M.fail=function(e){M._fail?M._fail(e):V.state=-1};var e=M._completes;return e.push(function(){u()}),M.complete=function(n){for(var t=0,i=e.length;i>t;++t)e[t]();M._completes=[]},M}()),k.preVerifyStartTime=p();else{V.state=1;for(var e=M._completes,i=0,o=e.length;o>i;++i)e[i]();M._completes=[]}}),B.beta&&m()},ready:function(e){0!=V.state?e():(M._completes.push(e),!C&&B.debug&&e())},error:function(e){"6.0.2">x||(-1==V.state?e(V.data):M._fail=e)},checkJsApi:function(e){var n=function(e){var n=e.checkResult;for(var t in n){var i=h[t];i&&(n[i]=n[t],delete n[t])}return e};t("checkJsApi",{jsApiList:d(e.jsApiList)},function(){return e._complete=function(e){if(w){var t=e.checkResult;t&&(e.checkResult=JSON.parse(t))}e=n(e)},e}())},onMenuShareTimeline:function(e){i(g.onMenuShareTimeline,{complete:function(){t("shareTimeline",{title:e.title||_,desc:e.title||_,img_url:e.imgUrl||"",link:e.link||location.href,type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareAppMessage:function(e){i(g.onMenuShareAppMessage,{complete:function(){t("sendAppMessage",{title:e.title||_,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareQQ:function(e){i(g.onMenuShareQQ,{complete:function(){t("shareQQ",{title:e.title||_,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareWeibo:function(e){i(g.onMenuShareWeibo,{complete:function(){t("shareWeiboApp",{title:e.title||_,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareQZone:function(e){i(g.onMenuShareQZone,{complete:function(){t("shareQZone",{title:e.title||_,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},startRecord:function(e){t("startRecord",{},e)},stopRecord:function(e){t("stopRecord",{},e)},onVoiceRecordEnd:function(e){i("onVoiceRecordEnd",e)},playVoice:function(e){t("playVoice",{localId:e.localId},e)},pauseVoice:function(e){t("pauseVoice",{localId:e.localId},e)},stopVoice:function(e){t("stopVoice",{localId:e.localId},e)},onVoicePlayEnd:function(e){i("onVoicePlayEnd",e)},uploadVoice:function(e){t("uploadVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadVoice:function(e){t("downloadVoice",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},translateVoice:function(e){t("translateVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},chooseImage:function(e){t("chooseImage",{scene:"1|2",count:e.count||9,sizeType:e.sizeType||["original","compressed"],sourceType:e.sourceType||["album","camera"]},function(){return e._complete=function(e){if(w){var n=e.localIds;n&&(e.localIds=JSON.parse(n))}},e}())},getLocation:function(e){},previewImage:function(e){t(g.previewImage,{current:e.current,urls:e.urls},e)},uploadImage:function(e){t("uploadImage",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadImage:function(e){t("downloadImage",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},getLocalImgData:function(e){!1===P?(P=!0,t("getLocalImgData",{localId:e.localId},function(){return e._complete=function(e){if(P=!1,O.length>0){var n=O.shift();wx.getLocalImgData(n)}},e}())):O.push(e)},getNetworkType:function(e){var n=function(e){var n=e.errMsg;e.errMsg="getNetworkType:ok";var t=e.subtype;if(delete e.subtype,t)e.networkType=t;else{var i=n.indexOf(":"),o=n.substring(i+1);switch(o){case"wifi":case"edge":case"wwan":e.networkType=o;break;default:e.errMsg="getNetworkType:fail"}}return e};t("getNetworkType",{},function(){return e._complete=function(e){e=n(e)},e}())},openLocation:function(e){t("openLocation",{latitude:e.latitude,longitude:e.longitude,name:e.name||"",address:e.address||"",scale:e.scale||28,infoUrl:e.infoUrl||""},e)},getLocation:function(e){e=e||{},t(g.getLocation,{type:e.type||"wgs84"},function(){return e._complete=function(e){delete e.type},e}())},hideOptionMenu:function(e){t("hideOptionMenu",{},e)},showOptionMenu:function(e){t("showOptionMenu",{},e)},closeWindow:function(e){e=e||{},t("closeWindow",{},e)},hideMenuItems:function(e){t("hideMenuItems",{menuList:e.menuList},e)},showMenuItems:function(e){t("showMenuItems",{menuList:e.menuList},e)},hideAllNonBaseMenuItem:function(e){t("hideAllNonBaseMenuItem",{},e)},showAllNonBaseMenuItem:function(e){t("showAllNonBaseMenuItem",{},e)},scanQRCode:function(e){e=e||{},t("scanQRCode",{needResult:e.needResult||0,scanType:e.scanType||["qrCode","barCode"]},function(){return e._complete=function(e){if(b){var n=e.resultStr;if(n){var t=JSON.parse(n);e.resultStr=t&&t.scan_code&&t.scan_code.scan_result}}},e}())},openAddress:function(e){t(g.openAddress,{},function(){return e._complete=function(e){e=r(e)},e}())},openProductSpecificView:function(e){t(g.openProductSpecificView,{pid:e.productId,view_type:e.viewType||0,ext_info:e.extInfo},e)},addCard:function(e){for(var n=e.cardList,i=[],o=0,a=n.length;a>o;++o){var r=n[o],s={card_id:r.cardId,card_ext:r.cardExt};i.push(s)}t(g.addCard,{card_list:i},function(){return e._complete=function(e){var n=e.card_list;if(n){n=JSON.parse(n);for(var t=0,i=n.length;i>t;++t){var o=n[t];o.cardId=o.card_id,o.cardExt=o.card_ext,o.isSuccess=!!o.is_succ,delete o.card_id,delete o.card_ext,delete o.is_succ}e.cardList=n,delete e.card_list}},e}())},chooseCard:function(e){t("chooseCard",{app_id:B.appId,location_id:e.shopId||"",sign_type:e.signType||"SHA1",card_id:e.cardId||"",card_type:e.cardType||"",card_sign:e.cardSign,time_stamp:e.timestamp+"",nonce_str:e.nonceStr},function(){return e._complete=function(e){e.cardList=e.choose_card_info,delete e.choose_card_info},e}())},openCard:function(e){for(var n=e.cardList,i=[],o=0,a=n.length;a>o;++o){var r=n[o],s={card_id:r.cardId,code:r.code};i.push(s)}t(g.openCard,{card_list:i},e)},consumeAndShareCard:function(e){t(g.consumeAndShareCard,{consumedCardId:e.cardId,consumedCode:e.code},e)},chooseWXPay:function(e){t(g.chooseWXPay,a(e),e)},openEnterpriseRedPacket:function(e){t(g.openEnterpriseRedPacket,a(e),e)},startSearchBeacons:function(e){t(g.startSearchBeacons,{ticket:e.ticket},e)},stopSearchBeacons:function(e){t(g.stopSearchBeacons,{},e)},onSearchBeacons:function(e){i(g.onSearchBeacons,e)},openEnterpriseChat:function(e){t("openEnterpriseChat",{useridlist:e.userIds,chatname:e.groupName},e)}},L=1,R={};return v.addEventListener("error",function(e){if(!w){var n=e.target,t=n.tagName,i=n.src;if("IMG"==t||"VIDEO"==t||"AUDIO"==t||"SOURCE"==t){if(-1!=i.indexOf("wxlocalresource://")){e.preventDefault(),e.stopPropagation();var o=n["wx-id"];if(o||(o=L++,n["wx-id"]=o),R[o])return;R[o]=!0,wx.getLocalImgData({localId:i,success:function(e){n.src=e.localData}})}}}},!0),v.addEventListener("load",function(e){if(!w){var n=e.target,t=n.tagName;if(n.src,"IMG"==t||"VIDEO"==t||"AUDIO"==t||"SOURCE"==t){var i=n["wx-id"];i&&(R[i]=!1)}}},!0),n&&(e.wx=e.jWeixin=E),E}}(n)}(window)},51:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=t(50);n.default={name:"header",mounted:function(){this.shareBtn()},methods:{shareBtn:function(){this.$http.post(window.Host.apiHost+"/pos/getSign",{url:location.href}).then(function(e){var n=e.data.data;i.config({debug:!1,appId:n.appId,timestamp:n.timestamp,nonceStr:n.nonceStr,signature:n.signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage"]})}),i.error(function(e){}),i.ready(function(){i.onMenuShareAppMessage({title:"钱刷刷",desc:"装修主材，信息服务工具。",link:"http://"+location.host+"#/index",imgUrl:"http://osz2pnx97.bkt.clouddn.com/xiaochengxu_share.png",type:"link",success:function(){},cancel:function(){}}),i.onMenuShareTimeline({title:"钱刷刷",link:"http://"+location.host+"#/index",imgUrl:"http://osz2pnx97.bkt.clouddn.com/xiaochengxu_share.png",success:function(){},cancel:function(){}})})}}}},52:function(e,n,t){var i=t(11)(t(51),t(53),null,null);e.exports=i.exports},53:function(e,n){e.exports={render:function(){var e=this,n=e.$createElement;return(e._self._c||n)("div",{staticClass:"header title",staticStyle:{background:"#3f87ea",color:"#fff","font-size":"0.48rem"}},[e._t("default")],2)},staticRenderFns:[]}}});
//# sourceMappingURL=20.fc121b52b882b20f5d0b.js.map