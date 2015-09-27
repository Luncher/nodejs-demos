var fs = require('fs');
var path = require('path');
var childProcess = require('child_process');

var webHooks = function() {

};

webHooks.doit = function(data) {
	var logFilePath = path.join(__dirname, 'webhooks.log');
	var sh = path.join(__dirname, 'sync.sh');
	
	if(data && data.commits) {
		fs.appendFile(logFilePath, JSON.stringify(data.commits, null, '\t'), function(err, ret) {
			if(err) {
				console.log('append webhooks log fail: ' + err);
			}
			else {
				var child = childProcess.execFile(sh, function(err, result) {
					if(err) {
						console.log(JSON.stringify(err, null, '\t'));
					}
					child.close();
				});
			}
		});
	}
};

exports = module.exports = webHooks;
