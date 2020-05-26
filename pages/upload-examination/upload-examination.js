// pages/picture-record/picture-record.js

const server = require('../../utils/server');
const utils = require('../../utils/utils');

const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    record: { },
    images: [],
    typeIndex: 0,
    typeArray: ['检验科检查', '放射科检查', '外科检查', '内科检查', '辅诊科检查', '眼科检查', '口腔科检查', '耳鼻喉科检查', '妇科检查', '一般形态', '其他检查'],
    isLoading: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

    // Initialize record
    let d = new Date();
    this.setData({
      images: [ options.tempImageSrc ],
      record: {
        type: 'examination',
        examination: {
          hospital: {
            name: '',
            id: ''
          },
          doctor: {
            name: '',
            id: ''
          },
          date: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
          type: '检验科检查',
          note: ''
        },
        signature: null
      }
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
      "record.examination.type": this.data.typeArray[e.detail.value]
    });
  },

  onDateChanged: function(e) {
    this.setData({
      "record.examination.date": e.detail.value
    });
  },

  onNoteChanged: function(e) {
    this.setData({
      "record.examination.note": e.detail.value
    });
  },

  onUpload: async function(e) {
    this.setData({
      isLoading: true
    });
    try {
      // await server.uploadExaminationResult(app.globalData.token, this.data.record);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // utils.showToast('上传成功');
      wx.navigateBack({
        delta: 2
      });
    }
    catch (e) {
      console.error(e);
      utils.showToast('上传失败');
    }
    this.setData({
      isLoading: false
    });
  },
})