const sdk = require("miniprogram-taas-sdk");
const sdkp = sdk.promises;
const app = getApp();

Page({
    data: {
        showList: false,
        list: [],
        showResult: false,
        result: ""
    },

    onLoad: function (){
        this.data.initP = app.globalData.initP;
    },

    bindGetList: async function (){
        await this.data.initP;
        var keypair = app.globalData.keypair;
        var data = await sdkp.getContractList(undefined, keypair);

        data = JSON.parse(data.data);
        this.setData({showList: true, list: data});
    },

    bindExecuteContract: async function (e){
        await this.data.initP;

        var list = this.data.list;
        var idx = parseInt(e.detail.value.index);
        var contract = list[idx];
        var arg = e.detail.value.arg;

        var info = {
            id: contract.id,
            method: contract.exportedFunctions[0].functionName,
            arg: arg
        };
        
        var keypair = app.globalData.keypair;
        
        var data = await sdkp.executeContract(info, undefined, keypair);
        data = JSON.parse(data.data);
        var result = JSON.parse(data.result);
        this.setData({showResult: true, result: data.result});
    }
});