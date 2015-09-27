//var arr = [1, 2, 3];
//
//var val = arr.slice(-1, -2);
//var val3 = arr.slice(2);
//var val2 = arr.splice(2);
//
//console.log(val2);
//console.log(val3);
//
var arr2 = [4, 5, 6];

var ret = arr2.splice(1, 1);
console.log('ret:', ret);
console.log('arr2:', arr2);

function func() {
	var params1 = arguments[arguments.length - 1];
	console.log(params1);
}

func(1, 2, 3);
