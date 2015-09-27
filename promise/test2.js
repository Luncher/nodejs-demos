
function genP1() {
	return new Promise(function(resolve) {
		resolve(3);
	});
}

genP1().then(function(ret) {
	console.log('1:', ret);
}).catch(function(err) {
	console.log('err:', err);	
});

Promise.resolve(3).then(function(ret) {
	console.log('2:', ret);
});

Promise.reject(new Error("Boom")).catch(function(err) {
	console.error(err);
});

Promise.reject(new Error("Boom2")).then(null, function(err) {
	console.error(err);
});

var promise = new Promise(function(resolve) {
	console.log("inner promise");
	resolve(3);
});

promise.then(function(value) {
	console.log(value);
})

console.log("outer promise");






