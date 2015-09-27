var util = require('util');
var events = require('events');

function Stream() {
	events.EventEmitter.call(this);
}

util.inherits(Stream, events.EventEmitter);
