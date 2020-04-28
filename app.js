var utils = require('./utils/utils.js')

//app.js
App({
  globalData: {
    url: 'unknown',
    userInfo: null,
    token: 'null'
  },

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;

    // 登录
    wx.login({
      success(res) {
        if (res.code) {
          wx.request({
            url: utils.getUrl('login'),
            header: {
              "content-type": "application/json"
            },
            method: 'POST',
            data: JSON.stringify({
              "username": "",
              "password": "",
              "usercode": res.code,
            }),
            success: function (res) {
              /* tmp token */
              // that.globalData.token = "root";
              // return;

              console.log(res);
              var data = res.data;
              if (data.state == 'success') {
                console.log(data.token)
                that.globalData.token = data.token;
              } else {
                utils.userShowInfo(data.message);
                console.log(data.reason);
              }
            },
            fail: function (res) {
              utils.userShowInfo('登陆失败');
              console.log('登陆失败')
            },
          })
        }
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
})
