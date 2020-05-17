var utils = require('../../utils/utils');
var server = require('../../utils/server');
var CONFIG = require('../../utils/config');
var PR = require('../../utils/promisify');
const app = getApp();

// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accountLoginHidden: true,
    username: null,
    password: null,
    usercode: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: async function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: async function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: async function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: async function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: async function () {

  },

  /**
   * 点击账号密码登录按钮--弹出登录框
   */
  accountLogin: async function () {
    this.setData({
      accountLoginHidden: false,
      username: null,
      password: null
    });
  },

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
   * 点击取消按钮--隐藏登录框
   */
  cancelLogin: async function () {
    this.setData({
      accountLoginHidden: true
    });
  },

  confirmLogin: async function () {
    try {
      var token = await server.login(this.data.username, this.data.password, null);
      app.globalData.token = token;
    } catch (e) {
      utils.userShowInfo(e);
    }
  },

  /**
   * 点击注册按钮--跳转至注册页面
   */
  signUp: async function () {
    wx.navigateTo({
      url: '../signup/signup'
    });
  },

})