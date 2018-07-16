<template>
	<div class="header title" style="background:#3f87ea; color:#fff; font-size:0.48rem">
		<slot></slot>
	</div>
</template>
<script>
	const wx = require("weixin-js-sdk");
	export default {
		name: 'header',
		mounted(){
      this.shareBtn();
		},
		methods: {
			shareBtn() {
				var _this = this;
				this.$http.post(`${window.Host.apiHost}/pos/getSign`, {
					"url": location.href
				}).then((res) => {
					var result = res.data.data;
					wx.config({
						debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId: result.appId, // 必填，公众号的唯一标识
						timestamp: result.timestamp, // 必填，生成签名的时间戳
						nonceStr: result.nonceStr, // 必填，生成签名的随机串
						signature: result.signature, // 必填，签名，见附录1
						jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
					});
				});

				wx.error(function(res) {
					// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
//					alert(JSON.stringify(res));
				});

				wx.ready(function() {
					//朋友
					wx.onMenuShareAppMessage({
						title: '钱刷刷',
						desc: '装修主材，信息服务工具。', //分享描述
						link: "http://" + location.host + `#/index`,
						imgUrl: 'http://osz2pnx97.bkt.clouddn.com/xiaochengxu_share.png', // 分享图标
						type: 'link', //分享类型,music、video或link，不填默认为link
						success: function() {

						},
						cancel: function() {

						}
					});
					//朋友圈
					wx.onMenuShareTimeline({
						title: '钱刷刷', // 分享标题
						link: "http://" + location.host + `#/index`,
						// 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: 'http://osz2pnx97.bkt.clouddn.com/xiaochengxu_share.png', // 分享图标
						success: function() {

						},
						cancel: function() {

						}
					});
				})
			},
		}
	}
</script>
