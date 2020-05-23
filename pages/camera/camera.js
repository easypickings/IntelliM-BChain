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
  onLoad: function (options) {
    console.log("asdf");
  },

  onShutter: function(e) {
    console.log('onShutter');
    this.setData({
      isLoading: true
    });
    const ctx = wx.createCameraContext();
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log(res.tempImagePath);
        wx.navigateTo({
          url: `../picture-record/picture-record?tempImageSrc=${res.tempImagePath}`
        });
      }
    })
  },

  onOpenAlbum: function(e) {
    console.log('album');
  }
})