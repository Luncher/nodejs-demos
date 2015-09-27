var app = function() {
	
};

app.getServersByType = function() {
	
};

var config = {
	prefix: 'globalChannel',
	host: '127.0.0.1',
	port: 6379,
	cleanOnStartUp: true
};

var GlobalChannelService = require('./pomelo-globalchannel-plugin/lib/service/globalChannelService.js');

var manager = new GlobalChannelService(app, config);

manager.start(function(err) {
	manager.add('channel1', 'user1', 'connector-1', function(err) {
		manager.getMembersBySid('channel1', 'connector-1', function(err, ret) {
			console.log('err: ' + err);	
			console.log('ret: ' + ret);	
			manager.leave('channel1', 'user1', 'connector-1', function(err) {
				console.log('err2: ' + err);	
				manager.stop(true, function(err) {
					console.log('err3: ' + err);	
				});
			});
		});	
	});
});
