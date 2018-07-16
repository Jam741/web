//app.js
// const loginUrl = require('/config').config.loginUrl
// var host = "http://192.168.28.16:8188/"
// var host = "http://192.168.28.161:8188"
var host = "http://192.168.28.130:8080"

// var host = "https://pos.yingwumeijia.com"
// var host = "https://devcustomer.yingwumeijia.com"

var RSA = require('/utils/wxapp_rsa.js')

var publicKey_pkcs1 = '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCBG3UFPAxh+a0NLv6Plvjo5YPDdnlbED8dI4GP21DdFKvXVFcPb0lSRrht5Xrg7ck4PJ/fovfSi7k8MYqPY52g9tnPzkAthVOs99Tw6DVe22vV2hcs7dXvtk+TxKy4IqMjZA77hiH8wMYcJur+o4R770mrVP4fP88x53EQ4PaayQIDAQAB-----END PUBLIC KEY-----'

var privateKey_pkcs1 = '-----BEGIN PRIVATE KEY-----MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAIEbdQU8DGH5rQ0u/o+W+Ojlg8N2eVsQPx0jgY/bUN0Uq9dUVw9vSVJGuG3leuDtyTg8n9+i99KLuTwxio9jnaD22c/OQC2FU6z31PDoNV7ba9XaFyzt1e+2T5PErLgioyNkDvuGIfzAxhwm6v6jhHvvSatU/h8/zzHncRDg9prJAgMBAAECgYAK2sod5IyN+DXqc9cHL4RB4HoRhvZxB46m3oNYGvJThBdmhTrEm3CosDV1V+Pa4WMXjVFLtiHr2795JhkmMRPhgwjJOO7w35SrzsxY1wKjoYsFCUfqLOB2SAVOg4JSMhW+tdvBWDKn4zlgDqmy8a6Uy759ZcuXhYA1psQYsIF5AQJBAOsv65P8C0ARqUs0OTxlK3wsQy58XqHDLiMRxrradv6QzWMwu0XVL7PkmytZY7xVouNx+gqraazgd+xOggooIdECQQCMiFWyx0F31B23ldzG4LYDCh2q6Pp9wcRu7ZWedSkOJRG5Y7lUpl+vzqyPspxTXcBQW/XaffMhZPZtiJyQRW95AkAYJAATXZCuD+IHtSGW4G+ZPFXdBKkWA5nNwbpbXadPM//RCaR/Y4WU+ocu6OsC3utsWzumMrgTJatJlzlj34CxAkAVvt7r7BNAVI1IpCLmj0z6yWzvzl88aGhZ9d+KBn0U2D2W30yFQb1aufNPxQaVi9M/XAt+BLFDgJj1OAdp96SZAkBhYn5HlnYKr1moGkMJ9DBGNW0lpPEke0GhwHfpWOQO1/WySjvRLaVPsyfGtHsZcg1fVYUwUd84tOmlYKLe1YnQ-----END PRIVATE KEY-----'

var userInfoUrl = `${host}/customer/getCustomerDetail`

var loginUrl = `${host}/user/login`

var bindBankUrl = `${host}/pos/bingCard`

var bankBaseInfoUrl = `${host}/pos/quickGetMoney`

var inputBankCardUrl = `${host}/pos/writeCard`

var selectBankCardUrl = `${host}/pos/selectCard`

var pageSize = 10

App({

  getHost: function () {
    return host;
  },

  pageSize: function () {
    return 10;
  },

  onLaunch: function () {
    //调用API从本地缓存中获取数据

    console.log(host)
    var logs = wx.getStorageSync('logs') || []


    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  userPrecondition() {
    var that = this
    if (this.globalData.isLogin) {
      return true
    } else {
      that.goLogin()
      return false
    }
  },

  getUserInfo: function (cb) {
    var that = this
    // if (this.globalData.userInfo) {
    typeof cb == "function" && cb(this.globalData.userInfo)
    // } else {

    // //获取用户信息
    // wx.request({
    //   url: userInfoUrl,
    //   header: that.getHeaderInfo(),
    //   success: function (res) {
    //     if (res.data.succ) {
    //       that.globalData.isLogin = true
    //       that.globalData.userInfo = res.data.data
    //     } else {
    //       that.globalData.userInfo = null
    //       that.globalData.isLogin = false
    //     }
    //     console.log(res.data.message)
    //     typeof cb == "function" && cb(that.globalData.userInfo)
    //   }, fail: function (eror) {
    //     that.netError()
    //   }
    // })
    //调用登录接口
    // wx.getUserInfo({
    //   withCredentials: false,
    //   success: function(res) {
    //     that.globalData.userInfo = res.userInfo
    //     typeof cb == "function" && cb(that.globalData.userInfo)
    //   }
    // })
    // }
  },



  /**
   * 用户登录
   */
  doLogin: function (res, cb) {
    this.showLoding()
    var that = this
    console.log(res)
    wx.request({
      url: loginUrl,
      method: 'POST',
      data: res,
      success: function (res) {
        if (res.data.succ) {
          that.globalData.userInfo = res.data.data
          that.globalData.isLogin = true
          that.putUserId(res.data.data.customerDto.id)
          that.putSessionInfo(res.data.data.customerDto.userSession)
          typeof cb == "function" && cb(that.globalData.userInfo)
        } else {
          that.apiError(res)
        }
      }, fail: function (error) {
        that.netError()
      }, complete: function () {
        that.hideLoading()
      }

    })
  },


  /**
   * 找回密码
   */
  findPwd: function (res, cb) {
    this.showLoding()
    var that = this
    wx.request({
      url: `${host}/user/getBackPassword`,
      method: 'POST',
      data: res,
      success: function (res) {
        console.log(res)
        if (res.data.succ) {
          typeof cb == "function" && cb(res.data.data)
        } else {
          that.apiError(res)
        }
      }, fail: function (error) {
        that.netError()
      }, complete: function () {
        that.hideLoading()
      }

    })
  },


  /**
   * 注册
   */
  register: function (res, cb) {
    console.log(res)
    this.showLoding()
    var that = this
    wx.request({
      url: `${host}/user/register`,
      method: 'POST',
      data: res,
      success: function (res) {
        console.log(res)
        if (res.data.succ) {
          typeof cb == "function" && cb(res.data.data)
        } else {
          that.apiError(res)
        }
      }, fail: function (error) {
        that.netError()
      }, complete: function () {
        that.hideLoading()
      }

    })
  },



  /**
   * 发送短信验证码
   */
  sendSmsCodeForUser: function (res, cb) {
    this.showLoding()
    var that = this
    wx.request({
      url: `${host}/user/sendSmsCode`,
      method: 'POST',
      header: {
        'content-type': "application/x-www-form-urlencoded",
      },
      data: res,
      success: function (res) {
        console.log(res)
        if (res.data.succ) {
          typeof cb == "function" && cb(res.data.data)
        } else {
          that.apiError(res)
        }
      }, fail: function (error) {
        that.netError()
      }, complete: function () {
        that.hideLoading()
      }

    })
  },

  //用户基本信息
  globalData: {
    userInfo: null,
    isLogin: false,
    bankBaseInfo: null  //用户银行卡基础信息
  },


  /**
   * 获取用户银行基础信息
   */
  getBankBaseInfo: function (dialog, cb, err) {
    var that = this
    // if (this.globalData.bankBaseInfo) {
    //   typeof cb == "function" && cb(that.globalData.bankBaseInfo)
    // } else {
    if (dialog) { that.showLoding() }
    wx.request({
      url: bankBaseInfoUrl,
      header: that.getHeaderInfo(),
      method: 'GET',
      success: function (res) {
        console.log(res)
        if (res.data.succ) {
          that.globalData.bankBaseInfo = res.data.data
          that.globalData.isLogin = true
          if (res.data.data.showDevelop) {
            that.setShareType(2)
          }
          typeof cb == "function" && cb(that.globalData.bankBaseInfo)
        } else {
          that.globalData.isLogin = false
          typeof err == "function" && err(res)
        }
      },
      fail: function ({ error }) {
        that.globalData.isLogin = false
        console.log(error)
        that.netError()
      },
      complete: function () {
        console.log("complete")
        if (dialog) { that.hideLoading() }
      }
    })
    // }
  },


  setShareType(type) {
    wx.setStorageSync("share_type", type)
  },


  getShareType() {
    if (wx.getStorageSync("share_type"))
      return wx.getStorageSync("share_type")
    else
      return 1
  },

  /**
   * 获取POS记录
   */
  getPosLog: function (pageNum, cb) {
    var that = this
    wx.request({
      url: `${host}/pos/records/${pageNum}/${pageSize}`,
      header: that.getHeaderInfo(),
      success: function (res) {
        if (res.data.succ) {
          typeof cb == "function" && cb(res.data.data)
        } else {
          that.apiError(res)
        }
      }, fail: function (error) {
        that.netError()
      },
      complete: function () {
      }
    })
  },


  /**
   * 获取提现记录
   */
  getGeneralizeLog: function (pageNum, cb) {
    var that = this
    wx.request({
      url: `${host}/pos/spread/applied/record`,
      header: that.getHeaderInfo(),
      data: {
        'pageNum': pageNum,
        'pageSize': pageSize
      },
      success: function (res) {
        console.log(res)
        if (res.data.succ) {
          typeof cb == "function" && cb(res.data.data)
        } else {
          that.apiError(res)
        }
      }, fail: function (error) {
        that.netError()
      },
      complete: function () {
      }
    })
  },

  /**
   * 添加一张银行卡支付
   */
  inputBankCardPay: function (res, cb) {
    this.showLoding()
    var that = this
    wx.request({
      url: inputBankCardUrl,
      method: 'POST',
      header: that.getHeaderInfo(),
      data: res,
      success: function (res) {
        if (res.data.succ) {
          typeof cb == "function" && cb(res.data.data)
        } else {
          that.apiError(res)
        }
      }, fail: function (error) {
        that.netError()
      },
      complete: function () {
        that.hideLoading()
      }
    })
  },


  /**
   * 绑定收款银行卡
   */
  bindBankToSever: function (res, cb) {
    console.log("绑定银行卡")
    console.log(res)
    // 绑定收款银行卡
    this.showLoding()
    var that = this
    wx.request({
      url: `${host}/pos/bingCard`,
      method: 'POST',
      header: that.getHeaderInfo(),
      data: res,
      success: function (res) {
        if (res.data.succ) {
          typeof cb == "function" && cb(res.data.data)
        } else {
          that.apiError(res)
        }
      }, fail: function (error) {
        that.netError()
      }, complete: function () {
        that.hideLoading()
      }
    })

  },


  /**
   * 选择一张银行卡支付
   */
  selectBankCardPay: function (res, cb) {
    this.showLoding()
    var that = this
    wx.request({
      url: selectBankCardUrl,
      method: 'POST',
      header: that.getHeaderInfo(),
      data: res,
      success: function (res) {
        if (res.data.succ) {
          typeof cb == "function" && cb(res.data.data)
        } else {
          that.apiError(res)
        }
      }, fail: function (error) {
        that.netError()
      },
      complete: function () {
        that.hideLoading()
      }

    })
  },


  /**
   * 提现
   */
  getMoney(recordId, smsCode, cb) {
    console.log(recordId)
    console.log(smsCode)

    var that = this
    this.showLoding()
    wx.request({
      url: `${host}/pos/getMoney/${recordId}`,
      method: 'POST',
      header: that.getHeaderInfoPOST(),
      data: {
        "smsCode": smsCode
      },
      success: function (res) {
        that.hideLoading()
        if (res.data.succ) {
          typeof cb == "function" && cb(res.data.data)
        } else {
          that.apiError(res)
        }
      }, fail: function (error) {
        that.hideLoading()
        that.netError()
      }, complete: function () {
      }

    })
  },


  /**
   * 发送短信验证码 POS
   */
  sendSmsCodeForPos(recordId, cb) {
    var that = this
    this.showLoding()
    wx.request({
      url: `${host}/pos/getSmsCode/${recordId}`,
      method: 'POST',
      header: that.getHeaderInfo(),
      success: function (res) {
        if (res.data.succ) {
          typeof cb == "function" && cb(res.data.data)
        } else {
          that.apiError(res)
        }
      }, fail: function (error) {
        that.netError()
      }, complete: function () {
        that.hideLoading()
      }
    })
  },


  /**
   * 获取推广简要信息
   */
  getGeneralizeData(cb) {
    var that = this;
    wx.request({
      url: `${host}/pos/spread/general`,
      header: that.getHeaderInfo(),
      success: function (res) {
        console.log(res)
        if (res.data.succ) {
          typeof cb == "function" && cb(res.data.data)
        } else {
          that.apiError(res)
        }
      }, fail: function (error) {
        that.netError()
      }, complete: function () {
      }
    })
  },

  /**
   * 获取推广每日提现记录
   */
  getEveryDayLogsData(pageNum, cb) {
    console.log(pageNum)
    var that = this;
    wx.request({
      url: `${host}/pos/spread/statistics`,
      header: that.getHeaderInfo(),
      data: {
        "pageNum": pageNum,
        "pageSize": pageSize
      },
      success: function (res) {
        if (res.data.succ) {
          typeof cb == "function" && cb(res.data.data)
        } else {
          that.apiError(res)
        }
      }, fail: function (error) {
        that.netError()
      }, complete: function () {
      }
    })
  },

  /**
   * 申请提现
   */
  applyGetMoney(cb) {
    var that = this
    this.showLoding()
    wx.request({
      url: `${host}/pos/spread/apply`,
      header: that.getHeaderInfo(),
      method: 'POST',
      success: function (res) {
        if (res.data.succ) {
          typeof cb == "function" && cb(res.data.data)
        } else {
          that.apiError(res)
        }
      }, fail: function (error) {
        console.log("fail")
        that.netError()
      }, complete: function () {
        console.log("completed")
        that.hideLoading()
      }
    })
  },



  /**
   * 获取渠道商列表
   */
  getDevelopList(pageNum, cb) {
    var that = this
    wx.request({
      url: `${host}/pos/develop`,
      header: that.getHeaderInfo(),
      data: {
        'pageNum': pageNum,
        'pageSize': pageSize
      },
      success: function (res) {
        console.log(res)
        if (res.data.succ) {
          typeof cb == "function" && cb(res.data.data)
        } else {
          that.apiError(res)
        }
      }, fail: function (error) {

      }, complete: function () {

      }
    })
  },


  /**
   * 获取渠道商简要信息
   */
  getDevelopSimple(cb) {
    var that = this
    wx.request({
      url: `${host}/pos/develop/general`,
      header: that.getHeaderInfo(),
      success: function (res) {
        console.log(res)
        if (res.data.succ) {
          typeof cb == "function" && cb(res.data.data)
        } else {
          that.apiError(res)
        }
      }, fail: function (error) {
        console.log("fail")
        that.netError()
      }, complete: function () {
        console.log("completed")
      }
    })
  },


  /**
   * 格式化日期
   */
  transDate(mescStr) {
    var n = mescStr * 1;
    var date = new Date(n);
    var Y = date.getFullYear() + '.';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return (Y + M + D)
  },


  /**
   * 格式化时间
   */
  transTime(mescStr) {
    var n = mescStr * 1;
    var date = new Date(n);
    var H = date.getHours() + ':';
    var m = (date.getMinutes() + 1 < 10 ? '0' + (date.getMinutes() + 1) : date.getMinutes() + 1) + ':';
    var S = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return (H + m + S)
  },


  /**
   * 格式化银行卡号
   */
  transCardNO(cardNO){
    return cardNO.replace(/[\s]/g, '').replace(/(\d{4})(?=\d)/g, "$1 ")
  },

  /**
   * 修改备注
   */
  changeRemark(res, cb) {
    var that = this
    this.showLoding()

    wx.request({
      url: `${host}/pos/develop/updateRemark`,
      header: that.getHeaderInfo(),
      method: 'POST',
      data: res,
      success: function (res) {
        if (res.data.succ) {
          typeof cb == "function" && cb(res.data.data)
        } else {
          that.apiError(res)
        }
      }, fail: function (error) {
        console.log("fail")
        that.netError()
      }, complete: function () {
        console.log("completed")
        that.hideLoading()
      }
    })
  },

  /**
   * 显示弹窗信息
   */
  toast(msg) {
    wx.showModal({
      title: '提示',
      content: msg,
      success: function (res) {
        console.log(res)
      },
      showCancel: false,
      confirmText: "知道了",
      confirmColor: "#2a7ae8"
    })
  },

  /**
   * 显示加载弹窗
   */
  showLoding: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
  },


  /**
   * 隐藏加载弹窗
   */
  hideLoading: function () {
    wx.hideLoading()
  },

  /**
   * 网络请求失败的操作
   */
  netError: function () {
    wx.showModal({
      title: '错误',
      content: '网络请求失败',
      showCancel: false,
      confirmText: "知道了",
      confirmColor: "#2a7ae8"
    })
  },


  /**
   * 服务器返回错误的操作
   */
  apiError: function (res) {
    var that = this;

    console.log(res)
    if (res.data.stateCode == 317) {
      that.globalData.isLogin = false
      that.goLogin()
    } else if (res.data.stateCode == 312) {
      that.globalData.isLogin = false
      that.goLogin()
    } else {
      wx.showModal({
        title: '错误',
        content: res.data.message,
        showCancel: false,
        confirmText: "知道了",
        confirmColor: "#2a7ae8"
      })
    }
  },

  /**
   * get account convent header
   */
  getHeaderInfo() {
    return {
      // 'access-token': '108aaaf870e6221d347b4b57dd713d31',
      // 'sessionId': 'c155',
      'access-token': wx.getStorageSync("access-token"),
      'session-id': wx.getStorageSync('sessionId'),
    }
  },

  getHeaderInfoPOST() {
    return {
      'content-type': "application/x-www-form-urlencoded",
      'access-token': wx.getStorageSync("access-token"),
      'session-id': wx.getStorageSync('sessionId'),
    }
  },

  /**
   * 校验密码格式
   */
  verifyPwd(pwd) {
    if (pwd.length < 8 || pwd.length > 20) {
      return false;
    }
    return true;
  },


  /**
   * 校验手机号码
   */
  verifyPhone(phone) {
    if (phone.length != 11) {
      return false;
    }
    return true;
  },


  /**
   * 校验短信验证码
   */
  verifySmsCode(smsCode) {
    if (smsCode.length != 6) {
      return false;
    }
    return true;
  },

  /**
   * 校验姓名
   */
  verifyName(name) {
    if (name.length < 2) {
      return false;
    }
    return true;
  },

  /**
   * 检验身份证号码
   */
  verifyIdcardNO(idcardNO) {
    if (idcardNO.length != 15 && idcardNO.length != 18) {
      return false;
    }
    return true;
  },


  /**
   * 校验银行卡号
   */
  verifyBankNO(bankNO) {
    if (bankNO.length < 16 || bankNO.length > 21) {
      return false;
    }
    return true;
  },

  /**
   * put account 
   */
  putSessionInfo(res) {
    wx.setStorageSync('access-token', res.accessToken)
    wx.setStorageSync('sessionId', res.sessionId)
  },


  putUserId(userId) {
    wx.setStorageSync('user_id', userId)
  },

  getUserId() {
    return wx.getStorageSync('user_id')
  },

  //去登录页面
  goLogin() {
    wx.navigateTo({
      url: '../user/login/login',
    })
  },


  //去绑定收款银行卡页面
  goBindBankPage() {
    wx.navigateTo({
      url: '../collection/bindBank/bindBank',
    })
  },

  //去收款的第一个页面
  goCollectFirstPage() {
    wx.navigateTo({
      url: '../collection/collectionFirst/collectFirst',
    })
  },

  /**
   * 去添加一张付款银行卡页面
   */
  goInputBankPage(amount) {
    wx.navigateTo({
      url: '../collection/inputBankInfo/inputBankInfo?amount=' + amount,
    })
  },

  //去收款的第二个页面
  goCollectSecondPage(res) {
    console.log(res)
    wx.navigateTo({
      url: '../collection/collectionSecond/collectionSecond?id=' + res.id + '&amount=' + res.amount + '&cardNO=' + res.cardNO,
    })
  },

  /**
   * 去支持的银行卡列表页面
   */
  goSupportBank() {
    console.log("去支持的银行卡列表页面")
  },



  /**
     * [Rsa 加密]
     * @param {[type]} key [description]
     */
  Rsa: function (key) {
    var encrypt_rsa = new RSA.RSAKey();
    encrypt_rsa = RSA.KEYUTIL.getKey(publicKey_pkcs1);
    console.log('加密RSA:')
    console.log(encrypt_rsa)
    var encStr = encrypt_rsa.encrypt(key)
    encStr = RSA.hex2b64(encStr);
    console.log("加密结果：" + encStr)
    return encStr;
  },


  /**
     * [Rsa 解密]
     * @param {[type]} key [description]
     */
  decRsa:function(key){
    // 解密
    var decrypt_rsa = new RSA.RSAKey();
    decrypt_rsa = RSA.KEYUTIL.getKey(privateKey_pkcs1);
    console.log('解密RSA:')
    console.log(decrypt_rsa)
    var encStr = RSA.b64tohex(key)
    var decStr = decrypt_rsa.decrypt(encStr)
    console.log("解密结果：" + decStr)
    return decStr
  },


   /**
     * [Rsa 解密]
     * @param {[type]} key [description]
     */
  decRsaTest: function (key) {
    // 解密
    var decrypt_rsa = new RSA.RSAKey();
    decrypt_rsa = RSA.KEYUTIL.getKey(publicKey_pkcs1);
    console.log('解密RSA:')
    console.log(decrypt_rsa)
    var encStr = RSA.b64tohex(key)
    var decStr = decrypt_rsa.decrypt(encStr)
    console.log("解密结果：" + decStr)
    return decStr
  }
})
