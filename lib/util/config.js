var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var environment = require('./environment');

module.exports = config();

function config() {

    var files = {
        default_config: path.join('conf', 'default.json'),    
        environmental_config: path.join('conf', environment + '.json'),
        private_config: path.join('conf', 'private.json')
    }

    var nconf = require('nconf').argv();
    nconf.file('runtime config', path.join('conf', 'runtime.json'));    
    nconf.file('environmental config', path.join('conf', environment + '.json'));
    nconf.file('default config', path.join('conf', 'default.json'));    

    return nconf.get();
}
