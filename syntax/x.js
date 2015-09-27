var obj = {
}

Object.defineProperty(obj, 1, {
	value: 'a',
	enumerable: true
});

Object.defineProperty(obj, 2, {
	value: 'b',
	enumerable: false 
});

console.log(obj)
console.log('1' in obj);
console.log('2' in obj);
console.log(obj.hasOwnProperty('1'));
console.log(Object.getOwnPropertyNames(obj));
console.log(Object.keys(obj));
console.log(obj[2]);

for(var j in obj) {
	console.log(j)
}

