// generalize.js
var app = getApp()

var pageNum = 1;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHideLoadMore: true,
    generalizeInfo: null,
    logs: null
  },


  /**
   * 查看提现记录
   */
  listenerCheckLog: function (e) {
    wx.navigateTo({
      url: 'logs/logs',
    })
  },


  /**
   * 申请提现
   */
  listenerGetMoneyClick: function (e) {

    if (this.data.generalizeInfo.canApplyMoney > 0) {

      app.applyGetMoney((res) => {
        wx.showModal({
          title: "提现申请已提交",
          content: `提现金额${this.data.generalizeInfo.canApplyMoney}元，平台会在三个工作日内处理您的提现申请`,
          showCancel: false,
          confirmText: "知道了",
          success:  (res) =>{
            if (res.confirm) {
              pageNum = 1
              this.getGeneralizeData()
              this.getLogsData()
            } 
          }
        })

      })
     
    }else{
      wx.showModal({
        title: "提交申请失败",
        content: `当前可提现金额为0元`,
        showCancel: false,
        confirmText: "知道了"
      })
    }

  },

  /**
   * 获取每日记录
   */
  getLogsData() {
    console.log("pageNum" + pageNum)
    app.getEveryDayLogsData(pageNum, (res) => {
      this.onResponseLos(res)
    })
  },


  /**
   * 获取页面简要信息
   */
  getGeneralizeData() {
    console.log("getGeneralizeData" + pageNum)
    app.getGeneralizeData((res) => {

      console.log("getGeneralizeData   === res")
      this.setData({
        generalizeInfo: res
      })
    })
  },


  /**
   * 响应获取的每日记录数据
   */
  onResponseLos(res) {
    var self = this;
    wx.stopPullDownRefresh()
    this.setData({
      isHideLoadMore: true,
    })
    if (!res) return false;
    console.log(res)
    if (pageNum == 1) {
      var list = []
      for (var i = 0; i < res.length; i++) {
        res[i].date = app.transDate(res[i].dateKey)
        list.push(res[i]);
      }
      self.setData({
        logs: res
      })
    } else {
      var list = this.data.logs
      for (var i = 0; i < res.length; i++) {
        res[i].date = app.transDate(res[i].dateKey)
        list.push(res[i]);
      }
      this.setData({
        isHideLoadMore: true,
        logs: list
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    pageNum = 1
    this.getGeneralizeData()
    this.getLogsData()

  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    pageNum = 1
    this.getGeneralizeData()
    this.getLogsData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("onReachBottom")
    pageNum++
    this.setData({
      isHideLoadMore: false
    })
    this.getLogsData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '鹦鹉收款',
      path: `pages/index/index?user=${app.getUserId()}&type=${1}`,
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