var utils = require('../../utils/utils');
var server = require('../../utils/server');
const app = getApp();

Page({
  data: {
    username: null,
    avatarUrl: '../../assets/default_avatar.jpg',
    showLogout: false,
    action: [{
      text: '退出登录',
      type: 'warn',
    }],
  },

  /**
   * 页面加载--根据token下载baseInfo
    */
   onLoad: async function () {
     if (app.globalData.token) {
       this.setData({
         username:app.globalData.username,
       });
       try {
         await this.getBaseInfo();
       } catch (e) {
         console.log(e);
       }
     } else {
       console.log('profile onLoad fail: No token');
     }
   },

   /** 下载基础数据 */
   getBaseInfo: async function () {
     try {
       console.log("trying download baseInfo")
       let res = await server.getBaseInfo(app.globalData.token);
       app.globalData.baseInfo = res;
     } catch (e) {
       console.log(e);
       utils.showToast('基础信息查询失败');
     }
     console.log(app.globalData.baseInfo);
   },


  triggerLogout: async function () {
    this.setData({
      showLogout: true
    });
  },

  logout: async function () {
    app.clearGlobalData();
    wx.reLaunch({
      url: '../login/login',
    });
  },

  onScan: function() {
    utils.showScanPage();
  },

})