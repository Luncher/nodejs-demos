var xxx = 'value';

var obj1 = !function () {
	console.log('xxx: ', xxx);
	return {
		a: 1,
		b: 2
	};
}();

console.log('obj1:', obj1);
