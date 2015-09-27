var url = 'http://www.i5r.com.cn/apprun-upyunosgames1751433121979268.html';

var start1 = url.indexOf('-') + 1;
var start2 = url.indexOf('.html');
var appid = url.slice(start1, start2);
console.log('appid: ' + appid);
