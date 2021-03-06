// pages/debug/debug.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  /**
   * Go to qrcode debug page
   */
  gotoQrcode: function(e) {
    wx.navigateTo({
      url: '../qrcode/qrcode',
    });
  },

  gotoGenQrcode: function(e) {
    wx.navigateTo({
      url: '../gen-qrcode/gen-qrcode',
    });
  },

  gotoScan: function(e) {
    wx.navigateTo({
      url: '../scan-qrcode/scan-qrcode',
    });
  },

  gotoUploadExamination: function(e) {
    wx.navigateTo({
      url: '../camera/camera',
    });
  },

  gotoViewExamination: function(e) {
    wx.navigateTo({
      url: '../view-examination/view-examination?record={"type":"眼科检查","date":"2020-05-23","attachments":[]}',
    });
  }
})