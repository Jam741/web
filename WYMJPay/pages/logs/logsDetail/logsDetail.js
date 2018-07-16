// logsDetail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      info:options
    })


    var date = app.transDate(options.transactionDate) + " " + app.transTime(options.transactionDate)
    var title = options.bankName + options.cardType + "（" + options.cardNO + "）"
    this.setData({
      'info.date':date,
      'info.title':title
    })

    console.log(this.data.info)

  },
})