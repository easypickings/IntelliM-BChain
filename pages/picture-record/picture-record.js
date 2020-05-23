// pages/picture-record/picture-record.js
Page({

  /**
   * Page initial data
   */
  data: {
    tempImageSrc: '',
    typeIndex: 0,
    typeArray: ['检验科检查', '放射科检查', '外科检查', '内科检查', '辅诊科检查', '眼科检查', '口腔科检查', '耳鼻喉科检查', '妇科检查', '一般形态', '其他检查'],
    selectedDate: '',
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    // Get image path.
    console.log(options.tempImageSrc);
    this.setData({
      tempImageSrc: options.tempImageSrc
    });

    // Initialize date
    let d = new Date();
    this.setData({
      selectedDate: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
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

  onUpload: function(e) {
    console.error('[examination] not implemented');
  }
})