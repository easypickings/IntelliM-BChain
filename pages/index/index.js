var utils = require('../../utils/utils.js')
const app = getApp()

Page({
  data: {
    logs: [],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    records: [],
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.downloadRecord();
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    console.log(this.userInfo)
  },

  downloadRecord: function (e) {
    var that = this;

    console.log('begin to download record')
    wx.request({
      url: utils.getUrl('download'),
      header: {
        "content-type": "application/x-www-form-urlencoded",
        "token": "root", // app.globalData.token,
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
        var data = res.data;
        if (data.state == 'success') {
          console.log(data.values)
          that.setData({
            records: data.values,
          })
        } else {
          utils.userShowInfo(data.message);
          console.log(data.reason);
        }
      },
      fail: function (res) {
        console.log(res);
        utils.userShowInfo('信息查询失败');
        console.log('信息查询失败')
      },
    })
  },

  tapUpLoad: function (event) {
    wx.navigateTo({
      url: '../upload/upload'
    })
  },

})