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
    setDefaultDate: function () {
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
     * 上传图片：仅为本地选择，并不上传到服务器，需要额外处理。方法可以参照4ff9fa
     * （fix: store as wrong picture upload）提交内容。 
     */
    uploadFile(files) {
        console.log('upload files', files)
        // 文件上传的函数，返回一个promise
        return new Promise((resolve, reject) => {
            resolve({
                urls: files.tempFilePaths
            }); // use tmp paths, should get url from the server
        })
    },

    /** 上传失败返回函数 */
    uploadError(e) {
        wx.showModal({
            title: '提示',
            content: '图片上传失败\n' + e.detail,
            showCancel: false,
        })
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
        // console.log(str.join("&"));
        return str.join("&");
    },

    upload: function (e) {
        if (!this.data.hospital || !this.data.hospital.trim() ||
            !this.data.doctor || !this.data.doctor.trim() ||
            !this.data.situation || !this.data.situation.trim() ||
            !this.data.diagnosis || !this.data.diagnosis.trim() ||
            !this.data.prescription || !this.data.prescription.trim()) {
            wx.showToast({
                title: '病历信息不完整',
                icon: 'none',
                duration: 2000
            });
            return;
        }

        for (var key in this.data) {
            console.log(key + ": " + this.data[key]);
        }

        wx.request({
            url: "www.baidu.com",
            header: {
                "content-type": "application/json"
            },
            method: "POST",
            data: this.json2Form(this.data),
            complete: function (res) {
                if (res == null || res.data == null) {
                    wx.showToast({
                        title: '网络请求失败',
                        icon: 'none',
                        duration: 2000
                    });
                    console.error("网络请求失败");
                    return;
                }
                wx.navigateBack({
                    delta: 1 //小程序关闭当前页面返回上一页面
                })
                console.log(res.data);
                wx.showToast({
                    title: res.data.message,
                    icon: 'none',
                    duration: 2000
                })
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

});