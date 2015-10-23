module.exports = Promise;

function Promise(func) {
	if(typeof func !== 'function') {
		throw new TypeError('func must be a function');
	}

	this.queue = [];
	this.outcome = void 0;
	this.state = Promise.STATE_NORMAL;

	if(func !== INTERNAL) {
		Promise.safeResolve(this, func);
	}
}

function INTERNAL() {}

Promise.STATE_NORMAL = 'normal';
Promise.STATE_REJECT = 'reject';
Promise.STATE_FULFILLED = 'fulfilled';

Promise.safeResolve = function(promise, thenable) {
	var called = false;

	function onSucceed(value) {
		if(!called) {
			called = true;
			Promise.doResolve(promise, value);
		}
	}

	function onRejected(value) {
		if(!called) {
			called = true;
			Promise.doReject(promise, value);
		}
	}

	function wrapThenable() {
		thenable(onSucceed, onRejected);
	}
	
	var ret = Promise.safeCall(wrapThenable);

	if(ret.state === 'error') {
		Promise.doReject(promise, ret.value);
	}
};

Promise.safeCall = function(func, param) {
	var ret = {};

	try {
		ret.value = func(param);
		ret.state = 'success';
	}
	catch(err) {
		ret.value = err;
		ret.state = 'error';
	}

	return ret;
};

Promise.getThen = function(obj) {
	var then = obj && obj.then;

	if(typeof then === 'function') {
		return function() {
			then.apply(obj, arguments);	
		};
	}
};

Promise.doResolve = function(promise, value) {
	var ret = Promise.safeCall(Promise.getThen, value);	
	var thenable = ret.value;
	
	if(ret.state === 'error') {
		return Promise.doReject(promise, ret.value);
	}

	if(thenable) {
		Promise.safeResolve(promise, thenable);	
	}
	else {
		promise.outcome = value;
		promise.state = Promise.STATE_FULFILLED;
		promise.queue.forEach(function(iter) {
			Promise.callNextTick(iter.promise, iter.onFulfilled, promise.outcome);
		});
	}
};

Promise.doReject = function(promise, error) {
	promise.state = Promise.STATE_REJECT;
	promise.outcome = error;

	promise.queue.forEach(function(iter) {
		Promise.callNextTick(iter.promise, iter.onRejected, promise.outcome);
	});
};

Promise.callNextTick = function(promise, func, param) {
	setTimeout(function() {
		var ret;

		try {
			ret = func(param);
		}
		catch(err) {
			Promise.doReject(promise, err);		
		}

		if(ret === promise) {
			throw new Error("promise can't resolve him self");	
		}
		else {
			Promise.doResolve(promise, ret);
		}	
	}, 0);
};

Promise.prototype.then = function(onFulfilled, onRejected) {
	if(this.state === Promise.STATE_FULFILLED && typeof onFulfilled !== 'function'
		|| this.state === Promise.STATE_REJECT && typeof onRejected !== 'function') {
		return this;	
	}

	var newPromise = new this.constructor(INTERNAL);

	if(this.state !== Promise.STATE_NORMAL) {
		var handler = this.state === Promise.STATE_REJECT ? onRejected : onFulfilled;
		Promise.callNextTick(newPromise, handler, this.outcome);
	}
	else {
		this.queue.push({promise: newPromise, onFulfilled: onFulfilled, onRejected: onRejected});	
	}

	return newPromise;
};

Promise.prototype.catch = function(onRejected) {
	return this.then(null, onRejected);	
};

Promise.resolve = function(param) {
	if(param instanceof this) {
		return param;
	}

	return Promise.doResolve(new this(INTERNAL), param);
};

Promise.reject = function(reason) {
	return Promise.doReject(new this(INTERNAL), reason);
};

Promise.optimizeMulti = function(predicate) {
	return function(iterable) {
		if(!Array.isArray(iterable)) {
			throw new Error('iterable must a array');	
		}
		
		var length = iterable.length;
		if(!length) {
			return Promise.resolve([]);
		}

		var promise = new Promise(INTERNAL);	
		predicate(promise, iterable);

		return promise;
	}
};

Promise.race = Promise.optimizeMulti(function(promise, iterable) {
	var called = false;
	for(var i = 0; i < iterable.length; i++) {
		var iter = iterable[i];					
		Promise.resolve(iter).then(function(ret) {
			if(!called) {
				called = true;
				Promise.doResolve(promise, ret);	
			}
		}, function(error) {
			if(!called) {
				called = true;
				Promise.doReject(promise, error);
			}
		});	
	}
});

Promise.all = Promise.optimizeMulti(function(promise, iterable) {
	var result = [],
		called = false,
		count = iterable.length;

	for(var i = 0; i < count; i++) {
		var iter = iterable[i];					
		Promise.resolve(iter).then(function(ret) {
			result.push(ret);
			if(!called && count === result.length) {
				called = true;
				Promise.doResolve(promise, result);	
			}
		}, function(error) {
			if(!called) {
				called = true;
				Promise.doReject(promise, error);
			}
		});
	}
});
