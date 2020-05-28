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
          attachments: []
        },
        note: '',
        signature: null
      },
    });
  },

  onInsertImage: async function(e) {
    wx.chooseImage({
      success: async (res) => {
        try {
          this.setData({
            isLoading: true
          });
          let r = await server.uploadFiles(app.globalData.token, res.tempFilePaths);
          this.setData({
            images: this.data.images.concat(
              res.tempFilePaths.map((path, i) => {
                return { path, sid: r[i].slice(0, 10) }
              }) || []
            ),
            'record.record.attachments': this.data.record.record.attachments.concat(r)
          });
        }
        catch (e) {
          console.log(e);
          utils.showToast('文件上传失败');
        }
        this.setData({
          isLoading: false
        });
      },
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
      await server.uploadExaminationResult(app.globalData.token, this.data.record);
      utils.showToast('上传成功');
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