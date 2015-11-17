var UPYUN = require('upyun');


var upyun = new UPYUN('tangide', 'tangide', 'Os#Games@TIDE');

upyun.listDir('/', 0, 'asc', 0, function (err, result) {
	console.log('err' + err);	
});
