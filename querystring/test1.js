var querystring = require('querystring');

var path = 'foo=bar&a=v';

var params = querystring.parse(path);

console.log('params: ', params);

