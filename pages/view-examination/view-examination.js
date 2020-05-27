// pages/picture-record/picture-record.js

const server = require('../../utils/server');

const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    record: {},
    images: [],
    isLoading: false,
    imagesLoading: true
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: async function (options) {
    let record = JSON.parse(options.record);
    this.setData({
      record
    });
    let images = await server.downloadFiles(app.globalData.token, record.record.attachments);
    this.setData({
      images,
      imagesLoading: false
    });
  }
})