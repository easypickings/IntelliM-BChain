// pages/view-shared/view-shared.js

const server = require('../../utils/server');
const utils = require('../../utils/utils');

Page({

  /**
   * Page initial data
   */
  data: {
    records: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: async function (options) {
    let records = await server.getRecords(options.token);
    this.setData({
      records: records
    });
  },
})