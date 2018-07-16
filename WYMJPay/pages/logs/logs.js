//logs.js
// var util = require('../../utils/util.js')

var pageNum = 1

var app = getApp()

Page({
  data: {
    isHideLoadMore: true,
    logs: null
  },

  listenerItemClick: function (e) {
    console.log(e.currentTarget.dataset.index)
    var item = this.data.logs[e.currentTarget.dataset.index]
    var title = item.bankName + item.cardType + "（" + item.cardNO.slice(-4) + "）"

    console.log(item.cardNO)
    wx.navigateTo({
      url: `logsDetail/logsDetail?bankName=${item.bankName}&cardType=${item.cardType}&transactionDate=${item.transactionDate}&amount=${item.amount}&serviceCharge=${item.serviceCharge}&arrivalAmount=${item.arrivalAmount}&cardNO=${item.cardNO}&bankLogo=${item.bankLogo}`,
    })


    // wx.navigateTo({
    //   url: 'logsDetail/logsDetail',
    // })
  },

  onLoad: function (option) {
    this.getLogs()
  },


  getLogs() {
    app.getPosLog(pageNum, (res) => {
      this.onResponseLos(res)
    })
  },

  /**
   * 响应获取的每日记录数据
   */
  onResponseLos(res) {
    wx.stopPullDownRefresh()
    this.setData({
      isHideLoadMore: true,
    })
    if (!res) return false;
    if (pageNum == 1) {
      var list1 = [];
      for (var i = 0; i < res.length; i++) {
        res[i].date = app.transDate(res[i].transactionDate)
        res[i].time = app.transTime(res[i].transactionDate)
        res[i].cardNO = app.decRsa(res[i].cardNO).slice(-4)
        list1.push(res[i]);
      }
      this.setData({
        logs: list1
      })
    } else {

      console.log("=======xxxxx=======")
      var list = this.data.logs
      for (var i = 0; i < res.length; i++) {
        res[i].date = app.transDate(res[i].transactionDate)
        res[i].time = app.transTime(res[i].transactionDate)
        res[i].cardNO = app.decRsa(res[i].cardNO).slice(-4)
        list.push(res[i]);
      }
      this.setData({
        logs: list
      })
    }

    console.log("stopPullDownRefresh")
    console.log(this.data.logs)
  },



  /**
   * 下拉刷新
   */
  onPullDownRefresh: function () {
    pageNum = 1
    // console.
    console.log("onPullDownRefresh" + pageNum)
    this.getLogs()
  },


  /**
   * 上拉加载更多
   */
  onReachBottom: function () {
    console.log("onReachBottom" + pageNum)
    pageNum + 1
    this.setData({
      isHideLoadMore: true,
    })
    this.getLogs()

  }
})
