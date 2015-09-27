//var datejs = require('datejs');

var startStr1 = '2015-7-3 1:3';
var startStr2 = '2015-07-03 01:03';
var startStr3 = '2015-7-03 1:03';
var endStr = '2015-8-23 23:59';

var startDate1 = Date.parse(startStr1);
var startDate2 = Date.parse(startStr2);
var startDate3 = Date.parse(startStr3);

var endDate   = Date.parse(endStr);

console.assert(startDate1 === startDate2 && startDate2 === startDate3);
var now = Date.now();

console.assert(now > startDate3 && now < endDate);

var q = Date.parse('2015-123-3');

console.log(q);
