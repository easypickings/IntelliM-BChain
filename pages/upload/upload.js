var utils = require('../../utils/utils');
var server = require('../../utils/server');
var PR = require('../../utils/promisify');
var app = getApp();

Page({
  data: {
    record: { },
    today: '',    // 默认日期、可选日期最大值
    images: [],
    files: [],
    isLoading: false
  },

  /* =============== Initialization =============== */

  /** 初始化上传页面 */
  onLoad: function () {
    this.setDefaultData();
  },

  /** 设定初始数据 */
  setDefaultData: function () {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var dateText = [year, month, day].map(utils.formatNumber).join('-');

    this.setData({
      images: [],
      record: {
        reserved: '',
        record: {
          hospital: {
            name: '',
            id: null
          },
          doctor: {
            name: '',
            id: null
          },
          date: dateText,
          department: {
            name: '',
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

  onInsertFile: async function(e) {
    wx.chooseMessageFile({
      success: async (res) => {
        try {
          console.log(res);
          this.setData({
            isLoading: true
          });
          let tmpPaths = res.tempFiles.map(p => p.path);
          let names = res.tempFiles.map(p => p.name);
          let r = await server.uploadFiles(app.globalData.token, tmpPaths);
          this.setData({
            files: this.data.files.concat(names || []),
            'record.record.attachments': this.data.record.record.attachments.concat(r)
          });
          console.log(this.data.files);
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
  
  onInsertImage: async function(e) {
    wx.chooseImage({
      success: async (res) => {
        try {
          this.setData({
            isLoading: true
          });
          let r = await server.uploadFiles(app.globalData.token, res.tempFilePaths);
          this.setData({
            images: this.data.images.concat(res.tempFilePaths || []),
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

  onHospitalChange: function (e) {
    this.setData({
      "record.record.hospital.name": e.detail.value
    });
  },

  onDoctorChange: function (e) {
    this.setData({
      "record.record.doctor.name": e.detail.value
    });
  },

  onSituationChange: function (e) {
    this.setData({
      "record.record.situation": e.detail.value
    });
  },

  onDiagnosisChange: function (e) {
    this.setData({
      "record.record.diagnosis": e.detail.value
    });
  },

  onPrescriptionChange: function (e) {
    this.setData({
      "record.record.prescription": e.detail.value
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
        delta: 1
      });
    }
    catch (e) {
      console.error(e);
      utils.showToast(e);
    }
    this.setData({
      isLoading: false
    });
  },


});