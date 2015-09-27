var a = {a: 'b', c: 'd'};

console.log('keys1:', Object.keys(a));

Object.prototype.d = 'val1';

console.log('keys2:', Object.keys(a));

for(var k in a) {
	console.log(k);
}
