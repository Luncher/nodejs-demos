var btoa = require('btoa');
var atob = require('atob');
var urllib = require('urllib');
var urlParser = require('url')
var querystring = require('querystring');

//var url = 'http://www.i5r.com.cn/weixin/php/json_config.php';
var url = 'http://www.i5r.com.cn/get-sign-package.php';
var params = {
	operator: 'tangram2015',
	url: btoa('http://wwwi5r.com.cn/index.html')
};

var remote = url + '?' + querystring.stringify(params);

urllib.request(remote, function(err, data, res) {
	console.log('res:', res);
});

//var query = urlParser.parse(remote, true).query;
//var query2 = querystring.parse(remote);
//
//console.log('query2:', query2);
//console.log('rawURL:', query.url);
//
//console.log('realURL:', atob(query.url));
//
//console.log('remote:', remote);
