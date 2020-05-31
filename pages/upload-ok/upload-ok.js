// pages/upload-ok/upload-ok.js
Page({

  /**
   * Page initial data
   */
  data: {
    id: ''
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    });
  },

  onBack: function () {
    wx.navigateBack({
      delta: 2
    });
  }
})