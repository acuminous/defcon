var express = require('express');
var exphbs = require('express3-handlebars');
var path = require('path');
var _ = require('lodash');
var config = require('./lib/util/config');
var logger = require('./lib/util/logger');
var environment = require('./lib/util/environment');
var HandlebarsHelpers = require('./lib/util/HandlebarsHelpers');
var PluginFactory = require('./lib/plugin/PluginFactory');
var Defcon = require('./lib/Defcon');
var app = express();    

var defcon = new Defcon();
var staticDir = path.join(process.cwd(), 'static');
var templatesDir = path.join(staticDir, 'templates');    
var viewsDir = path.join(templatesDir, 'views');

app.disable('x-powered-by');
app.disable('view cache');    
app.set('view engine', 'handlebars');
app.set('views', viewsDir);
app.set('plugins', []);

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(templatesDir, 'layouts'),
    partialsDir: viewsDir,
    helpers: new HandlebarsHelpers(defcon)
}));

new PluginFactory({ defcon: defcon, logger: logger }).createAll(config.plugins, function(err, plugins) {
    if (err) return logger.die('Unable to start due to previous errors');

    _.each(plugins, function(plugin) {
        defcon.mountPlugin(app, plugin);
    });

    app.get('/', function(req, res) {
        res.render('index', { 
            defcon: defcon          
        });
    })

    app.use(app.router);    
    app.use('/', express.static(staticDir));

    app.use(function(req, res, next){
        res.status(404).render('404', {
            defcon: defcon       
        });
    });

    app.use(function(err, req, res, next){
        res.status(500).sendfile(path.join(staticDir, 'html', '500.html'));
        logger.error('Internal server error: %s', err.message);
    });

    app.listen(config.server.port, config.server.host, function(err) {        
        if (err) logger.die("Error starting DEFCON : %s", err.message);
        defcon.notify('start');       
    });
})