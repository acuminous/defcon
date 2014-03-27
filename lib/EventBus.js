var EventEmitter = require('events').EventEmitter
var util = require('util');

module.exports = EventBus;

function EventBus() {
}

EventBus.prototype = Object.create(EventEmitter.prototype);