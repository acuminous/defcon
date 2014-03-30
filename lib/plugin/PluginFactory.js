var _ = require('lodash');
var async = require('async');

module.exports = PluginFactory;

function PluginFactory(defcon, app) {

    if (!(this instanceof PluginFactory)) return new PluginFactory(defcon, app);

    var self = this;

    this.create = function(pluginConfig, next) {
        var plugin = require(pluginConfig.id);
        plugin(defcon, app, pluginConfig, next);
    }

    this.createAll = function(pluginsConfig, next) {
        async.mapSeries(pluginsConfig || [], function(pluginConfig, callback) {
            self.create(pluginConfig, callback)
        }, next);
    }
}