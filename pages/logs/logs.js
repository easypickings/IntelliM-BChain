Page({
  data:{
    record: {}
  },

  onLoad: function (options) {
    var record = JSON.parse(options.record);
    console.log(record);
    this.setData({
      record: record,
    });
  },

  tapReturn: function(e) {
    wx.navigateBack({
      delta: 1,
    })
  }
})
