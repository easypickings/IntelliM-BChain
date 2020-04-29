var utils = require("./utils.js");
var CONFIG = require("./config.js");

module.exports = {
  login: function (code) {
    if (CONFIG.useRootToken) 
      return "root";
    
    console.log('try to login.')
    wx.request({
      url: utils.getUrl('login'),
      header: {
        "content-type": "application/json"
      },
      method: 'POST',
      data: JSON.stringify({
        "username": "",
        "password": "",
        "usercode": code,
      }),
      success: function (res) {
        utils.dbgPrint(res);
        var data = res.data;
        if (data.state == 'success') {
          console.log(data.token)
          return data.token;
        } else {
          console.log(data.reason);
          throw data.message;
        }
      },
      fail: function (res) {
        console.log('登陆失败');
        throw "login failed";
      },
    })
  },

  getRecords: async function(token) {
    // record for test
    if (CONFIG.useTestRecord) {
      return utils.getTestRecord();
    }

    console.log('begin to download record')
    wx.request({
      url: utils.getUrl('download'),
      header: {
        "content-type": "application/x-www-form-urlencoded",
        "token": token,
      },
      method: 'POST',
      success: function (res) {
        var data = res.data;
        if (data.state == 'success') {
          utils.dbgPrint(data.values);
          return utils.readRecords(data.values);
        } else {
          console.log(data.reason);
          throw data.message;
        }
      },
      fail: function (res) {
        console.log(res);
        console.log('信息查询失败');
        throw '信息查询失败';
      },
    })
  }
}