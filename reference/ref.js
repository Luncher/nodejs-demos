var arr1 = [1, 2, 3];
var arr2 = arr1;

arr1 = [];

console.log('arr1,' , arr1);
console.log('arr2,' , arr2);

var obj1 = {
	a: 1,
	b: {
		cc: 'aaa'
	}
};

var b = obj1.b;

//delete obj1.b;
!function() {
	b.xxx = 'fuck';
}();
console.log('b: ', b);
console.log('obj1.b: ', obj1.b);
