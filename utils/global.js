let records;
let resolveList = [];
let rejectList = [];

async function getRecords() {
  if (records != undefined) {
    return records;
  }
  else {
    return new Promise((resolve, reject) => {
      resolveList.push(resolve);
      rejectList.push(reject);
    });
  }
}

function recordDownloaded(data) {
  records = data;
  for (let resolve of resolveList) {
    resolve(records);
  }
  resolveList = [];
  rejectList = [];
}

function recordDownloadFailed(err) {
  records = [];
  for (let reject of rejectList) {
    reject(err);
  }
  resolveList = [];
  rejectList = [];
}

module.exports = { getRecords, recordDownloaded, recordDownloadFailed };
