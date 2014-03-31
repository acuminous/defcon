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

Defcon.prototype.mountPlugin = function(app, plugin) {
    if (!plugin.app) return;
    var url = this.getPluginUrl(plugin.name);    
    app.use(url, plugin.app);
    this.plugins.push(_.extend(plugin, { url: url }))
}

Defcon.prototype.getPluginUri = function(name) {
    return name.replace(/\W/g, '-').toLowerCase()
}

Defcon.prototype.getPluginUrl = function(name) {
    return '/plugin/' + this.getPluginUri(name) + '/';
}


