// collectFirst.js 快捷收款第一步 录入支付信息

var app = getApp()

var exp = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedBankNO: -1,
    inputAmountValue: 0,
    staticFeeAmount:0,
    bankBaseInfo: null,
    payFee: 0.00,
    finalAmount: 0.00
  },


  /**
   * Event 金额输入
   */
  listenerAmountInput: function (e) {
    this.setData({
      inputAmountValue: e.detail.value
    })




    if (exp.test(this.data.inputAmountValue) && this.data.inputAmountValue >= 10) {
      var thisFee = (this.data.inputAmountValue * this.data.bankBaseInfo.poundageRate / 100).toFixed(2)
     
      var staticFeeAmount = this.data.bankBaseInfo.poundage
      this.setData({
        payFee: thisFee,
        staticFeeAmount: staticFeeAmount
      })


      var thisFinalAmount = (this.data.inputAmountValue - thisFee - this.data.bankBaseInfo.poundage).toFixed(2)
      this.setData({
        finalAmount: thisFinalAmount
      })
    }else{
      this.setData({
        payFee:0,
        finalAmount:0,
        staticFeeAmount:0
      })
    }


  },


  /**
   * Event 付款方式选择
   */
  listenerRadioChange: function (e) {
    this.setData({
      selectedBankNO: e.detail.value
    })
  },


  /**
   * Event 下一步
   */
  listenerNextClick() {
    console.log("Next")

    if (!exp.test(this.data.inputAmountValue)) {
      app.toast("金额错误，小数点后最多输入两位")
      return false;
    }

    if (this.data.inputAmountValue < 10 || this.data.inputAmountValue > 50000) {
      app.toast("金额错误，每笔限额10 - 50000元")
    } else {
      console.log()
      if (this.data.selectedBankNO == -1) {
        //新银行卡支付
        this.goInputBankPage(this.data.inputAmountValue)
      } else {
        //选择银行卡支付
        app.selectBankCardPay({
          "id": this.data.selectedBankNO,
          "amount": this.data.inputAmountValue
        }, (res) => {
          this.goCollectSecondPage(res)
        })
      }
    }

  },


  //去收款的第第二个页面
  goCollectSecondPage(res) {
    console.log(res)
    wx.navigateTo({
      url: '../collectionSecond/collectionSecond?id=' + res.id + '&amount=' + res.amount + '&cardNO=' + res.cardNO,
    })
  },


  /**
 * 去添加一张付款银行卡页面
 */
  goInputBankPage(amount) {
    wx.navigateTo({
      url: '../inputBankInfo/inputBankInfo?amount=' + amount,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.getBankBaseInfo(true, (res) => {

      if (res.cardBaseInfos) {
        for (var i = 0; i < res.cardBaseInfos.length; i++) {
          res.cardBaseInfos[i].tr_cardNO = app.transCardNO(app.decRsa(res.cardBaseInfos[i].cardNO))
        }
      }

      this.setData({
        bankBaseInfo: res
      })


    })
  },

})