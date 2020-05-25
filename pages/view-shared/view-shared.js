// pages/view-shared/view-shared.js

const server = require('../../utils/server');
const utils = require('../../utils/utils');

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
        isLoading: false,
        records: records
      });
    }
    catch (e) {
      wx.showToast({
        title: '获取信息失败',
      });
    }
  },
})