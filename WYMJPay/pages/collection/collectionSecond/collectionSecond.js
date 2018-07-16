// collectionSecond.js 快捷收款第二步 

var app = getApp()

var totalTime = 0


Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {
      "amount": 0,
      "cardNO": "",
      "id": 0,
    },
    inputSmsCodeValue: '',
    sendBtnDisable: true,
    enable: true,
    sendBtnText: "发送验证码"
  },

  /**
   * 输入短信验证码
   */
  listenerSmsCodeInput: function (e) {
    this.setData({
      inputSmsCodeValue: e.detail.value
    })

    console.log(this.data.inputSmsCodeValue)
  },

  /**
   * 确认提现
   */
  listenerConfirmClick: function (e) {
    console.log("confirm")
    if (this.verifyInput) {
      this.getMoney()
    }
  },


  /**
   * 提现
   */
  getMoney: function () {
    app.getMoney(this.data.info.id, this.data.inputSmsCodeValue, (res) => {
      this.didSuccess()
    })
  },


  didSuccess() {
    wx.showToast({
      title: '收款成功',
      icon: 'success',
      duration: 2000,
    })

    setTimeout(() => {
      wx.reLaunch({
        url: '../../index/index',
      })

    }, 3000)
  },


  /**
   * 发送短信验证码
   */
  listenerSendSmsCodeClick: function (e) {
    console.log("send")
    if (this.data.enable) {
      app.sendSmsCodeForPos(this.data.info.id, (res) => {
        totalTime = 60
        this.timeDown()
      })
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


  /**
   * 校验输入数据
   */
  verifyInput() {
    if (!app.verifySmsCode(this.data.inputSmsCodeValue)) {
      app.toast("请输入正确的验证码")
      return false;
    }
    return true;
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options)
    var optionCardNO = app.decRsa(options.cardNO)
    var cardNO = app.transCardNO(optionCardNO)
    this.setData({
      'info.id': options.id,
      'info.amount': options.amount,
      'info.cardNO': cardNO
    })

    console.log(this.data.info)
  },

  onShareAppMessage: function (res) {
    return {
      title: '鹦鹉收款',
      path: `pages/index/index?user=${app.getUserId()}&type=${app.getShareType()}`,
      success: function (res) {
        console.log("转发成功")
      },
      fail: function (res) {
        console.log("转发失败")
      }
    }
  },

})