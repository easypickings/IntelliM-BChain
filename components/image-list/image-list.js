// components/image-list/image-list.js
Component({
  /**
   * Component properties
   */
  properties: {
    images: {
      type: Array,
      value: []
    },
    canInsert: {
      type: Boolean,
      value: true
    }
  },

  /**
   * Component initial data
   */
  data: {
    lastImage: 0
  },

  /**
   * Component methods
   */
  methods: {
    onInsertImage: async function(e) {
      wx.chooseImage({
        success: (res) => {
          console.log(res);
          if (res.tempFilePaths.length > 0) {
            this.setData({
              images: this.data.images.concat(res.tempFilePaths)
            });
            this.setData({
              lastImage: `i${this.data.images.length - 1}`
            });
            console.log(this.data.lastImage);
            this.triggerEvent('Changed', {
              paths: this.data.images
            });
          }
        },
      });
    },

    onTapImage: function (e) {
      wx.previewImage({
        urls: [e.mark.image],
      });
    }
  }
})
