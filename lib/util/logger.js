var winston = require('winston');
var config = require('./config');
var _ = require('lodash');

module.exports = logger();

function logger() {

    return new winston.Logger({
        transports: _.map(config.logging, toTransport)
    });

    function toTransport(config) {
        return new winston.transports[config.type](config);
    }
};
