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
        attachments: []
    },

    onLoad: function () {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        var dateText = [year, month, day].map(formatNumber).join('-');

        this.setData({
            date: dateText
        });
    },

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
            url: "https://www.baidu.com/",
            header: {
                "content-type": "application/json"
            },
            method: "POST",
            data: this.json2Form(this.data),
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
                    icon: 'none',
                    duration: 2000
                })
            }
        });
    },

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