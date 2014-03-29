var _ = require('lodash');
var async = require('async');
var path = require('path');

module.exports = PluginFactory;

function PluginFactory(defcon, app) {

    if (!(this instanceof PluginFactory)) return new PluginFactory(defcon, app);

    var self = this;

    this.create = function(moduleName, next) {
        var pluginPath = path.join(process.cwd(), 'node_modules', moduleName, 'plugin');        
        var plugin = require(path.resolve(pluginPath));
        return next(null, plugin(defcon, app));
    }

    this.createAll = function(moduleNames, next) {
        async.mapSeries(moduleNames || [], function(moduleName, callback) {
            self.create(moduleName, callback)
        }, next);
    }
}