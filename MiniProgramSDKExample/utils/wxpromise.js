
module.exports = {
    setStorage: function (options){
        return new Promise((resolve, reject) => {
            wx.setStorage({
                key: options.key,
                data: options.data,
                success: (res) => {resolve();},
                fail: () => {reject();}
            });
        });
    },
    getStorage: function (options){
        return new Promise((resolve, reject) => {
            wx.getStorage({
                key: options.key,
                success: (res) => {resolve(res.data);},
                fail: () => {reject();}
            });
        });
    },
    setClipboardData: function (options){
        return new Promise((resolve, reject) => {
            wx.setClipboardData({
              data: options.data,
              success: () => {resolve()},
              fail: () => {reject()}
            });
        });
    },
    chooseImage: function (options){
        return new Promise((resolve, reject) => {
            options = {...options};
            options.success = (res) => {
                const files = res.tempFiles;
                resolve(files);       
            };
            options.fail = () => {reject();};

            wx.chooseImage(options);
        });
    },
    chooseFile: function (options){
        return new Promise((resolve, reject) => {
            options = {...options};
            options.success = (res) => {
                const files = res.tempFiles;
                resolve(files);
            };
            options.fail = () => {reject();};
            wx.chooseMessageFile(options);
        });
    }
};
