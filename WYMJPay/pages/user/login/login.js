// login.js 登录页面
var app = getApp()
// var encrypt = require('../../../utils/jsencrypt.min.js')

var RSA = require('../../../utils/wxapp_rsa.js')

var publicKey_pkcs1 = '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCBG3UFPAxh+a0NLv6Plvjo5YPDdnlbED8dI4GP21DdFKvXVFcPb0lSRrht5Xrg7ck4PJ/fovfSi7k8MYqPY52g9tnPzkAthVOs99Tw6DVe22vV2hcs7dXvtk+TxKy4IqMjZA77hiH8wMYcJur+o4R770mrVP4fP88x53EQ4PaayQIDAQAB-----END PUBLIC KEY-----'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputUserNameValue: '',
    inputPwasswordValue: ''
  },


  /**
   * Event登录
   */
  listenerLoginClick: function () {
    console.log("login")

    //this.data.inputUserNameValue, this.Rsa(this.data.inputPwasswordValue)
    var res = {
      "phone": null,
      "password": null,
      "type": 0,
      "leaderId": null
    }

    if (!this.verifyInput()) return false

    if (wx.getStorageSync("recommend_user_id")) {
      res.leaderId = wx.getStorageSync("recommend_user_id")
    };

    if (wx.getStorageSync("recommend_type")) {
      res.type = wx.getStorageSync("recommend_type")
      console.log("type"+res.type)
    };


    res.phone = this.data.inputUserNameValue
    res.password = this.Rsa(this.data.inputPwasswordValue)

    console.log(res)

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


  verifyInput() {
    if (!app.verifyPhone(this.data.inputUserNameValue)) {
      app.toast("请输入正确的电话号码")
      return false;
    }

    if (!app.verifyPwd(this.data.inputPwasswordValue)) {
      app.toast("请输入正确的密码")
      return false;
    }

    return true;
  },

  /**
   * Event 找回密码
   */
  listenerFindClick: function (e) {
    this.goFindPwdPage(this.data.inputUserNameValue)
  },

  /**
   * 注册
   */
  listenerRegisterClick: function (e) {
    this.goRegisterPage()
  },

  /**
   * 去找回密码页面
  */
  goFindPwdPage(phone) {
    if (phone) {
      wx.navigateTo({
        url: '../find/findPwd?phone=' + phone,
      })
    } else {
      wx.navigateTo({
        url: '../find/findPwd'
      })
    }

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
   * 去注册页面
   */
  goRegisterPage() {
    wx.navigateTo({
      url: '../register/register',
    })
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

})