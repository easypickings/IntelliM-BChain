var utils = require('../../utils/utils');
var server = require('../../utils/server');
var PR = require('../../utils/promisify');
const app = getApp();

/** 正则表达式--用户名为不少于3位的字母、数字或汉字的组合 */
var usernameReg = /^[a-zA-Z0-9\u4e00-\u9fa5]{3,}$/;
/** 正则表达式--密码为8-16位且必须包含字母、数字和特殊符号 */
var passwordReg = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,16}$/;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: null,
    password: null,
    usernameWarnHidden: true,
    passwordWarnHidden: true,
    usernameOK: false,
    passwordOK: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {

  },

  bindUsernameFocus: function () {
    if (!this.data.usernameOK)
      this.setData({
        usernameWarnHidden: false
      });
  },

  bindPasswordFocus: function () {
    if (!this.data.passwordOK)
      this.setData({
        passwordWarnHidden: false
      });
  },

  bindUsernameChange: function (e) {
    let username = e.detail.value;
    let ok = usernameReg.test(username);
    this.setData({
      username: username,
      usernameWarnHidden: ok,
      usernameOK: ok
    });
  },

  bindPasswordChange: function (e) {
    let password = e.detail.value;
    let ok = passwordReg.test(password);  
    this.setData({
      password: password,
      passwordWarnHidden: ok,
      passwordOK: ok
    });
  },

  signup: async function () {
    console.log('------ sign up -------');
    try {
      let token = await server.signup(this.data.username, this.data.password);
      app.globalData.token = token;
      utils.showToast('注册成功', 'success');
      wx.reLaunch({ // 关闭signup页面并打开index页面
        url: '../index/index',
      });
    } catch (e) {
      utils.showToast(e);
    }
  },

})