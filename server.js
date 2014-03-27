var recluster = require('recluster');
var path = require('path');
var fs = require('fs');
var url = require('url');
var logger = require('./lib/util/logger');
var environment = require('./lib/util/environment');
var config = require('./lib/util/config');
var quotes = require('./lib/util/quotes');

var cluster = recluster('app.js', { workers: config.server.workers });
cluster.run();

process.on('SIGUSR2', function() {
    logger.warn('Reloading cluster');
    cluster.reload();
});

cluster.on('exit', function(worker) {
    logger.warn('DEFCON %s exited.', worker.workerID);
    logger.warn(quotes.shutdown());
})

var started = 0;
cluster.on('message', function(worker, message) {
    if (message.type === 'started') {
        logger.info('DEFCON %s is listening on %s:%s in %s', worker.workerID, config.server.host, config.server.port, environment);    
        if (++started >= config.server.workers) logger.info(quotes.startup()); 
    }
})