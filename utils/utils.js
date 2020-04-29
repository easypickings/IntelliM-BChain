module.exports = {
  /** 格式化数字，用于日期获取 */
  formatNumber: function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },

  /** 将json转为Form格式 */
  json2Form: function (json) {
    var str = [];
    for (var p in json) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
    }
    // console.log(str.join("&"));
    return str.join("&");
  },

  /** 显示悬浮文字 */
  userShowInfo: function (title, icon='none') {
    wx.showToast({
      title: title,
      icon: icon,
      duration: 2000
    })
  },

  /** 获取服务器 url/ext */
  getUrl: function(ext) {
    return 'http://imbc.yukim.ai/api/v0/' + ext;  // TODO
  },

  readRecords: function(records) {
    var res = [];
    for (var i = 0; i < records.length; i++) {
      var rcd = records[i].record;
      res.push({
        hospital: rcd.hospital.name,
        hospital_id: rcd.hospital.id,
        date: rcd.date,
        doctor: rcd.doctor.name,
        doctor_id: rcd.doctor.id,
        situation: rcd.situation,
        diagnosis: rcd.diagnosis,
        prescription: rcd.prescription,
        attachments: rcd.attachments,
        situation_brief: rcd.situation.replace(/\n/g, " "),
      })
    }
    console.log(res);
    return res;
  }
}
