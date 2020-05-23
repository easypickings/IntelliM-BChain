var utils = require('../../utils/utils');
var server = require('../../utils/server');
var CONFIG = require('../../utils/config');
var PR = require('../../utils/promisify');
const app = getApp();

Page({
  data: {
    records: [], // 显示的病历列表，而非完整病历列表，添加被选中变量
    userInfo: {},
    hasUserInfo: false,
    /* 记录状态 */
    downloading: true, // 正在进行下载
    selectMode: false, // 长按进行选择
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

    try {
      let res = await server.getRecords(app.globalData.token);
      console.log(res);
      app.globalData.records = res;
      for (let i = 0; i < res.length; i++) {
        res[i].checked = false;
        res[i].value = res[i].id;
      }
      that.setData({
        records: res,
        downloading: false,
      });
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
    var that = this;
    that.setData({
      downloading: true,
    })
    that.getRecords();
  },

  /** 点击某条记录：正常-跳转；选择模式-选择 */
  tapItem: async function (e) {
    if (this.data.selectMode) {
      let index = e.currentTarget.dataset.index;
      let records = this.data.records;
      records[index].checked = !records[index].checked;
      this.setData({
        records: records,
      });
    } else {
      let index = e.currentTarget.dataset.index;
      let rcd = app.globalData.records[index];
      wx.navigateTo({
        url: '../logs/logs?record=' + JSON.stringify(rcd),
      })
    }
  },

  /** 长按某一记录：多选 */
  longPressItem: async function (e) {
    if (this.data.selectMode) return;
    let records = this.data.records;
    let index = e.currentTarget.dataset.index;
    records[index].checked = !records[index].checked;
    this.setData({
      selectMode: true,
      records: records,
    });
    wx.hideTabBar({
      animation: true,
    });
  },

  /** 取消选择按钮 */
  tapCancelSelect: async function (e) {
    console.log(e);
    let records = this.data.records;
    for (let item of records) {
      item.checked = false;
    }
    this.setData({
      selectMode: false,
      records: records,
    });
    wx.showTabBar({
      animation: true,
    })
  },

  /** 全选按钮 */
  tapSelectAll: async function (e) {
    let records = this.data.records;
    for (let item of records) {
      item.checked = true;
    }
    this.setData({
      records: records,
    });
  },

  /** 反选按钮 */
  tapInverse: async function (e) {
    let records = this.data.records;
    for (let item of records) {
      if (item.checked) item.checked = false;
      else item.checked = true;
    }
    this.setData({
      records: records,
    });
  },

  /** 分享按钮 */
  tapShare: function(e) {
    let selectedRecords = [];
    for (let item of this.data.records) {
      if (item.checked) selectedRecords.push(item.id);
    }
    app.globalData.selectedRecords = selectedRecords;
    wx.navigateTo({
      url: '../gen-qrcode/gen-qrcode',
    });
  }

})