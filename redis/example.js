var redis = require('redis');
var client = redis.createClient(6969, '127.0.0.1', {});

client.on('error', function(e) {
	console.error(e);
});

/*
client.set("string key", "string val", redis.print);
client.hset('hash key', 'hashtest 1', "some value", redis.print);
client.hset(['hash key', 'hashtest 2', 'some other value'], redis. print);
client.hkeys('hash key', function(err, replies) {
	console.log(replies.length + " replies:");
	replies.forEach(function(reply, i) {
		console.log("	" + i + ": " + reply);
	});
	client.quit();
});

*/
var obj1 = {
	name: 'channel1',
	image: 'channel1.ong',
	time: Date.now()
};

var obj2 = {
	name: 'channel2',
	image: 'channel2.ong',
	time: Date.now()
};

client.HMSET(obj1.name, obj1);
client.HMSET(obj2.name, obj2);
/*
client.hgetall(obj1.name, function(err, obj) {
	console.log(JSON.stringify(obj));
});

client.hgetall(obj2.name, function(err, obj) {
	console.log(JSON.stringify(obj));
});
*/
client.keys('POMELO:CHANNEL:*', function(err, replies) {
	console.log(replies);
	var cmds = [];
	for(var index= 0; index < replies.length; index++) {
		cmds.push(['hgetall', replies[index]]);	
	}
	client.multi(cmds).exec(function(err, reply) {
		console.log('err' + err);
		console.log('reply: ' + JSON.stringify(reply, null, '\t'));
	});
});	
