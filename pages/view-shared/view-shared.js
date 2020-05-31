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
        baseinfo
      });
      console.log(baseinfo);
    }
    catch (e) {
      console.log(e);
    }
    try {
      let records = await server.getRecords(options.token);
      this.setData({
        records
      });
      console.log(records);
    }
    catch (e) {
      utils.showToast('病历获取失败', 'none');
      console.log(e);
    }
    this.setData({
      isLoading: false
    });
  },

  onTapItem: function (e) {
    let record = e.detail.record;
    if (record.reserved == 'examination') {
      console.log(record);
      wx.navigateTo({
        url: '../view-examination/view-examination?record=' + JSON.stringify(record),
      });
    }
    else {
      wx.navigateTo({
        url: '../logs/logs?record=' + JSON.stringify(record),
      });
    }
  }
})