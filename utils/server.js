var utils = require('./utils');
var CONFIG = require('./config');
var PR = require('./promisify');

module.exports = {

  /**
   * 登录后端服务器，获取本次对话的token
   * 
   * @param {*} username 用户名
   * @param {*} password 密码
   * @param {*} usercode 微信登录时获取code
   * @returns 返回值为token
   */
  login: async function (username, password, usercode) {
    // if (CONFIG.useRootToken)
    //   return 'root';
    console.log('-------- login --------')
    try {
      let res = await PR.request({
        url: utils.getUrl('login'),
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        data: JSON.stringify({
          'username': username,
          'password': password,
          'usercode': usercode,
        })
      });
      console.log(res);

      let data = res.data;
      console.log(data);
      if (data.state == 'success')
        return data.token;
      else
        throw data.message;
    } catch (e) {
      throw e;
    }
  },

  /**
   * 注册账号，返回token
   * @param {*} username 用户名
   * @param {*} password 密码
   */
  signup: async function (username, password) {
    try {
      let res = await PR.request({
        url: utils.getUrl('users'),
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        data: JSON.stringify({
          'username': username,
          'password': password,
        })
      });
      console.log(res);

      let data = res.data;
      console.log(data);
      if (data.state == 'success')
        return data.token;
      else
        throw data.message;
    } catch (e) {
      throw e;
    }
  },

  /**
   * 从服务器下载病历记录
   * 
   * @param {*} token 通过login，服务器返回的token
   * @returns 返回格式化后的病历信息的列表
   */
  getRecords: async function (token) {
    // record for test
    if (CONFIG.useTestRecord) {
      return utils.getTestRecord();
    }

    console.log('[Server] begin to download record');
    try {
      let res = await PR.request({
        url: utils.getUrl('records'),
        header: {
          'content-type': 'application/json',
          'token': token,
        },
        method: 'GET'
      });
      let data = res.data;
      if (data.state == 'success') {
        console.log("[Server] download success");
        utils.dbgPrint(data.values);
        return utils.readRecords(data.values);
      } else {
        console.log(data.reason);
        throw data.message;
      }
    } catch (e) {
      console.log(e);
      throw '信息查询失败';
    }
  },

  uploadRecord: async function (token, upload_data) {
    console.log(token);
    console.log('[Server] begin to upload record');
    try {
      let res = await PR.request({
        url: utils.getUrl('records'),
        header: {
          'content-type': 'application/json',
          'token': token,
        },
        method: 'POST',
        data: upload_data,
      })
      let data = res.data;
      if (data.state == 'success') {
        console.log('[Server] record upload succeed');
        wx.navigateBack({
          delta: 1,
        })
      } else {
        console.log(data);
        throw data.message;
      }
    } catch(e) {
      console.log(e);
      throw '病历上传失败';
    }
  },

  /**
   * 上传附件到服务器
   * 
   * @param {*} token 本次对话的token
   * @param {*} tempFilePaths 本地文件路径
   * @returns 服务器路径
   */
  uploadFiles: async function (token, tempFilePaths) {
    var urls = []; // 服务器返回结果
    for (var i = 0; i < tempFilePaths.length; i++) {
      var path = tempFilePaths[i]; // 临时路径
      var name = path.slice(path.lastIndexOf('/') + 1); // 临时路径中文件名作为文件名
      console.log(name);
      console.log(utils.getUrl('attachments/' + name));
      try {
        var res = await PR.uploadFile({
          url: utils.getUrl('attachments/' + name),
          filePath: path,
          name: 'file',
          header: {
            'content-type': 'multipart/form-data',
            'token': token,
          },
        });
        var data = JSON.parse(res.data);
        if (data.state == 'success') {
          var realpath = data.path; // 服务器返回路径
          urls = urls.concat(realpath);
          console.log(urls);
          continue;
        } else {
          console.log(res);
          throw data.message;
        }
      } catch (e) {
        console.log(e);
        throw '网络连接错误';
      }
    }
    console.log(urls);
    return urls;
  },

  downloadFiles: async function (token, names) {
    var tempFilePaths = [];
    for (var i = 0; i < names.length; i++) {
      var name = names[i];
      try {
        var res = await PR.downloadFile({
          url: utils.getUrl(name), // name is like 'attachments/xxx.jpg'
          header: {
            'token': token,
          },
        });
        if (res.statusCode == 200) {
          tempFilePaths = tempFilePaths.concat(res.tempFilePath);
          continue;
        } else if (res.statusCode == 401) {
          console.error(res);
          throw '认证信息错误';
        } else if (res.statusCode == 404) {
          console.error(res);
          throw '附件不存在或损坏';
        }
      } catch (e) {
        console.log(e);
        throw '附件下载错误';
      }
    }
    return tempFilePaths;
  },

  /**
   * 从服务器获取分享码
   * 
   * @param {*} token 通过login，服务器返回的token
   * @returns 二维码包含的文字信息
   */
  getSharingCode: async function (token, records) {
    console.log('[sharing] start to acquire sharing code');
    try {
      let res = await PR.request({
        url: utils.getUrl('share'),
        method: 'POST',
        data: JSON.stringify(records),
        header: {
          "content-type": "application/json",
          "token": token,
        },
      });
      let data = res.data;
      if (data.state == 'success') {
        console.log('[sharing] success')
        return data.token;
      } else {
        throw `statusCode = ${res.statusCode}`;
      }
    } catch (e) {
      console.error('[sharing] request failed');
      if (typeof(e) == 'string') {
        throw e;
      }
      else {
        throw 'HTTP request failed.';
      }
    }
  },
}