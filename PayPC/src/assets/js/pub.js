(function (win, undefined) {
  //获取query
  var getQuaryVa = function (s) {
    var s = s || '';
    var arr = (s.split("?")[1] || s || '').split("&");
    var o = {};
    if (arr[0] == '') {
      return o
    }
    arr.forEach(function (x) {
      var ar = x.split("=");
      o[ar[0]] = ar[1]
    });
    return o
  };

  /*公钥加密*/
  var Rsa = function (key) { //encrypt
    var encrypt = new JSEncrypt(),
      publicKey = window.publicKey_pkcs1;
    encrypt.setPublicKey(publicKey);
    return encrypt.encrypt(key);
  };


  var decRsa = function (key) {
    // var decrypt_rsa = new RSA.RSAKey();
    // decrypt_rsa = RSA.KEYUTIL.getKey(publicKey_pkcs1);
    // console.log('解密RSA:')
    // console.log(decrypt_rsa)
    // var encStr = RSA.b64tohex(key)
    // var decStr = decrypt_rsa.decrypt(encStr)
    // console.log("解密结果：" + decStr)
    var encrypt = new JSEncrypt(),
      publicKey = window.privateKey_pkcs1;
    encrypt.setPublicKey(publicKey);
    return encrypt.decrypt(key)
  };

  /**
   * [toDouble 个位数字添0]
   * @param  {[type]} iNum [数字参数]
   */
  var toDouble = function (iNum) {
    if (iNum < 10) {
      return '0' + iNum;
    } else {
      return '' + iNum;
    }
  };
  /**
   * [setTime 通用时间格式转换]
   * @param {[type]} para [时间戳]
   */
  var setTime = function (para) {
    var newTime = new Date(para);
    var result = newTime.getFullYear() +
      "." + toDouble(newTime.getMonth() + 1) +
      "." + toDouble(newTime.getDate()) +
      " " + toDouble(newTime.getHours()) +
      ":" + toDouble(newTime.getMinutes()) + ":" + toDouble(newTime.getSeconds());

    return result;
  };

  /**
   * [setDate 通用日期格式转换]
   * @param {[type]} para [时间戳]
   */
  var setDate = function (para) {
    var newTime = new Date(para);
    var result = newTime.getFullYear() + "." + toDouble(newTime.getMonth() + 1) + "." + toDouble(newTime.getDate());
    return result;
  };


  win["getQuaryVa"] = getQuaryVa;
  win["Rsa"] = Rsa;
  win["decRsa"] = decRsa;
  win["setTime"] = setTime;
  win["setDate"] = setDate;

})(window);


window.publicKey_pkcs1 = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCBG3UFPAxh+a0NLv6Plvjo5YPDdnlbED8dI4GP21DdFKvXVFcPb0lSRrht5Xrg7ck4PJ/fovfSi7k8MYqPY52g9tnPzkAthVOs99Tw6DVe22vV2hcs7dXvtk+TxKy4IqMjZA77hiH8wMYcJur+o4R770mrVP4fP88x53EQ4PaayQIDAQAB';

window.privateKey_pkcs1 = 'MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAIEbdQU8DGH5rQ0u/o+W+Ojlg8N2eVsQPx0jgY/bUN0Uq9dUVw9vSVJGuG3leuDtyTg8n9+i99KLuTwxio9jnaD22c/OQC2FU6z31PDoNV7ba9XaFyzt1e+2T5PErLgioyNkDvuGIfzAxhwm6v6jhHvvSatU/h8/zzHncRDg9prJAgMBAAECgYAK2sod5IyN+DXqc9cHL4RB4HoRhvZxB46m3oNYGvJThBdmhTrEm3CosDV1V+Pa4WMXjVFLtiHr2795JhkmMRPhgwjJOO7w35SrzsxY1wKjoYsFCUfqLOB2SAVOg4JSMhW+tdvBWDKn4zlgDqmy8a6Uy759ZcuXhYA1psQYsIF5AQJBAOsv65P8C0ARqUs0OTxlK3wsQy58XqHDLiMRxrradv6QzWMwu0XVL7PkmytZY7xVouNx+gqraazgd+xOggooIdECQQCMiFWyx0F31B23ldzG4LYDCh2q6Pp9wcRu7ZWedSkOJRG5Y7lUpl+vzqyPspxTXcBQW/XaffMhZPZtiJyQRW95AkAYJAATXZCuD+IHtSGW4G+ZPFXdBKkWA5nNwbpbXadPM//RCaR/Y4WU+ocu6OsC3utsWzumMrgTJatJlzlj34CxAkAVvt7r7BNAVI1IpCLmj0z6yWzvzl88aGhZ9d+KBn0U2D2W30yFQb1aufNPxQaVi9M/XAt+BLFDgJj1OAdp96SZAkBhYn5HlnYKr1moGkMJ9DBGNW0lpPEke0GhwHfpWOQO1/WySjvRLaVPsyfGtHsZcg1fVYUwUd84tOmlYKLe1YnQ';

window.Regex = {
  phone: /0?(13|14|15|18|17)[0-9]{9}$/,
  password: /^[a-zA-Z0-9]{8,20}$/,//密码
  phonecode: /^[\d]{6}$/, //验证码
  realname: /^[\u4e00-\u9fa5]{2,10}$/,// 真实姓名
  identity: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)|(^\d{14}(\d|X|x)$)/,//身份证
  bankCard: /^[\d]{12,21}$/, //银行卡
  price: /^\d{1,12}(\.\d{1,2})?$/,
}



