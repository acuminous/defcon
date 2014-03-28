var _ = require('lodash');

module.exports = Helpers;

function Helpers(defcon) {

    this.plugin = function(plugin, options) {
        if (!plugin) return console.log(options);
        return options.fn({
            name: plugin.getName(),
            url: defcon.getPluginUrl(plugin.getName())
        });
    };
}