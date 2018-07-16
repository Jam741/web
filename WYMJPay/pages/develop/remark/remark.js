// remark.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputRemark: '',
    channelUserId: 0,
    remark:null
  },


  /**
   * Event 输入监听
   */
  listenerRemarkInput: function (e) {
    this.setData({
      inputRemark: e.detail.value
    })
  },


  /**
   * 完成
   */
  listenerConfirmClick: function (e) {
    app.changeRemark({
      "channelUserId": this.data.channelUserId,
      "remark": this.data.inputRemark
    }, function (res) {
      wx.showToast({
        title: '完成',
        complete: function (res) {
          wx.navigateBack({

          })
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // if (options.remark) {
    //   this.setData({
    //     remark: options.remark
    //   })
    // }
    this.setData({
      remark: options.remark,
      channelUserId: options.channelUserId
    })

    console.log(this.data.remark)
  },

  onShareAppMessage: function (res) {
    return {
      title: '鹦鹉收款',
      path: `pages/index/index?user=${app.getUserId()}&type=${2}`,
      success: function (res) {
        console.log("转发成功")
      },
      fail: function (res) {
        console.log("转发失败")
      }
    }
  },

})