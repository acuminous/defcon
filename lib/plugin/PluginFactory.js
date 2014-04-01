var _ = require('lodash');
var async = require('async');
var logger = require('../util/logger');

module.exports = PluginFactory;

function PluginFactory(context) {

    if (!(this instanceof PluginFactory)) return new PluginFactory(context);

    var self = this;

    this.create = function(config, next) {
        logger.info('Creating %s', config.id);        
        var pluginContext = _.extend(context, {config: config});
        require(config.id).create(pluginContext, function(err, plugin) {
            if (err) logger.error('Error creating plugin %s : %s', config.id, err.message);          
            next(err, plugin);
        });
    }

    this.createAll = function(pluginsConfig, next) {
        async.mapSeries(pluginsConfig || [], function(pluginConfig, callback) {
            try {
                self.create(pluginConfig, callback)
            } catch(err) {
                if (err) logger.error('Error creating plugin %s : %s', pluginConfig.id, err.message);          
                next(err);
            }
        }, next);
    }
}