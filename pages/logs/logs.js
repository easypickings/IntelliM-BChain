var server = require('../../utils/server');
const app = getApp();

Page({
  data:{
    record: {},
    images: [],
    isLoading: false,
    imagesLoading: true
  },

  onLoad: async function (options) {
    let record = JSON.parse(options.record);
    this.setData({
      record: record,
    });
    let images = await server.downloadFiles(app.globalData.token, record.record.attachments);
    this.setData({
      images: images,
      imagesLoading: false
    });
  },
})
