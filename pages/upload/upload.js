var utils = require('../../utils/utils.js');
var app = getApp();

Page({
  data: {
    hospital: "1",
    doctor: "2",
    date: "",
    situation: "3",
    diagnosis: "4",
    prescription: "5",
    remark: "",
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

  /* =============== Upload Image =============== */

  uploadPromise: function (){
    return new Promise(uploadPromiseParam);
  },

  /** 上传图片：从临时路径获取服务器路径。 */
  uploadPromiseParam: function(resolve, reject) {
    var tempFilePaths = this.data.tempFilePaths;
    var app = getApp();
    var that = this;
    var obj = {};
    // 上传多个文件时，对每个文件进行操作
    for (var i = 0; i < tempFilePaths.length; i++) {
      var path = tempFilePaths[i]; // 临时路径
      var name = path.slice(path.lastIndexOf('/') + 1); // 临时路径中文件名作为文件名
      uploadTask = wx.uploadFile({
        url: utils.getUrl('attachments/' + name),
        filePath: path,
        name: name,
        header: {
          "content-type": "application/binary",
          "Token": app.globalData.token,
        },
        success: function (res) {
          var data = JSON.parse(res.data);
          if (data.state == "success") {
            var realpath = data.path; // 服务器返回的真实路径
            that.setData({
              urls: that.data.urls.concat(realpath),
            })
            obj['urls'] = that.data.urls;
            if (i == tempFilePaths.length - 1) { // 是最后一个附件
              resolve(obj)
            }
          } else {
            console.log(data.reason);
            reject(res);
          }
        },
        fail: function (err) {
          console.log(err);
          reject('网络连接错误');
        }
      })
    }
    setTimeout(() => {
      reject('上传超时')
    }, 10000)
  },

  /** 上传失败返回函数 */
  uploadError(e) {
    console.log(e);
    wx.showModal({
      title: '提示',
      content: '图片上传失败\n' + e.detail.error,
      showCancel: false,
    })
  },

  /** 上传成功返回函数 */
  uploadSuccess(e) {
    console.log('upload success', e.detail)
  },

  /* =============== Upload Form =============== */

  /** 上传病例信息 */
  upload: function (e) {
    var noerr = true;
    console.log(this.data.tempFilePaths);

    // 检查病历完整性
    if (!this.data.hospital || !this.data.hospital.trim() ||
      !this.data.doctor || !this.data.doctor.trim() ||
      !this.data.situation || !this.data.situation.trim() ||
      !this.data.diagnosis || !this.data.diagnosis.trim() ||
      !this.data.prescription || !this.data.prescription.trim()) {
      utils.userShowInfo('病历信息不完整。');
      return;
    }
    /*
    new Promise(this.uploadPromiseParam).then(function (res) {
      console.log('upload success', res)
    }).catch(function (res) {
      noerr = false;
      wx.showModal({
        title: '提示',
        content: '图片上传失败\n' + res,
        showCancel: false,
      })
    })
    if (!noerr) return;*/

    // 上传病历信息
    console.log("try to upload form");

    wx.request({
      url: utils.getUrl('upload'),
      header: {
        "content-type": "application/json",
        "token": "root", // app.globalData.token,
      },
      method: "POST",
      data: this.dataToJson(),
      complete: function (res) {
        console.log(res);
        if (res == null || res.data == null) {
          utils.userShowInfo('网络请求失败');
          console.error("网络请求失败");
          return;
        } else {
          wx.navigateBack({
            delta: 1 //小程序关闭当前页面返回上一页面
          })
          console.log(res.data);
          utils.userShowInfo(res.data.message);
        }
      },
      timeout: 10000000,
    });
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
      "record": {
        "hospital": {
          "name": this.data.hospital,
          "id": "",
        },
        "date": this.data.date,
        "doctor": {
          "name": this.data.doctor,
          "id": "",
        },
        "situation": this.data.situation,
        "diagnosis": this.data.diagnosis,
        "prescription": this.data.prescription,
        "attachments": this.data.urls,
      },
      "signature": "",
    })
  },

});