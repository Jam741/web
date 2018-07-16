// logs.js

var app = getApp()

var pageNum = 1

var canRequest = true

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHideLoadMore: true,
    logs: null
  },

  getLogs() {
    app.getGeneralizeLog(pageNum, (res) => {
      this.onResponseLos(res)
    })
  },


  onLoad: function (options) {
    pageNum = 1
    this.getLogs()
  },


  listenerItemClick: function (e) {
    var image = e.currentTarget.dataset.img
    wx.navigateTo({
      url: 'voucher/voucher?imageUrl=' + image,
    })
  },


  /**
 * 响应获取的每日记录数据
 */
  onResponseLos(res) {

    this.setData({
      isHideLoadMore: true
    })
    wx.stopPullDownRefresh()
    if (!res) return false;

    if (canRequest) {
      canRequest = false
      if (pageNum == 1) {
        var list = []
        for (var i = 0; i < res.length; i++) {
          res[i].date = app.transDate(res[i].payDate)
          list.push(res[i]);
        }
        this.setData({
          logs: list
        })
        canRequest = true
      } else {
        var list = this.data.logs
        for (var i = 0; i < res.length; i++) {
          res[i].date = app.transDate(res[i].payDate)
          list.push(res[i]);
        }
        this.setData({
          isHideLoadMore: true,
          logs: list
        })
        canRequest = true
      }
    }



    console.log(this.data.logs)

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    pageNum = 1
    // console.
    console.log("onPullDownRefresh" + pageNum)
    this.getLogs()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    pageNum++
    this.setData({
      isHideLoadMore: true,
    })
    this.getLogs()
  },


})