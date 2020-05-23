// pages/gen-qrcode/gen-qrcode.js

const QRCode = require('../../utils/qrcode');
const server = require('../../utils/server');

const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    hideCard: false,
    isLoading: true,
    errorOccurred: false,
    errorMessage: '无法获取二维码'
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: async function (options) {
    // contact server to get sharing token
    try {
      let token = await server.getSharingCode(app.globalData.token, app.globalData.selectedRecords);
      this.setData({
        isLoading: false
      });
      new QRCode('qrcode-canvas', {
        text: token,
        height: 200,
        width: 200
      });
    }
    catch (e) {
      this.setData({
        isLoading: false,
        errorOccurred: true,
        errorMessage: e
      });
    }
  }
})