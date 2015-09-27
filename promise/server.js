var path = require('path');
var express = require("express");
var app = express();

app.get("/", express.static(path.join(__dirname)));
app.use("/public", express.static(__dirname));
app.get('/promise/test1', function(req, res) {
	res.json('hello world');
});
app.get("/promise/test2", function(req, res) {
	res.json('linchen come on!!!');
});

app.listen(7080);
