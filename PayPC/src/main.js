// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import FastClick from 'fastclick'


//mint-ui 加载更多组件
import {Loadmore, Spinner, MessageBox, Indicator, Popup, Toast} from 'mint-ui'


import 'mint-ui/lib/style.css'

Vue.component("mt-loadmore", Loadmore)
Vue.component("Spinner", Spinner)
Vue.component(Popup.name, Popup);
Vue.component(Toast.name, Toast)


Vue.use(VueResource);

import './assets/js/flexible.js'
import './assets/js/pub.js'
import './assets/css/reset.css'

Vue.config.productionTip = false;


window.addEventListener('load', () => {
  FastClick.attach(document.body)
});


window.isUrl_ = true;//定义跳转开关
var relogin = function () {
  localStorage.removeItem('sessions');
  isUrl_ ? location.href = "?#/login" : '';
};

Vue.http.interceptors.push((request, next) => {

  //如果请求时token存在,就为每次请求的headers中设置token,
  //后台根据headers中的token判断是否放行并且返回前端请求的数据。
  request.headers.set('access-token', localStorage.sessions && JSON.parse(localStorage.sessions).accessToken || '');
  request.headers.set('session-id', localStorage.sessions && JSON.parse(localStorage.sessions).sessionId || '');
  request.credentials = true; //携带cookies 访问


  next((response) => {
    window.isUrl_ = ((location.hash).indexOf("#/functionIllustrate") > -1 || (location.hash).indexOf("#/index") > -1 || (location.hash).indexOf("#/reg") > -1 || (location.hash).indexOf("#/login") > -1) ? false : true;
    //对于token是否已过期的判断，就添加在此处，页面中任何一次http请求都会先调用此处方法
    if (response.data.stateCode == 302 || response.data.stateCode == 312 || response.data.stateCode == 317 || response.data.stateCode == 314 || response.data.stateCode == 315) { //登录非成功
      relogin();
    } else {

    }
    return response;
  });
});

// 货币过滤器
Vue.filter('currency', function (value, _currency, decimals) {
  var digitsRE = /(\d{3})(?=\d)/g;
  value = parseFloat(value);
  if (!isFinite(value) || !value && value !== 0) return '';
  _currency = _currency != null ? _currency : '$';
  decimals = decimals != null ? decimals : 2;
  var stringified = Math.abs(value).toFixed(decimals);
  var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
  var i = _int.length % 3;
  var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
  var _float = decimals ? stringified.slice(-1 - decimals) : '';
  var sign = value < 0 ? '-' : '';
  return sign + _currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
});

// 格式化时间2017.05.20 13:14
Vue.filter('setTime', function (value) {
  return setTime(value);
});

// 格式化日期2017.05.20
Vue.filter('setDate', function (value) {
  return setDate(value);
});


// 格式化日期2017.05
Vue.filter('setMonth', function (value) {
  var date = new Date(value);
  return date.getFullYear() + "-" + (date.getMonth() + 1);
  return date;
});

//取最后4位
Vue.filter('last4', function (value) {
  if (!value)return null;
  return value.substr(-4);
});

// 加一个m²
Vue.filter('squarMeter', function (value) {
  return value + "m²"
});


// 保留2位置
Vue.filter('toF2', function (value) {
  return (value * 1).toFixed(2)

});

// 过滤银行卡中间****
Vue.filter('setStartBank', function (value) {
  if (!value)return "";
  var l = value.substring(0, 4);
  var r = value.substr(-4);
  return l + " **** **** " + r
});

// 银行卡没4个一个空格
Vue.filter('setSpaceBank', function (value) {
  return value.replace(/(\d{4})(?=[^\s])/g, '$1 ')
});


/*
 过滤电话号码182****1234/028-****1234
 start 表示从第几位开始过滤
 */
Vue.filter('phonefilter', function (value, start) {
  var data = value.split("");
  data.splice(start, 4, "*", "*", "*", "*");
  return data.join("");
});


//折扣显示
Vue.filter('toDiscount', function (value) {
  if (value) {
    var strValue = value.toString();
    if (strValue.indexOf(".") != -1) {
      var strNum = strValue.substring(0, strValue.indexOf(".") + 3);
      return accMul(strNum, 10);
    }
  } else {
    return "";
  }

});

//保留两位小数  不四舍五
Vue.filter("point2", function (value) {
  if (value === "" || value === null || value === 0) {
    return "0.00";
  } else {
    return Math.floor(value * 10000) / 100;
  }
});


new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
