
var utils = require('../../../utils/utils');
var server = require('../../../utils/server');
var PR = require('../../../utils/promisify');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseInfo: {
      personalInfo:{
          name: "",
          sex: "",
          bloodType: "",
          birthDate: "",
          contact: "",
          emergencyContact: "",
          avatar: "",
      },
    height: "",
    weight: "",
    chronicInfo:[],
    allergicInfo:[],
    notes:""
    }


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function () {
    console.log("tring set baseInfo:")
    if(app.globalData.baseInfo){
      this.setData({baseInfo: app.globalData.baseInfo});
    }
    else{
        console.log('baseInfo downLoad fail:No globalData');
      
    }
  },


  /** 下载基础数据 */
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


})