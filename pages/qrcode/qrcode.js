const utils = require('../../utils/utils');
const global = require('../../utils/global');

let records;

// pages/qrcode/qrcode.js
Page({

  /**
   * Page initial data
   */
  data: {
    records: [],
    loading: true,
    errorMsg: ""
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: async function (options) {
    try {
      console.log("await");
      records = utils.getTestRecord();
      console.log("await");
      for (let i = 0; i < records.length; i++) {
        records[i].id = i.toString();
        records[i].value = records[i].id;
        records[i].name = records[i].id;
        records[i].checked = '';
      }
      this.setData({
        records: records
      });
      if (records.length == 0) {
        this.setData({
          errorMsg: "当前暂无病历记录"
        })
      }
    }
    catch (err) {
      console.error(err);
      this.setData({
        errorMsg: "病历下载失败"
      })
    }
    this.setData({
      loading: false
    });
  },

  selectAll: function() {
    for (let item of records) {
      item.checked = "true";
    }
    this.setData({
      records: records
    });
  },

  deselectAll: function() {
    for (let item of records) {
      item.checked = "";
    }
    this.setData({
      records: records
    });
  },

  onSelectionChanged: function(e) {
    for (let record of records) {
      if (e.detail.value.indexOf(record.value) >= 0) {
        record.checked = "true";
      }
      else {
        record.checked = "";
      }
    }
  },

  share: async function() {
    for (let item of records) {
      console.log(item.name, item.checked);
    }
  }
})