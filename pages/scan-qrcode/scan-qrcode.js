// pages/scan-qrcode/scan-qrcode.js
Page({

  /**
   * Page initial data
   */
  data: {
    isLoading: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.scanCode({
      complete: (res) => {
        console.log("[scan] token =", res.result);
        wx.navigateTo({
          url: `../view-shared/view-shared?token=${res.result}`,
        });
      },
    })
  },
})
