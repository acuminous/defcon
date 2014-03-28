var winston = require('winston');
var config = require('./config');
var _ = require('lodash');

module.exports = logger();

function logger() {

    winston.Logger.prototype.die = function() {
        this.error.apply(this, Array.prototype.slice.apply(arguments));
        process.exit(1);
    }

    return new winston.Logger({
        transports: _.map(config.logging, toTransport)
    });

    function toTransport(config) {
        return new winston.transports[config.type](config);
    }
};
