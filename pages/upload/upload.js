var utils = require('../../utils/utils.js')

Page({
  data: {
    hospital: "",
    doctor: "",
    date: "",
    situation: "",
    diagnosis: "",
    prescription: "",
    remark: "",
    files: [],
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
      selectFile: this.selectFile.bind(this),
      uploadFile: this.uploadFile.bind(this)
    })
  },

  /* =============== Upload Picture =============== */

  /** 选择图片 */
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },

  /** 图片预览 */
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },

  /** 选择图片 */
  selectFile(files) {
    console.log('files', files)
    // 返回false可以阻止某次文件上传
  },

  /** 
   * 上传图片：从本地路径、临时路径获取服务器路径。 
   */
  uploadFile(files) {
    console.log('upload files', files)
    // 文件上传的函数，返回一个promise。
    // resolve为成功，指向uploadSuccess；
    // reject为失败，指向uploadError。
    return new Promise((resolve, reject) => {
      var tempFilePaths = files.tempFilePaths;
      var app = getApp();
      var that = this;
      var obj = {};
      // 上传多个文件时，对每个文件进行操作
      for (var i = 0; i < tempFilePaths.length; i++) {
        var path = tempFilePaths[i]; // 临时路径
        var name = path.slice(path.lastIndexOf('/') + 1); // 临时路径中文件名作为文件名
        uploadTask = wx.uploadFile({
          url: utils.getUrl('/api/attachments/' + name),
          filePath: path,
          name: name,
          header: {
            "Content-Type": "application/binary",
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
    })
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
    var app = getApp();  // 用于获取token等信息

    // 检查病历完整性
    if (!this.data.hospital || !this.data.hospital.trim() ||
      !this.data.doctor || !this.data.doctor.trim() ||
      !this.data.situation || !this.data.situation.trim() ||
      !this.data.diagnosis || !this.data.diagnosis.trim() ||
      !this.data.prescription || !this.data.prescription.trim()) {
      wx.showModal({
        title: '提示',
        content: '病历信息不完整，是否继续上传?',
        success (res) {
          if (res.cancel) return;
        }
      })
    }

    // 上传病历信息
    console.log("try to upload files");
    for (var key in this.data) {
      console.log(key + ": " + this.data[key]);
    }

    wx.request({
      url: utils.getUrl('/api/upload'),
      header: {
        "Content-Type": "application/json",
        "Token": app.globalData.token,
      },
      method: "POST",
      data: this.dataToJson(),
      complete: function (res) {
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
      }
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
      record: {
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