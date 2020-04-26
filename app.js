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

    // 登录
    wx.login({
      success(res) {
        if (res.code) {
          wx.request({
            url: utils.getUrl('/api/login'),
            header: {
              "content-type": "application/json"
            },
            method: 'POST',
            data: {
              "username": "",
              "password": "",
              "usercode": res.code,
            },
            complete: function (res) {
              if (res == null || res.data == null) {
                utils.userShowInfo('网络请求失败');
                console.log('网络请求失败')
              } else if (data.state == 'success') {
                var data = JSON.parse(res.data);
                console.log(data.token)
                this.globalData.token = data.token;
              } else {
                var data = JSON.parse(res.data);
                utils.userShowInfo(data.message);
                console.log(data.reason);
              }
            }
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