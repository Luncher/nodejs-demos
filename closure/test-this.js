var func1 = !function() {
	this.init = function(val) {
		console.log('val: ', val);
	}
}();

module.exports = func1

func1.init(10);
