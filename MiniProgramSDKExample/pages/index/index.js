//index.js
const sdk = require("miniprogram-taas-sdk");
const sdkp = sdk.promises;
const wxp = require("../../utils/wxpromise.js");
const app = getApp();

Page({
  data: {
    invitationCode: null,
    keypair: null,
    hash: null,
    path: null,
  },

  globalInit: async function () {
    var keypair;
    try {
      keypair = await wxp.getStorage({key: "keypair"});
    } catch (e){

      while (true){
        try {
          var code = await new Promise((resolve, reject) => {
            this.data.codeResolve = resolve;
          });
          console.log(code);
          keypair = await sdkp.getCredential(code, undefined);
          break;
        } catch (e){
          wx.showModal({
            title: '提示',
            content: '程序出了个小差,请重新提交!',
          });
          console.log(e);
        };
      };
     
      await wxp.setStorage({key: "keypair", data: keypair});
    }
    app.globalData.keypair = keypair
  },

  init: async function () {
    await app.globalData.initP;

    var keypair = app.globalData.keypair;
    this.setData({keypair: keypair});
    console.log(keypair);
  },

  onLoad: function (){
    app.globalData.initP = this.globalInit();
    this.data.initP = this.init();
  },

  bindChooseImage: async function (){
    var files = await wxp.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album']
    });
    var path = files[0].path;
    console.log(path);
    this.setData({path: path});
  },

  submit: async function (e){
    await this.data.initP;

    var keypair = this.data.keypair;
    var path = e.detail.value.path;
    var text = e.detail.value.text;
    var data = {path, text};

    var resp = await sdkp.storeEvidence(data, undefined, keypair);
    var hash = resp.hash;
    this.setData({hash: hash});
    await wxp.setClipboardData({data: hash});
    wx.showToast({title: "The hash id is already copied to clipboard.", icon: "none"});
  },

  invite: function (e){
    this.data.codeResolve(e.detail.value.code);
  }
});
