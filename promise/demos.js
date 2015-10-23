var assert = require('assert');
var Promise = require('./my-promise2');

////test1
//new Promise(function(resolve, reject) {
//	resolve(true);
//}).then(function(result) {
//	assert(result === true);
//});
//
////test2
//new Promise(function(resolve, reject) {
//	resolve(new Promise(function(resolve, reject) {
//		resolve(true);
//	}));
//}).then(function(result) {
//	assert(result === true);
//});
//
////test3
//try {
//	new Promise(true);
//}catch(e) {
//	assert(e instanceof TypeError);
//}
//
////test4
//new Promise(function() {
//	throw new Error('boom');
//}).catch(function(err) {
//	assert(err instanceof Error);
//});

////test5
//Promise.resolve(true).then(function(value) {
//	assert(value === true);
//});

//test6
Promise.resolve(1)
.then(function (value) {
	console.log('1' + value);
	return Promise.resolve(value+1).then(function(value) {
		console.log('2' + value);
		return value + 1;
	});
})
.then(function (value) {
	console.log('3' + value);
	assert(value === 0);	
});
