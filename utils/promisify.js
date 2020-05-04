function promisify(api) {
  return (opt, ...arg) => {
    return new Promise((resolve, reject) => {
      api(Object.assign({}, opt, { success: resolve, fail: reject }), ...arg)
    })
  }
}

module.exports = {
  downloadFile: promisify(wx.downloadFile),
  getStorageSync: promisify(wx.getStorageSync),
  getSettings: promisify(wx.getSetting),
  getUserInfo: promisify(wx.getUserInfo),
  login: promisify(wx.login),
  uploadFile: promisify(wx.uploadFile),
  request: promisify(wx.request),
  setStorageSync: promisify(wx.setStorageSync),
  showModal: promisify(wx.showModal),
}
