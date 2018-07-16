// bindBank.

var host = "http://192.168.28.130:8080"

var app = getApp()

Page({

  /**
 * 页面的初始数据
 */
  data: {
    bankNumber: '',
    userName: '',
    idCardNumber: '',
    phoneNumber: '',
    idcardInputFocus: false,
    phoneInputFocus: false,
    tr_cardNO:''
  },


  /**
   * Event 银行卡号输入
   */
  bindBankNumInput: function (e) {

    // var tr_cardNO = app.transCardNO(e.detail.value)
    // var cardNo = tr_cardNO.replace(/\s+/g, "")



    this.setData({
      bankNumber: e.detail.value
    })
  },

  /**
   * Event 用户名输入
   */
  bindUserNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },

  /**
   * Event 身份证号输入
   */
  bindIdcardInput: function (e) {
    this.setData({
      idCardNumber: e.detail.value
    })
  },

  /**
   * Event 手机号输入
   */
  bindPhoneInput: function (e) {
    this.setData({
      phoneNumber: e.detail.value
    })
  },

  /**
   * Event 键盘Done
   */
  listenerInputConfirm: function (e) {
    if (this.verifyInput()) {
      this.bindBankToSever()
    }
  },

  /**
  * Event 确认
  */
  listenerConfirm: function (e) {
    if (this.verifyInput()) {
      this.bindBankToSever()
    }
  },

  /**
  * Event 查看支持的银行卡列表
  */
  listenerViewSupportBank: function (e) {
    // console.log("查看银行卡列表")
    wx.navigateTo({
      url: '../../supportBank/supportBank',
    })
  },

  /**
  * 添加银行卡信息到服务器
  */
  bindBankToSever: function () {

    app.bindBankToSever({
      "cardNO": app.Rsa(this.data.bankNumber),
      "name": app.Rsa(this.data.userName) ,
      "idCardNO": app.Rsa(this.data.idCardNumber),
      "phone": app.Rsa(this.data.phoneNumber)
    },function(res){
      wx.redirectTo({
        url: '../collectionFirst/collectFirst',
      })
    })

  },


  /**
   * 检验输入的数据
   */
  verifyInput() {
    if (this.data.bankNumber.length < 15){
      app.toast("请输入正确的储蓄卡号")
      return false;
    }else if(this.data.userName <2 ){
      app.toast("请输入正确的姓名")
      return false;
    } else if (this.data.idCardNumber < 15){
      app.toast("请输入正确的身份证号")
      return false;
    } else if (this.data.phoneNumber < 11){
      app.toast("请输入正确的手机号码")
      return false;
    }
    return true;
  },
})