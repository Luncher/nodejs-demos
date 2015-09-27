var file1 = require('./file1');
var file2 = require('./file1');

(file1());
(file2());

console.log(file1 === file2);
