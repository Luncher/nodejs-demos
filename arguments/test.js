var func1 = function() {
	var keys = Object.keys(arguments);

	for(var i = 0, l = keys.length; i < l; i++) {
		var k = keys[i];
		console.info('key: ', k, 'value:', arguments[k]);
	}
};

func1.call(null, 1, 2);
