name = 'global';
var obj1 = {name: 'foo'};
var showName = function() {
    console.log(this.name);
};

showName();

var showObj = showName.bind(obj1);

showObj();

var showParams = function () {
	var params = Array.prototype.slice.call(arguments);
	var str = params.join('+');
	console.log('name: ' + this.name);
	console.log('params: ' + str);
};

var showParams2 = function () {
	var params = Array.prototype.slice.call(arguments);
	var str = params.join('-');
	console.log('name: ' + this.name);
	console.log('params: ' + str);
};


function createDispatcher(func, context) {
	var args = Array.prototype.slice.call(arguments, 2);
	return function() {
		var newArgs = args.concat(Array.prototype.slice.call(arguments));
		func.apply(context, newArgs);
	};
}

createDispatcher(showParams, {name: 'obj1'})(3,4,5);
createDispatcher(showParams2, {name: 'obj2'})(3,4,5);
