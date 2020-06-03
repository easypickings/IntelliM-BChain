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
    loading: true,
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
      loading: false
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
      loading: false
    })
  },


  /** 下载基础数据 */
  getBaseInfo: async function () {
    try {
      console.log('trying download baseInfo');
      let res = await server.getBaseInfo(app.globalData.token);
      app.globalData.baseInfo = res;
    } catch (e) {
      console.log(e);
      utils.showToast('基础信息查询失败');
    }
  },
})