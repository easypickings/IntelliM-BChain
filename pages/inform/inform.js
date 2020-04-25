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
        var year = date.getFullYear()
        var month = date.getMonth() + 1;
        var day = date.getDay();

        var dateText = [year, month, day].map(formatNumber).join('-');

        this.setData({
            date: dateText      
        });
    },

    formatInfo: function() {
        var str = '';
        str += "hospital=" + this.data.hospital;
        str += "&doctor=" + this.doctor;
        str += "&date=" + this.date;
        str += "&situation=" + this.situation;
        str += "&diagnosis=" + this.diagnosis;
        str += "&prescription=" + this.prescription;
        str += "&remark=" + this.remark;
        return str;
    },

    upload: function(e) {
        var dataText = this.formatInfo(); // JSON.stringify(e.data)
        console.log(dataText)
        /*wx.navigateTo({
          url: '../showinfo/showinfo?data=' + dataText,
        })*/
    }
});