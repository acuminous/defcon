var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var json = require('./json');
var async = require('async');

module.exports = plugins();

function plugins() {

    return {
        installed: installed
    }

    function installed(next) {
        fs.readdir(path.join(process.cwd(), 'node_modules'), function(err, modules) {
            if (err) return next(err);
            var paths = _.chain(modules).filter(byDefconModule).map(toDefconPluginPath).filter(byDefconPlugin).value();
            console.log(paths);
            async.map(paths, toDefconPlugin, next);
        });
    }

    function byDefconModule(folder) {
        console.log(folder);
        return /^defcon-.+/.test(folder);
    }

    function toDefconPluginPath(folder) {
        return path.join('node_modules', folder, 'plugin.js');
    }

    function byDefconPlugin(pluginPath) {
        return fs.existsSync(pluginPath);
    }

    function toDefconPlugin(pluginPath, next) {
        var DefconPlugin = require(path.resolve(pluginPath));        
        next(null, new DefconPlugin());
    }
}