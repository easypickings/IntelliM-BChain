var utils = require('../../utils/utils');
var server = require('../../utils/server');
var CONFIG = require('../../utils/config');
var PR = require('../../utils/promisify');
const app = getApp();

Page({
  data: {
    logs: [],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    records: [],
  },

  /**
   * 页面加载--根据token下载records
   */
  onLoad: async function () {
    if (app.globalData.token) {
      try {
        await this.getRecords();
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log('No token--not login yet');
    }
  },

  /** 绑定“登录”按钮，登录并获取token */
  getUserInfo: async function (e) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    app.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    console.log(this.userInfo);
    try {
      var token = await server.login(res.code);
      app.globalData.token = token;
    } catch (e) {
      utils.showToast(e);
    }
    if (app.globalData.token) {
      this.getRecords();
    }
  },

  /** 下载用户病历数据 */
  getRecords: async function () {
    var that = this;

    if (CONFIG.useTestRecord) {
      return utils.getTestRecord();
    }

    console.log('begin to download record')
    try {
      var res = await PR.request({
        url: utils.getUrl('download'),
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'token': app.globalData.token,
        },
        method: 'POST'
      });
      // success
      var data = res.data;
      if (data.state == 'success') {
        utils.dbgPrint(data.values);
        that.setData({
          records: utils.readRecords(data.values)
        });
      } else {
        console.log(data.reason);
        utils.showToast(data.message);
      }
    } catch (e) {
      console.log(e);
      utils.showToast('信息查询失败');
    }
  },

  /* =============== Buttons =============== */

  /** 点击上传按钮：跳转 */
  tapUpload: async function (e) {
    wx.navigateTo({
      url: '../upload/upload'
    })
  },

  /** 点击刷新按钮：下载 */
  tapRefresh: async function (e) {
    this.getRecords();
  },

  /** 点击某条记录：跳转 */
  tapItem: async function (e) {
    var index = e.currentTarget.dataset.index;
    var rcd = this.data.records[index];
    wx.navigateTo({
      url: '../logs/logs?record=' + JSON.stringify(rcd),
    })
  },

})