var utils = require('../../utils/utils.js')
const app = getApp()

Page({
  data: {
    logs: [],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    records: [],
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.downloadRecord();
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    console.log(this.userInfo)
  },

  downloadRecord: function (e) {
    var that = this;

    console.log('begin to download record')
    wx.request({
      url: utils.getUrl('download'),
      header: {
        "content-type": "application/x-www-form-urlencoded",
        "token": "root", // app.globalData.token,
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
        var data = res.data;
        if (data.state == 'success') {
          console.log(data.values)
          that.setData({
            records: data.values,
          })
        } else {
          utils.userShowInfo(data.message);
          console.log(data.reason);
        }
      },
      fail: function (res) {
        console.log(res);
        utils.userShowInfo('信息查询失败');
        console.log('信息查询失败');
        that.testRecord();  // TODO
      },
    })
  },

  /* =============== Buttons =============== */

  tapUpload: function (e) {
    wx.navigateTo({
      url: '../upload/upload'
    })
  },

  tapRefresh: function (e) {
    this.downloadRecord();
  },

  /* =============== Tests =============== */

  testRecord: function (e) {
    this.setData({
      records: utils.readRecords([{
          record: {
            hospital: {
              name: "内蒙古大骟人人民医院",
              id: "",
            },
            date: "2020-04-21",
            doctor: {
              "name": "无人机",
              "id": "",
            },
            situation: "1. 半边身子不能动\n2. 嘴唇憋的紫黑\n3. 心突突突突突突突突的跳",
            diagnosis: "1. 中风偏瘫\n2. 老咳喘\n3. 心肺同时衰竭死亡",
            prescription: "1. 雄氏老方 每日3次 每次10片\n2. 丹神定喘 每日40次 每次0.3ml\n3. 蒙药心脑方 每日1次 每次1g",
            attachments: ["/attachments/6e53adf1890cb3be.png", "/attachments/deadbeefdeadbeef.png"]
          },
          timestamp: "2020-04-21T17:30:08.000Z", //上链ISO时间戳(UTC时间)，YYYY-MM-DDThh:mm:ss.sssZ
          validity: null //无签名验证的记录是null
        },
        {
          record: {
            hospital: {
              name: "兆京大学校医院",
              id: "",
            },
            date: "2020-04-22",
            doctor: {
              name: "吴仁冀",
              id: "",
            },
            situation: "吾有一數。曰三。名之曰「甲」。",
            diagnosis: "問天地好在。",
            prescription: "天才在左，疯子在右。",
            attachments: []
          },
          timestamp: "2020-04-22T22:22:22.222Z",
          validity: null
        },
      ])
    });
    console.log(this.data.records);
  }

})