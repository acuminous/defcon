var _ = require('lodash');
var async = require('async');

module.exports = PluginFactory;

function PluginFactory(context) {

    if (!(this instanceof PluginFactory)) return new PluginFactory(context);

    var self = this;

    this.create = function(config, next) {
        var pluginContext = _.extend(context, {config: config});
        require(config.id).create(pluginContext, next);
    }

    this.createAll = function(pluginsConfig, next) {
        async.mapSeries(pluginsConfig || [], function(pluginConfig, callback) {
            self.create(pluginConfig, callback)
        }, next);
    }
}