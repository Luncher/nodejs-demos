function foo() {
	var val = 'hello';

	function bar() {
		function baz() {
			this.val = 'world';
		}

		baz();
		console.log('val1:', val);
	}
	bar();
}

foo();

console.log('val2:', val);
