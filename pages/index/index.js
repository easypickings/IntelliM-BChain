var utils = require('../../utils/utils');
var server = require('../../utils/server');
var CONFIG = require('../../utils/config');
const app = getApp();

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
    this.getRecords();
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

  getRecords: async function (e) {
    var that = this;

    if (CONFIG.useTestRecord) {
      return utils.getTestRecord();
    }

    console.log('begin to download record')
    wx.request({
      url: utils.getUrl('download'),
      header: {
        "content-type": "application/x-www-form-urlencoded",
        "token": app.globalData.token,
      },
      method: 'POST',
      success: function (res) {
        var data = res.data;
        if (data.state == 'success') {
          utils.dbgPrint(data.values);
          that.setData({
            records:  utils.readRecords(data.values)
          });
        } else {
          console.log(data.reason);
          console.log(data.message);
        }
      },
      fail: function (res) {
        console.log(res);
        console.log('信息查询失败');
        console.log('信息查询失败');
      },
    })
/*
    try {
      var rcds = await server.getRecords(app.globalData.token);
      console.log('rcds');
      this.setData({
        records: rcds,
      });
    } catch (e) {
      utils.userShowInfo(e);
    }*/
  },

  /* =============== Buttons =============== */

  tapUpload: function (e) {
    wx.navigateTo({
      url: '../upload/upload'
    })
  },

  tapRefresh: function (e) {
    this.getRecords();
  },

  tapItem: function (e) {
    var index = e.currentTarget.dataset.index;
    var rcd = this.data.records[index];
    wx.navigateTo({
      url: '../logs/logs?record=' + JSON.stringify(rcd),
    })
  },

})