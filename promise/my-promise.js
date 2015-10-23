module.exports = Promise;

var assert = require('assert');

function Promise(func) {
	if(typeof func !== 'function') {
		throw new TypeError('func must be a function');
	}

	this.queue = [];
	this.outcome = void 0;
	this.state = Promise.STATE_NORMAL;

	if(func !== INTERNAL) {
		Promise.resolveThenable(this, func);
	}
}

Promise.STATE_NORMAL = 'normal';
Promise.STATE_RESOLVE = 'resolve';
Promise.STATE_REJECT = 'reject';

function INTERNAL() {}

Promise.resolveThenable = function(promise, thenable) {
	var called = false;

	function onSucceed(value) {
		if(!called) {
			called = true;
			Promise.doResolve(promise, value);
		}
	}

	function onRejected(error) {
		if(!called) {
			called = true;
			Promise.doReject(promise, error);
		}
	}

	function wrapThenable() {
		thenable(onSucceed, onRejected);	
	}

	Promise.safeCall(wrapThenable);	
};

Promise.resolveThenable = function(promise, thenable) {
	var called = false;

	function onSucceed(value) {
		if(!called) {
			called = true;
			Promise.doResolve(promise, value);
		}
	}

	function onRejected(error) {
		if(!called) {
			called = true;
			Promise.doReject(promise, error);
		}
	}

	function wrapThenable() {
		thenable(onSucceed, onRejected);	
	}

	Promise.safeCall(wrapThenable);	
};

Promise.prototype.then = function(onFulfilled, onReject) {
	if(this.state === Promise.STATE_REJECT && typeof onReject !== 'function'
		|| this.state === Promise.STATE_RESOLVE && typeof onFulfilled !== 'function') {
		return this;
	}

	var newPromise = new this.constructor(INTERNAL);
	if(this.state !== Promise.STATE_NORMAL) {
		var handler = this.state === Promise.STATE_REJECT ? onReject : onFulfilled;	
		Promise.callNextTick(newPromise, handler, this.outcome);
	}
	else {
		this.queue.push({promise: newPromise, onFulfilled: onFulfilled, onReject: onReject});		
	}

	return newPromise;
};

Promise.prototype.reject = function(onReject) {
	return this.then(null, onReject);
};

Promise.doResolve = function(promise, value) {
	var ret = Promise.safeCall(Promise.getThen, value)

	if(ret.value) {
		Promise.resolveThenable(promise, ret.value);		
	}
	else {
		promise.outcome = value;
		promise.state = Promise.STATE_RESOLVE;	

		promise.queue.forEach(function(iter) {
			assert(iter.promise !== promise); 
			Promise.callNextTick(iter.promise, iter.onFulfilled, promise.outcome);
		});
	}
};

Promise.getThen = function(obj) {
	var then = obj && obj.then;	

	if(typeof then === 'function') {
		return function() {
			then.apply(obj, arguments);
		};
	}
};

Promise.doRejected = function(promise, error) {
	promise.state = Promise.STATE_REJECT;
	promise.outcome = error;

	promise.queue.forEach(function(iter) {
		assert(iter.promise !== promise); 
		Promise.callNextTick(iter.promise, iter.reject, promise.outcome);
	});
};

Promise.safeCall = function(func, value) {
	var ret = {};
	
	try {
		ret.value = func(value);
		ret.state = 'success';
	}
	catch(err) {
		ret.state = 'error';
		ret.value = err;
	}

	return ret;
};

Promise.callNextTick = function(promise, handler, outcome) {
	setTimeout(function() {
		var ret;
		try {
			ret = handler(outcome);
		}
		catch(err) {
			Promise.doReject(promise, err);
		}

		Promise.doResolve(promise, ret);
	}, 0);

};
