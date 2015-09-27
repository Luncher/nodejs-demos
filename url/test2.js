var url = require('url');

var obj = {
	action: 'run'
};

var a = url.format({ 
protocol : 'http' , 
auth : null , 
host : 'example.com:8080' , 
port : '8080' , 
hostname : 'example.com' , 
hash : null , 
search : null, 
query : {a: '1', b: '2'}, 
pathname : '/one', 
path : null, 
href : 'http://example.com:8080/one?a=index&t=article&m=default' 
});
console.log(a);

var dat = url.format(obj);
console.log('dat', dat);
