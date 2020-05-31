var utils = require('../../../utils/utils');
var server = require('../../../utils/server');
var PR = require('../../../utils/promisify');
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    baseInfo: {
      personalInfo: {
        name: "",
        sex: "",
        bloodType: "",
        birthDate: "",
        contact: "",
        emergencyContact: "",
      },
      height: "",
      weight: "",
      chronicInfo: [],
      allergicInfo: [],
      note: ""
    },
    loading:true,
    sexArray: ["男", "女", "其他"],
    bloodArray: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', '不详'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function () {
    console.log("onLoad:")
    if (app.globalData.baseInfo) {
      this.setData({
        baseInfo: app.globalData.baseInfo
      });
    } else {
      console.log('baseInfo downLoad fail:No globalData');
    }

    this.setData({
      loading:false
    })
  },

  onShow: async function () {
    console.log("onShow:")
    
    if (app.globalData.baseInfo) {
      this.setData({
        baseInfo: app.globalData.baseInfo
      });
    } else {
      if (app.globalData.token) {
        try {
          await this.getBaseInfo();
          this.setData({
            baseInfo: app.globalData.baseInfo
          });
        } catch (e) {
          console.log(e);
        }
      } else {
        console.log('profile onShow fail:No token');
      }
    }
    
    console.log(this.data.baseInfo);
    this.setData({
      loading:false
    })
  },


  /** 下载基础数据 */
  getBaseInfo: async function () {
    let that = this;
    try {
      console.log('trying download baseInfo');
      let res = await server.getBaseInfo(app.globalData.token);
      // console.log('fuck!!!!!!!!');
      app.globalData.baseInfo = res;
    } catch (e) {
      console.log(e);
      utils.showToast('基础信息查询失败');
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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