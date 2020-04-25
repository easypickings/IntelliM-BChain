function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

Page({
    data: {
        hospital: "",
        doctor: "",
        date: "2016-09-01",
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

    upload: function(e) {
        for (var key in this.data) {
            console.log(key + ": " + this.data[key]);
        }
    },

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