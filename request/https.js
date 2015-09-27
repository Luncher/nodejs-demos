var fs = require('fs');
var request = require('request');

request('https://www.baidu.com/img/bdlogo.png').pipe(fs.createWriteStream('cc.png'));
