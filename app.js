var utils = require('./utils/utils');
var server = require('./utils/server');
var PR = require('./utils/promisify')

//app.js
App({
  globalData: {
    url: null,
    userInfo: null,
    token: null,
    records: null,
  },

  onLaunch: async function () {},

  clearGlobalData: async function () {
    this.globalData.url = null;
    this.globalData.userInfo = null;
    this.globalData.token = null;
    this.globalData.records = null;
  },
})