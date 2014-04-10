var EventEmitter = require('events').EventEmitter
var util = require('util');
var path = require('path');
var _ = require('lodash');

module.exports = Defcon;

function Defcon() {};

Defcon.prototype = Object.create(EventEmitter.prototype);

Defcon.prototype.notify = function(name, data) {
    this.emit(name, data);
    process.send({type: name, data: data});  
}

Defcon.prototype.plugins = [];

Defcon.prototype.registerPlugin = function(plugin) {
    this.plugins.push(plugin);
}

Defcon.prototype.registerPlugin = function(app, plugin) {
    this.plugins.push(plugin);
    if (plugin.app) {
        plugin.url = this.getPluginUrl(plugin.id);
        app.use(plugin.url, plugin.app);
    }
}

Defcon.prototype.getPluginUrl = function(id) {
    return '/plugin/' + id + '/';
}


