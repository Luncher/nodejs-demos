function f1() {
	console.log('I am f1');
};

function f1() {
	console.log('I am f1');
};

var mapper = {};

function reg(evt, doit) {
	if(!mapper[evt]) {
		mapper[evt] = [doit];
	}
	else {
		var exists = false;
		var str = doit.toString();
		for(var i = 0; i < mapper[evt].length; i++) {
			var str2 = mapper[evt].toString();	
			if(str2 === str) {
				exists = true;
				break;
			}
		}
		if(!exists) {
			mapper[evt].push(doit);
		}
	}
}

reg('e', f1);
reg('e', f1);
