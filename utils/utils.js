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
    return 'tmpurl' + ext;  // TODO
  }
}
