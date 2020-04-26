function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

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
        urlArr: [],
    },

    /* =============== Initialization =============== */

    /** 初始化上传页面 */
    onLoad: function () {
        this.setDefaultDate();
        this.imageBinding();
    },

    /** 设定初始日期 */
    setDefaultDate: function() {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        var dateText = [year, month, day].map(formatNumber).join('-');
        
        this.setData({
            date: dateText
        });
    },

    /** 绑定图片上传函数 */
    imageBinding: function() {
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
    previewImage: function(e){
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

    uploadFile(files) {
        console.log('upload files', files)
        // 文件上传的函数，返回一个promise
        return new Promise((resolve, reject) => {
            var tempFilePaths = files.tempFilePaths;
            var app = getApp();
            var that = this;
            that.setData({urlArr: []})
            var obj = {};
            for (var path in tempFilePaths) {
                uploadTask = wx.uploadFile({
                    url: 'something',           // TODO
                    filePath: path,
                    name: 'file',
                    success: function(res) {
                        var data = JSON.parse(res.data);
                        if (data.status == "ok") {
                            var url = data.url;
                            that.setData({
                                urlArr: that.data.urlArr.concat("url" + url),   // TODO
                            })
                            obj['urls'] = that.data.urlArr;
                            if (that.data.urlArr.length == tempFilePaths.length) {
                                resolve(obj)
                            }
                        } else {
                            reject(res)
                        }
                    },
                    fail: function(err) {
                        console.log("Server fail: " + err);
                    }
                })
            }

            setTimeout(() => {
                reject('some error')
            }, 10000)
        })
    },

    uploadError(e) {
        console.log('upload error', e.detail)
    },

    uploadSuccess(e) {
        console.log('upload success', e.detail)
    },

    /* =============== Upload Form =============== */

    json2Form: function (json) {
        var str = [];
        for (var p in json) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
        }
        console.log(str.join("&"));
        return str.join("&");
    },

    upload: function (e) {
        for (var key in this.data) {
            console.log(key + ": " + this.data[key]);
        }

        wx.request({
            url: "www.baidu.com",
            header: {
                "content-type": "application/json"
            },
            method: "POST",
            data: json2Form(data),
            complete: function (res) {
                if (res == null || res.data == null) {
                    console.error("网络请求失败");
                    return;
                }
                wx.navigateBack({
                    delta: 1 //小程序关闭当前页面返回上一页面
                })
                console.log(res.data);
                wx.showToast({
                    title: res.data.message,
                    duration: 2000
                })
            }
        });
    },

    /* =============== Bindings =============== */

    bindHospitalChange: function(e) {
        this.setData({ hospital: e.detail.value });
    },

    bindDoctorChange: function(e) {
        this.setData({ doctor: e.detail.value });
    },

    bindDateChange: function(e) {
        this.setData({ date: e.detail.value });
    },

    bindSituationChange: function(e) {
        this.setData({ situation: e.detail.value });
    },

    bindDiagnosisChange: function(e) {
        this.setData({ diagnosis: e.detail.value });
    },

    bindPrescriptionChange: function(e) {
        this.setData({ prescription: e.detail.value });
    },

    bindRemarkChange: function(e) {
        this.setData({ remark: e.detail.value });
    },

});