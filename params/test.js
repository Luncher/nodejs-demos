function a(x, y) {
	console.log(typeof hhh);

	if(y) {
		console.log('ok');
	}
	console.log(arguments.length);
	//console.log(typeof x);
}

console.log(a.length);

a();

function testx(ptr) {
	if(!ptr.a) {
		ptr.a = ('hello world!');	

		console.log('here');
	}
}

var obj = {a: null};

testx(obj);

console.log('obj: ', obj)
