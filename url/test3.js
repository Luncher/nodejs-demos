var urlParser = require('url');

var url = 'http://www.example.com/foo/bar.json?a=b#slash';

//var urlObj = urlParser.parse(url);
//
var str1 = './demo1.json';
var dst = urlParser.resolve(str1, 'water.png');


