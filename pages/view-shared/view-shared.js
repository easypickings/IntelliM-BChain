// pages/view-shared/view-shared.js

const server = require('../../utils/server');
const utils = require('../../utils/utils');

const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    isLoading: true,
    baseinfo: null,
    records: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: async function (options) {
    try {
      let baseinfo = await server.getBaseInfo(options.token);

      // set age
      baseinfo.age = utils.getAge(new Date(baseinfo.personalInfo.birthDate));

      this.setData({
        baseinfo: baseinfo
      });

      let records = await server.getRecords(options.token);
      this.setData({
        records: records
      });
    }
    catch (e) {
      wx.showToast({
        title: '获取信息失败',
      });
    }
    this.setData({
      isLoading: false
    });
  },

  tapItem: function(e) {
    let index = e.currentTarget.dataset.index;
    let rcd = this.data.records[index];
    wx.navigateTo({
      url: '../logs/logs?record=' + JSON.stringify(rcd),
    })
  }
})