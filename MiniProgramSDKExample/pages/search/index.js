//index.js
const sdk = require("miniprogram-taas-sdk");
const sdkp = sdk.promises;
const app = getApp();

Page({
  data: {
    keypair: null,
    text: null
  },

  init: async function () {
    await app.globalData.initP;

    var keypair = app.globalData.keypair;
    this.setData({keypair: keypair});
    console.log(keypair);
  },

  onLoad: function (){
    this.setData({initP: this.init()});
  },

  submit: async function(e) {
    await this.data.initP;
    var keypair = this.data.keypair;
    var hash = e.detail.value.hash;
    var data =  await sdkp.queryEvidence(hash, undefined, keypair);
   
    console.log(data);
    data = data.data;
    var text = data.text || null;
    var type = data.type || null;
    data = data.data || null;
    this.setData({data, text, type});
  }
});
