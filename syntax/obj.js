'use strict';

var obj = {};

Object.defineProperty(obj, 1, {
	value: 'a',
	writable: true,
	configurable: true,
	enumerable: true 
});

console.log(obj)
console.log(obj[1])


Object.defineProperty(obj, 1, {
	value: 'cccc',
	writable: true,
	configurable: false,
	enumerable: false 
});

console.log(obj);
console.log(obj[1]);

Object.preventExtensions(obj)

obj[2] = 2
