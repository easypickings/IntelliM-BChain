var utils = require('../../utils/utils');
var server = require('../../utils/server');
var PR = require('../../utils/promisify');
const app = getApp();

Page({
  data: {
    showLogout: false,
    action: [{
      text: '退出登录',
      type: 'warn',
    }],
  },

  onLoad: async function (e) {
    console.log('hhhhha');
    console.log(this.data);
    console.log(app.globalData);
  },

  triggerLogout: async function () {
    this.setData({
      showLogout: true
    });
  },

  logout: async function () {
    app.clearGlobalData();
    wx.reLaunch({
      url: '../login/login',
    });
  }

})