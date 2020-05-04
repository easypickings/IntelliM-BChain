var utils = require('../../utils/utils');
var server = require('../../utils/server');
var CONFIG = require('../../utils/config');
var PR = require('../../utils/promisify');
const app = getApp();

Page({
  data:{
    imglist: [],
    record: {},
  },

  onLoad: async function (options) {
    var that = this;
    var record = JSON.parse(options.record);
    console.log(record);
    that.setData({
      record: record,
    });

    var attachments = record.attachments;
    try {
      var res = await server.downloadFiles(app.globalData.token, attachments);
      console.log(res);
      that.setData({
        imglist: res
      });
    } catch(e) {
      console.log(e);
    }
  },

  tapReturn: function(e) {
    wx.navigateBack({
      delta: 1,
    })
  },

  bindPreviewImage: function(e) {
    var current=e.target.dataset.src;
		wx.previewImage({
		  	current: current, // 当前显示图片的http链接
		  	urls: this.data.imglist // 需要预览的图片http链接列表
    })}
})
