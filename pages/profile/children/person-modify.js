// pages/profile/children/baseinfo-modify.js
const app=getApp();
var utils = require('../../../utils/utils');
var server = require('../../../utils/server');
var PR = require('../../../utils/promisify');


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
  onLoad: function (options) {
    if(app.globalData.baseInfo){
      this.setData({baseInfo: app.globalData.baseInfo});
    }
    console.log(this.baseInfo);

  },

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
  //binding函数
  onInput: function (e) {
    var params = {}
    let label = e.currentTarget.dataset.label
    params['baseInfo.' + label] = e.detail.value
    this.setData(params)
  },

  //提交baseinfo
  onSubmit: async function (e) {
    let that = this;
    
    console.log("trying to PUT:");
    console.log(this.data.baseInfo);

    try {
      await server.uploadBaseInfo(app.globalData.token, this.dataToJson());
      
    } catch(e) {
      utils.showToast(e);
    }

  },
  
  /** 获得上传所需字符串，标准符合api.md */
  dataToJson: function () {
    return JSON.stringify({
      'baseInfo': {
        'personalInfo':{
            'name': this.data.baseInfo.personalInfo.name,
            'sex': this.data.baseInfo.personalInfo.sex,
            'bloodType': this.data.baseInfo.personalInfo.bloodType,
            'birthDate': this.data.baseInfo.personalInfo.birthDate,
            'contact': this.data.baseInfo.personalInfo.contact,
            'emergencyContact': this.data.baseInfo.personalInfo.emergencyContact,
            'avatar': "",
        },
      'height': this.data.baseInfo.height,
      'weight': this.data.baseInfo.weight,
      'chronicInfo':this.data.baseInfo.chronicInfo,
      'allergicInfo':this.data.baseInfo.allergicInfo,
      'notes':this.data.baseInfo.notes,
      }
    })
  },



})


