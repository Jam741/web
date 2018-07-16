// develop.js

var app = getApp()

var pageNum = 1;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHideLoadMore: true,
    developInfo: {
      "developCount": 0
    },
    develops: null
  },


  /**
   * 打电话
   */
  listenerCallClick: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
    })
  },

  /**
   * Event 填写备注
   */
  listenerRmarkClick: function (e) {
    var item = this.data.develops[e.currentTarget.dataset.index]
    if (item.channelRemark) {
      wx.navigateTo({
        url: 'remark/remark?channelUserId=' + item.channelUserId + '&remark=' + item.channelRemark,
      })
    } else {
      wx.navigateTo({
        url: 'remark/remark?channelUserId=' + item.channelUserId,
      })
    }

  },



  /**
   * 获取简要信息
   */
  getDevelopSimple() {
    app.getDevelopSimple((res) => {
      this.setData({
        developInfo: res
      })
    })
  },

  /**
   * 获取列表数据
   */
  getDevelopList() {
    app.getDevelopList(pageNum, (res) => {
      this.onResponseLos(res.result)
    })
  },

  /**
   * 响应列表数据
  */
  onResponseLos(res) {
    this.setData({
      isHideLoadMore: true,
    })
    console.log("stopPullDownRefresh")
    wx.stopPullDownRefresh()


    var self = this;
    if (!res) return false;

    if (pageNum == 1) {
      var list = []
      for (var i = 0; i < res.length; i++) {
        res[i].date = app.transDate(res[i].relationTime)
        list.push(res[i]);
      }
      self.setData({
        develops: list
      })
    } else {
      var list = this.data.develops
      for (var i = 0; i < res.length; i++) {
        console.log(res[i])
        res[i].date = app.transDate(res[i].relationTime)
        list.push(res[i]);
      }
      this.setData({
        isHideLoadMore: true,
        develops: list
      })
    }
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    pageNum = 1
    this.getDevelopSimple()
    this.getDevelopList()
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    pageNum = 1
    this.getDevelopList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    pageNum++
    this.setData({
      isHideLoadMore: false
    })
    this.getDevelopList()
  },


  onShareAppMessage: function (res) {
    console.log("app.getUserId()" + app.getUserId())
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