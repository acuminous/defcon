var express = require('express');
var exphbs = require('express3-handlebars');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var config = require('./lib/util/config');
var logger = require('./lib/util/logger');
var environment = require('./lib/util/environment');
var plugins = require('./lib/util/plugins');
var handlebarsHelpers = require('./lib/util/handlebarsHelpers');
var EventBus = require('./lib/EventBus');
var eventBus = new EventBus();
var app = express();    

var staticDir = path.join(process.cwd(), 'static');
var templatesDir = path.join(staticDir, 'templates');    
var layoutsDir = path.join(templatesDir, 'layouts');
var viewsDir = path.join(templatesDir, 'views');
var pluginsDir = path.join(process.cwd(), 'node_modules');

plugins.installed(function(err, plugins) {

    app.disable('x-powered-by');

    var handlebarsConfig = {
        defaultLayout: 'main',
        layoutsDir: layoutsDir,
        partialsDir: [viewsDir],
        helpers: handlebarsHelpers        
    }

    app.set('view engine', 'handlebars');
    app.disable('view cache');

    app.get('/', function(req, res) {
        app.set("views", viewsDir);        
        res.render('home', { environment: environment })
    })
   
    _.each(plugins, function(plugin) {
        plugin.init(eventBus, app, handlebarsConfig);
    })

    app.engine('handlebars', exphbs(handlebarsConfig));

    app.use(app.router);    
    app.use('/', express.static(staticDir));


    app.use(function(err, req, res, next){
        res.status(500).sendfile(path.join(staticDir, 'html', '500.html'));
        logger.error('Internal server error: %s', err.message);
    });

    app.use(function(req, res, next){
        res.status(404).sendfile(path.join(staticDir, 'html', '404.html'));
    });

    app.listen(config.server.port, config.server.host, function(err) {
        if (err) {
            logger.error("Error starting DEFCON : %s", err.message);
            process.exit(1);
        }
        process.send({ type: 'started' });
        eventBus.emit('start', config.server.port, config.server.host);        
    });    
})