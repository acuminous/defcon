var _ = require('lodash');

module.exports = Helpers;

function Helpers(defcon) {

    this.plugin = function(plugin, options) {
        if (plugin && plugin.ui) return options.fn({
            name: plugin.name,
            icon: plugin.icon,
            url: defcon.getPluginUrl(plugin.name)
        });
    };
}