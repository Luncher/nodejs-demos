var path = require('path');
var express = require("express");
var app = express();

app.get("/", express.static(path.join(__dirname)));
app.use("/public", express.static(__dirname));

app.listen(7080);
