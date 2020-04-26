var formatNumber = function(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

var json2Form = function(json) {
  var str = [];
  for (var p in json) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  // console.log(str.join("&"));
  return str.join("&");
}

module.exports = {
  formatNumber: formatNumber,
  json2Form: json2Form,
}
