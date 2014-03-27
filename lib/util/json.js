var _ = require('lodash');

module.exports = {    
    parse: function(text, next) {
        try {
            next(null, JSON.parse(text));
        } catch (e) {
            next(e);
        }
    },
    stringify: function(json, options, next) {
        if (arguments == 2) return this.stringify(json, {}, next);
        try {
            next(null, JSON.stringify(json, options))
        } catch (e) {
            next(e);
        }
    },
    isJson: function(text) {
        if (!_.isString) return false;
        try {
            JSON.parse(text);
            return true;
        } catch (e) {
            return false;
        }
    }
}
