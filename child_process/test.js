var child_process = require('child_process');

child_process.exec('dir', function(err, stdout, stderr) {
	console.log('err:', err);
	console.log(typeof stdout);
	console.log('stdout:', stdout);
	console.log('stderr:', stderr);
});
