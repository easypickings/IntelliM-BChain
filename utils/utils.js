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
    return records.reverse();
  },

  /** 给定出生日期，返回年龄 */
  getAge: function (date) {
    let today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    if (today.getMonth() > date.getMonth() || (today.getMonth() == date.getMonth() && today.getDate() >= date.getDate())) {
      return age;
    } else {
      return age - 1;
    }
  },

  showScanPage: function () {
    wx.scanCode({
      success: (res) => {
        console.log("[scan] token =", res.result);
        wx.navigateTo({
          url: `/pages/view-shared/view-shared?token=${res.result}`,
        });
      },
    });
  },

  // source: http://stackoverflow.com/a/11058858
  str2ab: function (str) {
    let buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    let bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  },

  abConcat: function (a, b) { // a, b TypedArray of same type
    let c = new(a.constructor)(a.length + b.length);
    c.set(a, 0);
    c.set(b, a.length);
    return c;
  },

  addPrefix: function (prefix, ab) {
    return this.abConcat(new Uint8Array(this.str2ab('file=')), new Uint8Array(ab));
  },

  randomUsername: function () {
    return Math.random().toString(31).substr(2, 50);
  },
}