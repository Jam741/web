// voucher.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "imageUrl":''
  },


  listenerItemClick:function(e){
    wx.navigateTo({
      url: 'voucher/voucher?imageUrl',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
      this.setData({
        imageUrl: options.imageUrl
      })
  },
})