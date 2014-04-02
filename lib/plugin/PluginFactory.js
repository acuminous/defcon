var _ = require('lodash');
var async = require('async');
var logger = require('../util/logger');

module.exports = PluginFactory;

function PluginFactory(context) {

    if (!(this instanceof PluginFactory)) return new PluginFactory(context);

    var self = this;

    this.create = function(id, config, next) {
        logger.info('Creating plugin %s', id);        
        var pluginContext = _.chain(context).clone().extend({config: config}).value();
        require(id).create(pluginContext, function(err, plugin) {
            if (err) logger.error('Error creating plugin %s : %s', id, err.message);          
            next(err, plugin);
        });
    }

    this.createAll = function(plugins, next) {
        async.mapSeries(plugins && plugins.installed || [], function(pluginId, callback) {
            try {
                self.create(pluginId, plugins[pluginId], callback);
            } catch(err) {
                if (err) logger.error('Error creating plugin %s : %s', pluginId, err.message);          
                next(err);
            }
        }, next);
    }
}