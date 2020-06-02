var utils = require('../../utils/utils');
var server = require('../../utils/server');
const app = getApp();

Page({
  data: {
    records: [], // 显示的病历列表，而非完整病历列表，添加被选中变量
    imageLoaded: [],
    previewImagePath: [],
    /* 记录状态 */
    downloading: true, // 正在进行下载
    clusters: [],
    currentTab: 0
  },

  /**
   * 页面加载--根据token下载records
   */
  onLoad: async function () {
    await this.getRecords();

    // update clusters
    this.setData({
      clusters: this.getClusters()
    });
    console.log(this.data.clusters);
  },

  onShow: function () {
    this.setData({
      records: app.globalData.records
    });

    // update clusters
    this.setData({
      clusters: this.getClusters()
    });
    console.log(this.data.clusters);
  },

  /** 下载用户病历数据 */
  getRecords: async function () {
    let that = this;

    let imageLoaded = [];

    try {
      let res = await server.getRecords(app.globalData.token);
      for (let record of res) {
        record.sid = record.id.slice(0, 10);
      }
      console.log(res);
      app.globalData.records = res;
      this.setData({
        records: res
      });

      // download preview images
      for (let i = 0; i < res.length; i++) {
        let record = res[i];
        if (record.record.attachments.length > 0) {
          let p = server.downloadFiles(app.globalData.token, [record.record.attachments[0]]);
          p.then((path) => {
            console.log(path);
            this.setData({
              [`records[${i}].previewImagePath`]: path
            });
          });
        }
      }
    } catch (e) {
      console.log(e);
      utils.showToast('信息查询失败');
    }
    that.setData({
      downloading: false,
    });
  },

  /* =============== Buttons =============== */

  /** 点击上传按钮：跳转 */
  tapUpload: async function (e) {
    wx.showActionSheet({
      itemList: ['新建就诊记录', '新建检查报告'],
      success: (res) => {
        if (res.tapIndex == 0) {
          wx.navigateTo({
            url: '../upload/upload',
          });
        }
        else if (res.tapIndex == 1) {
          wx.navigateTo({
            url: '../upload-examination/upload-examination'
          });
        }
      }
    });
  },

  /** 点击刷新按钮：下载 */
  tapRefresh: async function (e) {
    var that = this;
    that.setData({
      downloading: true,
    })
    that.getRecords();
  },

  /** 点击某条记录：正常-跳转；选择模式-选择 */
  onTapItem: async function (e) {
    let record = e.detail.record;
    if (record.reserved == 'examination') {
      console.log(record);
      wx.navigateTo({
        url: '../view-examination/view-examination?record=' + JSON.stringify(record),
      });
    }
    else {
      wx.navigateTo({
        url: '../logs/logs?record=' + JSON.stringify(record),
      });
    }
  },

  onNew: function (e) {
    wx.showActionSheet({
      itemList: ['新建就诊记录', '新建检查报告'],
      success: (res) => {
        if (res.tapIndex == 0) {
          wx.navigateTo({
            url: '../upload/upload?previous=' + e.detail.id
          });
        }
        else if (res.tapIndex == 1) {
          wx.navigateTo({
            url: '../upload-examination/upload-examination?previous=' + e.detail.id
          });
        }
      }
    });
  },

  onShare: function (e) {
    app.globalData.selectedRecords = e.detail.ids;
    wx.navigateTo({
      url: '../gen-qrcode/gen-qrcode',
    });
  },

  onDelete: async function (e) {
    let fail = 0;
    let success = [];
    console.log(e.detail.ids);
    for (let id of e.detail.ids) {
      try {
        await server.deleteRecord(app.globalData.token, id);
        success.push(id);
      }
      catch (e) {
        fail++;
      }
    }
    if (fail > 0) {
      utils.showToast(`${fail}个病历删除失败，请重试`);
    }

    this.setData({
      records: app.globalData.records.filter((record) => !success.includes(record.id))
    });
    app.globalData.records = this.data.records;
    this.setData({
      clusters: this.getClusters()
    });
  },

  onTabClicked: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    });
  },

  onTabChanged: function (e) {
    console.log(e);
    this.setData({
      currentTab: e.detail.current
    });
  },

  getClusters: function () {
    let records = this.data.records;
    let clusters = [];
    console.log(records);
    for (let record of records.slice().reverse()) {
      console.log(record);
      let found = false;
      for (let cluster of clusters) {
        for (let rec of cluster.records) {
          if (record.record.previous == rec.id) {
            cluster.records.push(record);
            found = true;
            break;
          }
        }
        if (found) break;
      }
      if (!found) {
        clusters.push({
          records: [record],
          root: record
        });
      }
    }
    for (let cluster of clusters) {
      cluster.first = cluster.records[0];
      cluster.last = cluster.records[0];
      for (let record of cluster.records) {
        if (record.record.date < cluster.first.record.date) {
          cluster.first = record;
        }
        if (record.record.date > cluster.last.record.date) {
          cluster.last = record;
        }
      }
      cluster.records.reverse();
    }
    clusters = clusters.sort((x, y) => x.last.record.date < y.last.record.date ? 1 : -1);
    return clusters;
  },

  onTapCluster: function (e) {
    console.log(e);
    wx.navigateTo({
      url: '../view-cluster/view-cluster?cluster=' + JSON.stringify(e.currentTarget.dataset.cluster)
    });
  },

  onEnterSelectionMode: function () {
    wx.hideTabBar({
      animation: true,
    });
  },

  onQuitSelectionMode: function () {
    wx.showTabBar({
      animation: true,
    });
  }
})