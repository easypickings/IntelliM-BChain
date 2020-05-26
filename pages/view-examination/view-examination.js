// pages/picture-record/picture-record.js

const server = require('../../utils/server');

Page({

  /**
   * Page initial data
   */
  data: {
    record: {},
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
    this.setData({
      record: JSON.parse(options.record)
    });
  }
})