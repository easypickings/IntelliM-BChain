// pages/picture-record/picture-record.js

const server = require('../../utils/server');

Page({

  /**
   * Page initial data
   */
  data: {
    images: [],
    typeIndex: 0,
    typeArray: ['检验科检查', '放射科检查', '外科检查', '内科检查', '辅诊科检查', '眼科检查', '口腔科检查', '耳鼻喉科检查', '妇科检查', '一般形态', '其他检查'],
    selectedDate: '',
    note: '',
    isLoading: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    // Get image path.
    this.setData({
      images: [ options.tempImageSrc ]
    });

    // Initialize date
    let d = new Date();
    this.setData({
      selectedDate: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    });
  },

  onInsertImage: function(e) {
    wx.chooseImage({
      complete: (res) => {
        this.setData({
          images: this.data.images.concat(res.tempFilePaths || [])
        });
      },
    });
  },

  onTypeChanged: function(e) {
    this.setData({
      typeIndex: e.detail.value
    });
  },

  onDateChanged: function(e) {
    this.setData({
      selectedDate: e.detail.value
    });
  },

  onNoteChanged: function(e) {
    this.setData({
      note: e.detail.value
    });
  },

  onUpload: async function(e) {
    this.setData({
      isLoading: true
    });
    try {
      await server.uploadExaminationResult();
    }
    catch (e) {
      console.error('[examination] upload failed');
    }
    this.setData({
      isLoading: false
    });
    wx.navigateBack({
      delta: 2
    });
  }
})