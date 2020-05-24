// pages/camera/camera.js
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
  onShow: function (options) {
    this.setData({
      isLoading: false
    });
  },

  onShutter: function(e) {
    this.setData({
      isLoading: true
    });
    const ctx = wx.createCameraContext();
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        wx.navigateTo({
          url: `../upload-examination/upload-examination?tempImageSrc=${res.tempImagePath}`
        });
      }
    })
  },

  onOpenAlbum: function(e) {
    console.log('[camera] on open album');
  }
})