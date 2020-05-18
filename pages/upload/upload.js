var utils = require('../../utils/utils');
var server = require('../../utils/server');
var PR = require('../../utils/promisify');
var app = getApp();

Page({
  data: {
    hospital: '',
    doctor: '',
    date: '',
    situation: '',
    diagnosis: '',
    prescription: '',
    remark: '',
    files: [],
    tempFilePaths: [],
    urls: [],
  },

  /* =============== Initialization =============== */

  /** 初始化上传页面 */
  onLoad: function () {
    this.setDefaultDate();
    this.imageBinding();
  },

  /** 设定初始日期 */
  setDefaultDate: function () {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    var dateText = [year, month, day].map(utils.formatNumber).join('-');

    this.setData({
      date: dateText
    });
  },

  /** 绑定图片上传函数 */
  imageBinding: function () {
    this.setData({
      selectImage: this.selectImage.bind(this),
      loadImage: this.loadImage.bind(this)
    })
  },

  /* =============== Load Image =============== */

  /** 选择图片 */
  selectImage(files) {
    console.log('files', files)
    // 返回false可以阻止某次文件上传
  },

  /** 上传图片：仅为本地选择，并不上传到服务器。 */
  loadImage(files) {
    console.log('upload files', files)
    // 文件上传的函数，返回一个promise
    return new Promise((resolve, reject) => {
      resolve({
        urls: files.tempFilePaths
      });
    })
  },

  /** 加载失败返回函数 */
  loadError(e) {
    wx.showModal({
      title: '提示',
      content: '图片上传失败\n' + e.detail,
      showCancel: false,
    })
  },

  /** 加载成功返回函数 */
  loadSuccess(e) {
    this.setData({
      tempFilePaths: this.data.tempFilePaths.concat(e.detail.urls),
    });
    console.log('upload success', e.detail)
  },

  /* =============== Upload Form =============== */

  /** 上传病例信息 */
  upload: async function (e) {
    var that = this;
    console.log(this.data.tempFilePaths);

    // 检查病历完整性
    if (!this.data.hospital || !this.data.hospital.trim() ||
      !this.data.doctor || !this.data.doctor.trim() ||
      !this.data.situation || !this.data.situation.trim() ||
      !this.data.diagnosis || !this.data.diagnosis.trim() ||
      !this.data.prescription || !this.data.prescription.trim()) {
      utils.showToast('病历信息不完整。');
      return;
    }

    try {
      var urls = await server.uploadFiles(app.globalData.token, this.data.tempFilePaths);
      console.log('upload succeed');
      that.setData({
        urls: urls,
      });
    } catch (e) {
      console.log(e);
      await PR.showModal({
        title: '提示',
        content: '图片上传失败\n' + e,
        showCancel: false,
      });
    }

    // 上传病历信息
    console.log('try to upload form');

    try {
      var res = await PR.request({
        url: utils.getUrl('upload'),
        header: {
          'content-type': 'application/json',
          'token': 'root', // app.globalData.token,
        },
        method: 'POST',
        data: this.dataToJson(),
      })
      var data = res.data;
      if (data.state == 'success') {
        wx.navigateBack({
          delta: 1 //小程序关闭当前页面返回上一页面
        })
      } else {
        console.log(data);
        utils.showToast(data.message);
      }
    } catch (e) {
      console.error(e);
      utils.showToast('网络请求失败');
    };
  },

  /* =============== Bindings =============== */

  bindHospitalChange: function (e) {
    this.setData({
      hospital: e.detail.value
    });
  },

  bindDoctorChange: function (e) {
    this.setData({
      doctor: e.detail.value
    });
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    });
  },

  bindSituationChange: function (e) {
    this.setData({
      situation: e.detail.value
    });
  },

  bindDiagnosisChange: function (e) {
    this.setData({
      diagnosis: e.detail.value
    });
  },

  bindPrescriptionChange: function (e) {
    this.setData({
      prescription: e.detail.value
    });
  },

  bindRemarkChange: function (e) {
    this.setData({
      remark: e.detail.value
    });
  },

  /** 获得上传所需字符串，标准符合api.md */
  dataToJson: function () {
    return JSON.stringify({
      'record': {
        'hospital': {
          'name': this.data.hospital,
          'id': '',
        },
        'date': this.data.date,
        'doctor': {
          'name': this.data.doctor,
          'id': '',
        },
        'situation': this.data.situation,
        'diagnosis': this.data.diagnosis,
        'prescription': this.data.prescription,
        'attachments': this.data.urls,
      },
      'signature': '',
    })
  },

});