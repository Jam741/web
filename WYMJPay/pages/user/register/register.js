// register.js
var app = getApp()

var RSA = require('../../../utils/wxapp_rsa.js')

var publicKey_pkcs1 = '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCBG3UFPAxh+a0NLv6Plvjo5YPDdnlbED8dI4GP21DdFKvXVFcPb0lSRrht5Xrg7ck4PJ/fovfSi7k8MYqPY52g9tnPzkAthVOs99Tw6DVe22vV2hcs7dXvtk+TxKy4IqMjZA77hiH8wMYcJur+o4R770mrVP4fP88x53EQ4PaayQIDAQAB-----END PUBLIC KEY-----'


var totalTime = 0

Page({

//   var countdown= 60; 
//   function settime(val) { 
//     if(countdown == 0) {
//       val.removeAttribute("disabled");
//       val.value = "免费获取验证码";
//       countdown = 60;
//     } else { 
//       val.setAttribute("disabled", true); 
//       val.value = "重新发送(" + countdown + ")"; 
//       countdown--; 
//     } 
// setTimeout(function() {
//       settime(val)
//     }, 1000) 
// } 

  /**
   * 页面的初始数据
   */
  data: {
    enable:true,
    sendBtnText: '发送验证码',
    inputUserNameValue: '',
    inputPwasswordValue: '',
    inputCodeValue: '',
  },


  //Event用户名输入
  bindUsernameInput: function (e) {
    this.setData({
      inputUserNameValue: e.detail.value
    })
  },

  /**Event密码输入 */
  bindPwasswordInput: function (e) {
    this.setData({
      inputPwasswordValue: e.detail.value
    })
  },

  /**
   * Event 验证码输入
   */
  bindCodeInput: function (e) {
    this.setData({
      inputCodeValue: e.detail.value
    })
  },

  /**
   * Event 确认
   */
  listenerConfirmClick: function (e) {
      if(this.verifyInput()){
        this.register()
      }
  },

  /**
   * 注册
   */
  register(){
    var that = this;
    app.register({
      "phone": this.data.inputUserNameValue,
      "smsCode": this.data.inputCodeValue,
      "password": this.Rsa(this.data.inputPwasswordValue)
    },  (res)=> {
      if (res.needConfirm){
        wx.showModal({
          title: '提示',
          content: res.message,
          confirmText: "确定",
          confirmColor: "#2a7ae8",
          success:  (res)=> {
            if (res.confirm) {
              that.login()
            }
          }
        })
      }else{
        that.login()
      }
    })
  },


  login(){

    var res = {
      "phone": this.data.inputUserNameValue,
      "password": this.Rsa(this.data.inputPwasswordValue),
      "type": 1,
      "leaderId": null
    }

    if (wx.getStorageSync("recommend_user_id")) {
      res.leaderId = wx.getStorageSync("recommend_user_id")
    };

    if (wx.getStorageSync("recommend_type")) {
      res.type = wx.getStorageSync("recommend_type")
    };


    app.doLogin(res, function (res) {
      if (wx.getStorageSync("recommend_user_id")) {
        wx.removeStorageSync("recommend_user_id")
      }
      if (wx.getStorageSync("recommend_type")) {
        wx.removeStorageSync("recommend_type")
      }
      wx.reLaunch({
        url: '../../index/index',
      })
    })
  },


  /**
     * [Rsa 加密]
     * @param {[type]} key [description]
     */
  Rsa: function (key) {
    var encrypt_rsa = new RSA.RSAKey();
    encrypt_rsa = RSA.KEYUTIL.getKey(publicKey_pkcs1);
    console.log('加密RSA:')
    console.log(encrypt_rsa)
    var encStr = encrypt_rsa.encrypt(key)
    encStr = RSA.hex2b64(encStr);
    console.log("加密结果：" + encStr)
    return encStr;
  },

  /**
   * 校验输入
   */
  verifyInput() {
    if (!app.verifyPhone(this.data.inputUserNameValue)) {
      app.toast("请输入正确的手机号码")
      return false;
    } else if (!app.verifySmsCode(this.data.inputCodeValue)) {
      app.toast("请输入正确的验证码")
      return false;
    } else if (!app.verifyPwd(this.data.inputPwasswordValue)) {
      app.toast("请输入正确格式的密码")
      return false;
    }
    return true;
  },


  /**
   * 发送短信验证码
   */
  listenerSendSmsCodeClick:function(e){
    if (this.data.enable) {
      if (app.verifyPhone(this.data.inputUserNameValue)) {
        app.sendSmsCodeForUser({
          "phone": this.data.inputUserNameValue,
          "source": 1
        },  (res) => {
          totalTime = 60
          this.timeDown()
        })
      }
    }
  },


  /**
   * 倒计时
   */
  timeDown() {
    this.setData({
      enable: false,
      sendBtnText: totalTime + 's'
    })
    if (totalTime == 0) {
      this.setData({
        enable: true,
        sendBtnText: '重新发送'
      })
    } else {
      setTimeout(() => {
        totalTime--
        this.timeDown()
      }, 1000)
    }

  },

})