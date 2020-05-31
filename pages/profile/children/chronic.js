// pages/profile/children/chronic.js
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
      },
    height: "",
    weight: "",
    chronicInfo:[],
    allergicInfo:[],
    note:""
    },
    sexArray: ["男", "女", "其他"],
    bloodArray: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', '不详'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.baseInfo){
      this.setData({baseInfo: JSON.parse(JSON.stringify(app.globalData.baseInfo))});
      // console.log(app.globalData.baseInfo);
    }
    // console.log(this.baseInfo);

  },

  //binding函数
  onInput: function (e) {
    let chronicdata={
      name:e.detail.value,
      id:null,
    }
    this.data.baseInfo.chronicInfo=[];
    this.data.baseInfo.chronicInfo.push(chronicdata);
    this.setData({
        baseInfo : this.data.baseInfo
    });
    //console.log(this.data.baseInfo);
  },

  //提交baseinfo
  onSubmit: async function (e) {
    let that = this;
    
    console.log("trying to PUT:");
    console.log(this.data.baseInfo);

    try {
      await server.uploadBaseInfo(app.globalData.token, this.dataToJson());
      app.globalData.baseInfo = JSON.parse(JSON.stringify(this.data.baseInfo));
      wx.navigateBack({
        delta: 1,
      })
      utils.showToast("上传个人信息成功");
    } catch(e) {
      utils.showToast(e);
    }

  },
  
  /** 获得上传所需字符串，标准符合api.md */
  dataToJson: function () {
    return JSON.stringify({
     
        'personalInfo':{
            'name': this.data.baseInfo.personalInfo.name,
            'sex': this.data.baseInfo.personalInfo.sex,
            'bloodType': this.data.baseInfo.personalInfo.bloodType,
            'birthDate': this.data.baseInfo.personalInfo.birthDate,
            'contact': this.data.baseInfo.personalInfo.contact,
            'emergencyContact': this.data.baseInfo.personalInfo.emergencyContact,
            
        },
      'height': Number(this.data.baseInfo.height),
      'weight': Number(this.data.baseInfo.weight),
      'chronicInfo':this.data.baseInfo.chronicInfo,
      'allergicInfo':this.data.baseInfo.allergicInfo,
      'note':this.data.baseInfo.note,
      
    })
  },



})