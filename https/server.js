var https = require('https')
	,http = require('http')
	,fs = require('fs')
	,express = require('express');

var credentails = {
	key: fs.readFileSync('./privatekey.pem'),
	cert: fs.readFileSync('./certificate.pem')
};

var app = express();

app.use('/', function(req, res) {
	res.send('hello');
});

//var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentails, app);

httpsServer.listen(443);
