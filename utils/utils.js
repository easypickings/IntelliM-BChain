var CONFIG = require('./config')

module.exports = {
  /** 格式化数字，用于日期获取 */
  formatNumber: function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },

  /** 显示悬浮框 */
  showToast: function (title, icon = 'none') {
    wx.showToast({
      title: title,
      icon: icon,
      duration: 2000
    })
  },

  /** 获取服务器 url/ext */
  getUrl: function (ext) {
    return 'https://imbc.vbcpascal.cn/api/v1/' + ext; // TODO
  },

  /** 调试用输出，在config.js::debugOutput设置 */
  dbgPrint: function (e) {
    if (CONFIG.debugOutput) console.log(e);
  },

  /** 获取服务器端信息整合为本地存储信息 */
  readRecords: function (records) {
    var res = [];
    for (var i = records.length - 1; i >= 0; i--) {
      var rcd = records[i];
      try {
        if (rcd.reserved == 'examination') {
          res.push(rcd);
        }
        else {
          rcd = rcd.record;
          res.push({
            type: "record",
            id: records[i].id,
            hospital: rcd.hospital.name,
            hospital_id: rcd.hospital.id,
            date: rcd.date,
            doctor: rcd.doctor.name,
            doctor_id: rcd.doctor.id,
            situation: rcd.situation,
            diagnosis: rcd.diagnosis,
            prescription: rcd.prescription,
            attachments: rcd.attachments,
            situation_brief: rcd.situation.replace(/\n/g, ' '),
          });
        }
      } catch (e) {
        console.log('wrong format record.');
      }
    }
    return res;
  },

  /** 给定出生日期，返回年龄 */
  getAge: function(date) {
    let today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    if (today.getMonth() > date.getMonth() || (today.getMonth() == date.getMonth() && today.getDate() >= date.getDate())) {
      return age;
    }
    else {
      return age - 1;
    }
  },

  showScanPage: function() {
    wx.scanCode({
      success: (res) => {
        console.log("[scan] token =", res.result);
        wx.navigateTo({
          url: `/pages/view-shared/view-shared?token=${res.result}`,
        });
      },
    });
  },

  // source: http://stackoverflow.com/a/11058858
  str2ab: function (str) {
    let buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    let bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  },

  abConcat: function (a, b) { // a, b TypedArray of same type
    let c = new (a.constructor)(a.length + b.length);
    c.set(a, 0);
    c.set(b, a.length);
    return c;
  },

  addPrefix: function (prefix, ab) {
    return this.abConcat(new Uint8Array(this.str2ab('file=')), new Uint8Array(ab));
  },

  getTestRecord: function() {
    return [
      {
        "record": {
          "hospital": {
            "name": "北京大学医院",
            "id": "6a1da507a6ef9b5beac83ab5c1103019e92181875a634f0ae2cf243aa6718db6"
          },
          "date": "2020-02-20",
          "doctor": {
            "name": "乌仁吉",
            "id": "a8376d887ef47a714546d3c61f32c9ac5f5100331423f76dd62f2a9242741a3e"
          },
          "situation": "1. 半边身子不能动\n2.嘴唇憋的紫\n3.心突突的跳\n",
          "diagnosis": "1. 中风偏瘫\n2. 老咳喘\n3. 心肺同时衰竭死亡\n",
          "prescription": "1. 雄氏老方 每日3次 每次10片\n2. 丹神定喘 每日40次 每次0.3ml\n3. 蒙药心脑方 每日1次 每次1g\n",
          "attachments": [
            "e800a6b612e37b9c191107236e07bc2cdd7d7d21a66a8781138e409b5484d537.png"
          ]
        },
        "signature": null,
        "note": "天底下再也没有比大骟人还好的人喽。\n"
      },
      {
        "record": {
          "hospital": {
            "name": "北京大学医院",
            "id": "6a1da507a6ef9b5beac83ab5c1103019e92181875a634f0ae2cf243aa6718db6"
          },
          "date": "2020-02-20",
          "doctor": {
            "name": "乌仁吉",
            "id": "a8376d887ef47a714546d3c61f32c9ac5f5100331423f76dd62f2a9242741a3e"
          },
          "situation": "1. 半边身子不能动\n2.嘴唇憋的紫\n3.心突突的跳\n",
          "diagnosis": "1. 中风偏瘫\n2. 老咳喘\n3. 心肺同时衰竭死亡\n",
          "prescription": "1. 雄氏老方 每日3次 每次10片\n2. 丹神定喘 每日40次 每次0.3ml\n3. 蒙药心脑方 每日1次 每次1g\n",
          "attachments": [
            "e800a6b612e37b9c191107236e07bc2cdd7d7d21a66a8781138e409b5484d537.png"
          ]
        },
        "signature": null,
        "note": "天底下再也没有比大骟人还好的人喽。\n"
      },
      {
        "record": {
          "hospital": {
            "name": "北京大学医院",
            "id": "6a1da507a6ef9b5beac83ab5c1103019e92181875a634f0ae2cf243aa6718db6"
          },
          "date": "2020-02-20",
          "doctor": {
            "name": "乌仁吉",
            "id": "a8376d887ef47a714546d3c61f32c9ac5f5100331423f76dd62f2a9242741a3e"
          },
          "situation": "1. 半边身子不能动\n2.嘴唇憋的紫\n3.心突突的跳\n",
          "diagnosis": "1. 中风偏瘫\n2. 老咳喘\n3. 心肺同时衰竭死亡\n",
          "prescription": "1. 雄氏老方 每日3次 每次10片\n2. 丹神定喘 每日40次 每次0.3ml\n3. 蒙药心脑方 每日1次 每次1g\n",
          "attachments": [
            "e800a6b612e37b9c191107236e07bc2cdd7d7d21a66a8781138e409b5484d537.png"
          ]
        },
        "signature": null,
        "note": "天底下再也没有比大骟人还好的人喽。\n"
      }
    ];
  }
}