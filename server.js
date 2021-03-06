var recluster = require('recluster');
var path = require('path');
var url = require('url');
var logger = require('./lib/util/logger');
var environment = require('./lib/util/environment');
var config = require('./conf');
var quotes = require('./lib/util/quotes');


var app = path.join(__dirname, 'app.js');
var cluster = recluster(app, { workers: config.server.workers });
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
cluster.on('message', function(worker, event) {
    if (event.type === 'start') {
        logger.info('DEFCON %s is listening on %s:%s in %s', worker.workerID, config.server.host, config.server.port, environment);    
        if (++started >= config.server.workers) logger.info(quotes.startup()); 
    }
})