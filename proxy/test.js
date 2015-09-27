
var obj1 = {
	name: 'linccc',
	sayHello: function() {
		console.log('hello');
	},
	init: function(a, b) {
		console.log('name:', this.name);
		console.log('call inited');
		console.log('a:', a, 'b:', b);
	}
};

var singlatonProxy = function(obj) {
	var inited = false;
	var proxy = obj.init;
	
	Object.defineProperty(obj, 'init', {
		get: function() {
			if(!inited) {
				return proxy;
			}
			else {
				return function() {};
			}
		}
	});
};

singlatonProxy(obj1);
obj1.init(1, 2);
obj1.sayHello();
