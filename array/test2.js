var arr = [1, 2, 3, 4, 5];

var ret = arr.some(function(iter) {
	if(iter > 3) {
		return true;
	}
	console.log(iter);
});

var arr2 = [6, 7, 8, 9, 10];

var arr3 = arr.concat(arr2);
console.log(arr3);

var ret1 = arr3.splice(0, 1);

console.log(ret1);
console.log(arr3);

function count(total, cur) {
	return total + cur;
}

var ret2 = arr3.reduce(count);

console.log(ret2);

console.log('------------------------');
var ret3 = arr3.every(function(it) {
	console.log(it);
	return it >= 5;
})

console.log(ret3);
