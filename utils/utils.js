var CONFIG = require('./config')

module.exports = {
  /** 格式化数字，用于日期获取 */
  formatNumber: function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },

  /** 显示悬浮框 */
  showToast: function (title, icon = 'none') {
    wx.showToast({
      title: title,
      icon: icon,
      duration: 2000
    })
  },

  /** 获取服务器 url/ext */
  getUrl: function (ext) {
    return 'https://imbc.vbcpascal.cn/api/v1/' + ext; // TODO
  },

  /** 调试用输出，在config.js::debugOutput设置 */
  dbgPrint: function (e) {
    if (CONFIG.debugOutput) console.log(e);
  },

  /** 获取服务器端信息整合为本地存储信息 */
  readRecords: function (records) {
    var res = [];
    for (var i = records.length - 1; i >= 0; i--) {
      var rcd = records[i].record;
      try {
        res.push({
          id: records[i].id,
          hospital: rcd.hospital.name,
          hospital_id: rcd.hospital.id,
          date: rcd.date,
          doctor: rcd.doctor.name,
          doctor_id: rcd.doctor.id,
          situation: rcd.situation,
          diagnosis: rcd.diagnosis,
          prescription: rcd.prescription,
          attachments: rcd.attachments,
          situation_brief: rcd.situation.replace(/\n/g, ' '),
        })
      } catch (e) {
        console.log('wrong format record.');
      }
    }
    return res;
  },

  /** 给定出生日期，返回年龄 */
  getAge: function(date) {
    let today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    if (today.getMonth() > date.getMonth() || (today.getMonth() == date.getMonth() && today.getDate() >= date.getDate())) {
      return age;
    }
    else {
      return age - 1;
    }
  },

  showScanPage: function() {
    wx.scanCode({
      success: (res) => {
        console.log("[scan] token =", res.result);
        wx.navigateTo({
          url: `/pages/view-shared/view-shared?token=${res.result}`,
        });
      },
    });
  }
}