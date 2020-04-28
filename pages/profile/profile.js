var app = getApp()

Page({
  data: {
    userInfo: null
  },

  onLoad: function (e) {
    this.setData({ userInfo: app.globalData.userInfo });
  }
})