Page({
  data: {
    input: '',
    todos: [],
    leftCount: 0,
    allCompleted: false,
    logs: []
  },

  tapUpLoad: function(event) {
    wx.navigateTo({
      url: '../upload/upload'
    })
  },
  
})
