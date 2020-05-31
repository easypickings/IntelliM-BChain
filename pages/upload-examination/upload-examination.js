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
    console.log(options.previous);
    // Initialize record
    let d = new Date();
    this.setData({
      images: [],
      record: {
        reserved: 'examination',
        record: {
          hospital: {
            name: '',
            id: null
          },
          doctor: {
            name: '',
            id: null
          },
          date: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
          department: {
            name: '检验科检查',
            id: null
          },
          situation: '',
          diagnosis: '',
          prescription: '',
          attachments: [],
          previous: options.previous || null
        },
        note: '',
        signature: null
      },
    });
  },

  onImagesChanged: function(e) {
    this.setData({
      images: e.detail.paths
    });
  },

  onTypeChanged: function(e) {
    this.setData({
      "record.record.department.name": this.data.typeArray[e.detail.value]
    });
  },

  onDateChanged: function(e) {
    this.setData({
      "record.record.date": e.detail.value
    });
  },

  onNoteChanged: function(e) {
    this.setData({
      "record.note": e.detail.value
    });
  },

  onUpload: async function(e) {
    console.log(this.data.record);
    this.setData({
      isLoading: true
    });
    try {
      let imageIds = await server.uploadFiles(app.globalData.token, this.data.images);
      this.data.record.record.attachments = imageIds;
      let id = await server.uploadExaminationResult(app.globalData.token, this.data.record);
      this.data.record.id = id;
      this.data.record.sid = id.slice(0, 10);
      this.data.record.previewImagePath = this.data.images[0] || null;
      app.globalData.records.unshift(this.data.record);
      wx.navigateTo({
        url: '../upload-ok/upload-ok?id=' + id,
      });
    }
    catch (e) {
      console.error(e);
      utils.showToast('上传失败，请重试');
    }
    this.setData({
      isLoading: false
    });
  },
})