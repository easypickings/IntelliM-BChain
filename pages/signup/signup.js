var utils = require('../../utils/utils');
var server = require('../../utils/server');
var PR = require('../../utils/promisify');
const app = getApp();

/** 正则表达式--用户名为不少于5位的字母或数字的组合 */
var usernameReg = /^[a-zA-Z0-9]{5,}$/;
/** 正则表达式--密码为8-16位且必须包含字母和数字 */
var passwordReg = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,16}$/;

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
    isPassword: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {},

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
    if (this.data.usernameOK && this.data.passwordOK) {
      console.log('------ sign up -------');
      try {
        let token = await server.signup(this.data.username, this.data.password);
        app.globalData.token = token;
        app.globalData.username = this.data.username;
        utils.showToast('注册成功', 'success');
        wx.reLaunch({ // 关闭signup页面并打开index页面
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
    } else
      utils.showToast('用户名或密码不符合要求');
  },

  showPassword: function () {
    this.setData({
      isPassword: !this.data.isPassword
    });
  },

})