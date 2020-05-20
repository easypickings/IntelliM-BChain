var utils = require('../../utils/utils');
var server = require('../../utils/server');
var CONFIG = require('../../utils/config');
var PR = require('../../utils/promisify');
const app = getApp();

Page({
  data: {
    records: [],      // 显示的病历列表，而非完整病历列表
    userInfo: {},
    hasUserInfo: false,
    selectMode: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
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

  /** 下载用户病历数据 */
  getRecords: async function () {
    let that = this;

    // 暂未登录，使用临时token
    if (CONFIG.useTestRecord) {
      return utils.getTestRecord();
    }

    try {
      let res = await server.getRecords(app.globalData.token);
      console.log(res);
      app.globalData.records = res;
      that.setData({records: res});
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
    let index = e.currentTarget.dataset.index;
    let rcd = app.globalData.records[index];
    wx.navigateTo({
      url: '../logs/logs?record=' + JSON.stringify(rcd),
    })
  },

  longPressItem: async function(e) {
    let index = e.currentTarget.dataset.index;
    console.log(index);
  }

})