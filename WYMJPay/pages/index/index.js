//index.js
//获取应用实例
var app = getApp()
Page({

  data: {
    motto: 'Hello World',
    userInfo: {},
    bankBaseInfo: {},
    loginStatus: false,
    myCardNO: ''
  },


  /**
   * Event 登录按钮被点击
   */
  listenerLoginClick: function (e) {
    app.goLogin()
  },

  /**事件处理函数 */
  //Event快捷收款
  quickCollection: function () {
    if (app.userPrecondition()) {
      if (this.data.bankBaseInfo && this.data.bankBaseInfo.bindCard) {
        app.goCollectFirstPage()
      } else {
        app.goBindBankPage()
      }
    }

    // app.goCollectSecondPage({
    //   "amount": 1000,
    //   "cardNO": "345898765465789",
    //   "id": 80
    // })
    // app.goBindBankPage()
    // app.goInputBankPage(110)
    // app.goCollectFirstPage()
    // if (app.userPrecondition()){
    //   app.goBindBankPage()
    // }
  },

  //Event查看收款记录
  checkCollectionNote: function () {
    if (app.userPrecondition()) {
      wx.navigateTo({
        url: '../logs/logs',
      })
    }

  },

  //Event功能说明
  functionDescription: function () {
    console.log("function description")
    wx.navigateTo({
      url: '../illustrate/functionIllustrate',
    })
  },


  /**
   * 推广快捷收款
   */
  listenerGeneralizeClick: function () {
    wx.navigateTo({
      url: '../generalize/generalize',
    })
  },


  /**
   * 发展渠道商
   */
  listenerDevelopClick: function () {
    wx.navigateTo({
      url: '../develop/develop',
    })
  },


  onLoad: function (option) {
    console.log('onLoad')
    if (option.user) {
      wx.setStorageSync("recommend_user_id", option.user)
    };

    if (option.type) {
      wx.setStorageSync("recommend_type", option.type)
    }
  },


  onShow: function () {

    var desc = "c40aw6gtzKdLLnWGUVEo7bH+LifUnLKyshGLzcxOSl181U/IuHSls5VhKnzj87NBRJTs+5MgMdX3VgC5OplHbSatk1MVfmYp9tAlppDtjAexSI8Jwd6A5MB5LXDS8gwlf8290LZ5RJswTCpMkIvJ+ywmz1L680cSnPdp2gB0b68="

    // var ss = app.Rsa(desc)
    console.log("=====")
    var rr = app.decRsa(desc)
    console.log(rr)

    var that = this
    //调用应用实例的方法获取全局数据
    app.getBankBaseInfo(true, (res) => {
      that.setData({
        loginStatus: true,
        bankBaseInfo: res
      })



      if (this.data.bankBaseInfo.getMoneyCard) {
        // console.log()
        var cardNOrsa = this.data.bankBaseInfo.getMoneyCard.cardNO
        var cardNO = app.decRsa(cardNOrsa)
        console.log("==========")
        console.log(cardNOrsa)

        var tr_cardNO = app.transCardNO(cardNO)
        console.log(tr_cardNO)
        this.setData({
          'bankBaseInfo.getMoneyCard.tr_cardNO': tr_cardNO
        })
      }
    }, (error) => {
      that.setData({
        loginStatus: false,
        bankBaseInfo: null
      })
    })


    var s = "ZmFhJPq1T6iG41jDLIc="

    console.log(s)
    var result = app.decRsaTest(s)
    console.log(result)

  },

  onShareAppMessage: function (res) {
    return {
      title: '鹦鹉收款',
      path: `pages/index/index?user=${app.getUserId()}&type=${app.getShareType()}`,
      imageUrl: 'http://osz2pnx97.bkt.clouddn.com/xiaochengxu_share.png',
      success: function (res) {
        console.log("转发成功")
      },
      fail: function (res) {
        console.log("转发失败")
      }
    }
  },
})
