var fs = require('fs');
var path = require('path');
var hostname = require('os').hostname().replace(/\..*/, '');
var environment = require('../lib/util/environment');

module.exports = config();

function config() {

    var nconf = require('nconf').argv();

    if (nconf.get('config')) nconf.file('custom config', nconf.get('config'));
    nconf.file('etc config', path.join(path.sep, 'etc', 'defcon', 'defcon.json'));
    nconf.file('host config', path.join(__dirname, hostname + '.json'));    
    nconf.file('environmental config', path.join(__dirname, environment + '.json'));
    nconf.file('default config', path.join(__dirname, 'default.json'));    

    return nconf.get();
}
