// inputBankInfo.js  添加一张支付卡

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bankInfo: {
      "cardNO": "",
      "name": "",
      "idCardNO": "",
      "validDate": "",
      "mobilePhone": "",
      "amount": "",
      "cvv2": ""
    },
    tr_cardNO: '',
    cardlen: 0,
    userInputCardNo: ''
  },

  /**
   * Event 银行卡号码输入
   */
  listenerBankNOInput: function (e) {

    // var card = e.detail.value
    // var len = card.length

    // //判断用户是输入还是回删
    // if (len > this.data.cardlen) {
    //   //用户输入
    //   if ((len + 1) % 5 == 0) {
    //     card = card + ' '
    //   }
    // } else {
    //   //用户回删
    //   card = card.replace(/(^\s*)|(\s*$)/g, "")
    // }

    // //将处理后的值赋值到输入框
    // this.setData({
    //   'userInputCardNo': card
    // })


    // var cardNo = tr_cardNO.replace(/\s+/g, "")


    // this.setData({
    //   'cardlen': len,
    //   'bankInfo.cardNO': cardNo
    // })



    // var tr_cardNO = app.transCardNO(e.detail.value)
    // console.log(e.detail.value)
    // console.log(tr_cardNO)
    // var cardNo = tr_cardNO.replace(/\s+/g, "")
    // this.setData({
    //   'tr_cardNO': tr_cardNO,
    //   'bankInfo.cardNO': cardNo
    // })

    // console.log("card:" + this.data.bankInfo.cardNO)


    // var tr_cardNO = app.transCardNO(e.detail.value)
    // console.log(e.detail.value)
    // console.log(tr_cardNO)
    // var cardNo = tr_cardNO.replace(/\s+/g, "")
    this.setData({
      'bankInfo.cardNO': e.detail.value
    })
  },

  /**
   * Event 用户姓名输入
   */
  listenerNameInput: function (e) {
    this.setData({
      'bankInfo.name': e.detail.value
    })
  },


  /**
   * Event 身份证号码输入
   */
  listenerIdcardNoInput: function (e) {
    this.setData({
      'bankInfo.idCardNO': e.detail.value
    })
  },


  /**
   * Event 电话号码输入
   */
  listenerPhoneInput: function (e) {
    this.setData({
      'bankInfo.mobilePhone': e.detail.value
    })
  },


  /**
   * Event 信用卡有效期输入
   */
  listenerDateInput: function (e) {
    this.setData({
      'bankInfo.validDate': e.detail.value
    })
  },


  /**
   * Event CVV2号码输入
   */
  listenerCVV2Input: function (e) {
    this.setData({
      'bankInfo.cvv2': e.detail.value
    })
  },

  /**
   * Event 查看支持的银行
   */
  listenerViewSupportBankClick: function (e) {
    wx.navigateTo({
      url: '../../supportBank/supportBank',
    })
  },


  /**
   * Event 下一步按钮点击
   */
  listenerNextClick: function (e) {
    this.next()
  },

  /**
   * 下一步
   */
  next() {
    if (this.verifyInput()) {
      console.log(this.data.bankInfo)
      app.inputBankCardPay({
        "cardNO": app.Rsa(this.data.bankInfo.cardNO),
        "name": app.Rsa(this.data.bankInfo.name),
        "idCardNO": app.Rsa(this.data.bankInfo.idCardNO),
        "validDate": app.Rsa(this.data.bankInfo.validDate),
        "mobilePhone": app.Rsa(this.data.bankInfo.mobilePhone),
        "amount": this.data.bankInfo.amount,
        "cvv2": app.Rsa(this.data.bankInfo.cvv2)
      }, function (res) {
        wx.navigateTo({
          url: '../collectionSecond/collectionSecond?id=' + res.id + '&amount=' + res.amount + '&cardNO=' + res.cardNO,
        })
      })
    }
  },


  /**
   * 校验输入的数据
   */
  verifyInput() {
    if (!app.verifyBankNO(this.data.bankInfo.cardNO)) {
      app.toast("请输入正确的银行卡号")
      return false;
    } else if (!app.verifyName(this.data.bankInfo.name)) {
      app.toast("请输入正确的姓名")
      return false;
    } else if (!app.verifyIdcardNO(this.data.bankInfo.idCardNO)) {
      console.log(this.data.bankInfo.idCardNO)
      console.log(this.data.bankInfo.idCardNO.length)
      app.toast("请输入正确的身份证号码")
      return false;
    } else if (!app.verifyPhone(this.data.bankInfo.mobilePhone)) {
      app.toast("请输入正确的电话号码")
      return false;
    }
    return true;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'bankInfo.amount': options.amount
    })

  },
})