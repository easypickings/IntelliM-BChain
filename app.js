var utils = require('./utils/utils');
var server = require('./utils/server');
var PR = require('./utils/promisify')

//app.js
App({
  globalData: {
    url: null,
    userInfo: null,
    token: null,
  },

  onLaunch: async function () {},
})