var fs = require('fs');

var stream = fs.createReadStream(__filename);
var chunks = [];
var size = 0;

stream.on('data', function(chunk) {
	chunks.push(chunk);
	size += chunk.length;
});

stream.on('end', function() {
	var buf = Buffer.concat(chunks, size);	
	var str = buf.toString('utf8');
	console.log('str: ', str);
});
