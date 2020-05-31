var utils = require('../../utils/utils');
var server = require('../../utils/server');
var PR = require('../../utils/promisify');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: null,
    password: null,
    usercode: null,
    isPassword: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {},

  bindUsernameChange: function (e) {
    this.setData({
      username: e.detail.value
    });
  },

  bindPasswordChange: function (e) {
    this.setData({
      password: e.detail.value
    });
  },

  /**
   * 点击账号密码登录
   */
  accountLogin: async function () {
    console.log('---login via account---');
    try {
      let token = await server.login(this.data.username, this.data.password, null);
      app.globalData.token = token;
      app.globalData.username = this.data.username;
      utils.showToast('登录成功', 'success');
      wx.reLaunch({ // 关闭login页面并打开index页面
        url: '../index/index',
      });
    } catch (e) {
      if (typeof (e) == 'string')
        utils.showToast(e);
      else {
        console.log(e);
        utils.showToast('网络请求失败');
      }
    }
  },

  /**
   * 点击注册--跳转至注册页面
   */
  signUp: async function () {
    wx.navigateTo({
      url: '../signup/signup'
    });
  },

  /**
   * 点击微信一键登录
   */
  wechatLogin: async function (e) {
    try {
      let res = await PR.login();
      console.log('---login via wechat---');
      if (res.code) {
        try {
          let token = await server.login(null, null, res.code);
          app.globalData.token = token;
          app.globalData.username = '微信用户';
          app.globalData.userInfo = e.detail.userInfo;
          utils.showToast('登录成功', 'success');
          wx.reLaunch({ // 关闭login页面并打开index页面
            url: '../index/index',
          });
        } catch (e) {
          throw e;
        }
      }
    } catch (e) {
      if (typeof (e) == 'string')
        utils.showToast(e);
      else {
        console.log(e);
        utils.showToast('网络请求失败');
      }
    }
  },

  showPassword: function () {
    this.setData({
      isPassword: !this.data.isPassword
    });
  },

  onScan: function () {
    utils.showScanPage();
  }
})