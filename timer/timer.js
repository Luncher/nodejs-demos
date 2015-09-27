var n = 10;
setTimeout(function() {
	console.log(n);
	if(n > 0) {
		n--;
		setTimeout(arguments.callee(), 10);
	}
}, 10);

