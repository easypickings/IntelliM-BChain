var CONFIG = require("./config")

module.exports = {
  /** 格式化数字，用于日期获取 */
  formatNumber: function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },

  /** 显示悬浮文字 */
  userShowInfo: function (title, icon = 'none') {
    wx.showToast({
      title: title,
      icon: icon,
      duration: 2000
    })
  },

  /** 获取服务器 url/ext */
  getUrl: function (ext) {
    return 'http://imbc.vbcpascal.cn/api/v0/' + ext; // TODO
  },

  /** 调试用输出，在config.js::debugOutput设置 */
  dbgPrint: function (e) {
    if (CONFIG.debugOutput) console.log(e);
  },

  /** 获取服务器端信息整合为本地存储信息 */
  readRecords: function (records) {
    var res = [];
    for (var i = records.length - 1; i >= 0; i--) {
      var rcd = records[i].record;
      try {
        res.push({
          hospital: rcd.hospital.name,
          hospital_id: rcd.hospital.id,
          date: rcd.date,
          doctor: rcd.doctor.name,
          doctor_id: rcd.doctor.id,
          situation: rcd.situation,
          diagnosis: rcd.diagnosis,
          prescription: rcd.prescription,
          attachments: rcd.attachments,
          situation_brief: rcd.situation.replace(/\n/g, " "),
        })
      } catch (e) {
        console.log('wrong format record.');
      }
    }
    return res;
  },

  /** 获取测试用records */
  getTestRecord: function (num) {
    return this.readRecords([{
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
  }
}