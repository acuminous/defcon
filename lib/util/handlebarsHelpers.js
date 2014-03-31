var _ = require('lodash');

module.exports = Helpers;

function Helpers(defcon) {

    this.pluginResource = function(name, url) {
        return defcon.getPluginUrl(name) + '/' + url;
    }
}