var utils = require('./utils/utils');
var server = require('./utils/server');
var PR = require('./utils/promisify')

//app.js
App({
  globalData: {
    url: 'unknown',
    userInfo: null,
    token: null,
  },

  onLaunch: async function () {
    // 展示本地存储能力
    /*var logs = await PR.getStorageSync('logs') || []
    logs.unshift(Date.now())
    await PR.setStorageSync('logs', logs);
    console.log("hhhhh");*/
    // await this.userLogin();
  },

  userLogin: async function() {
    var that = this;
    // 登录
    try {
      var res = await PR.login();
      console.log(res);
      if (res.code) {
        try {
          var token = await server.login(res.code);
          that.globalData.token = token;
        } catch (e) {
          utils.userShowInfo(e);
        }
      }
    } catch (e) {
      console.log(e);
      console.log("微信登陆失败");
    }

    // 获取用户信息
    try {
      var res = await PR.getSettings();
      if (res.authSetting['scope.userInfo']) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        try {
          var res = await PR.getUserInfo();
          this.globalData.userInfo = res.userInfo;
          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback(res);
          }
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

})