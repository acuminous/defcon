# DEFCON

## Prerequisits
1. nodejs
1. bower
1. gulp

## Installation
```bash
mkdir defcon
cd defcon
npm install
```

## Recommended Plugins
DEFCON is useless without plugins. A basic set is provided via individual npm modules which should be installed (with ```npm install```) along side the main defcon module.

### Event Log
1. [REST Gateway](http://github.com/acuminous/defcon-rest-gateway) - enables DEFCON to receive events via HTTP
1. [Event Log](http://github.com/acuminous/defcon-event-log) - displays a paginated, sortable & filterable table of events
1. [Logstash UDP](http://github.com/acukinous/defcon-logstash-udp) - forwards events to logstash via UDP

More plugins are planned and we welcome contributions.

## Starting
```bash
NODE_ENV=production node node_modules/defcon/server.js
```
DEFCON starts on localhost:8080 by default. You can override this (and any other configuration setting) from the command line, e.g.

```bash
NODE_ENV=production node node_modules/defcon/server --server.port=9090
```

## Configuration
Configuration is loaded from the following files if they exist

1. $INSTALL_DIR/conf/default.json
1. $INSTALL_DIR/conf/<environment>.json
1. $INSTALL_DIR/conf/<host>.json
1. $INSTALL_DIR/etc/defcon/defcon.json

You can also specify an additional configuration file from the command line, e.g. 
```bash
NODE_ENV=production node node_modules/defcon/server.js --config=/path/to/config.json
```

Since defcon is a container for plugins, it's configuration options are minimal.
'''js
{
    "server": {
        "host": "0.0.0.0",
        "port": 8080,
        "workers": 1
    },
    "plugins": {
        // Specify the list of installed plugins. Order will dictate where the plugins appear in the UI
        installed: [],

        // Insert plugin configuration here, e.g.
        "defcon-event-log": {
            "redis": {
                "host": "localhost",
                "port": 6379,
                "db": 0,
                "options": {
                    "enable_offline_queue": false
                }
            },
            "pageSize": 14,
            "pages": 10
        }
    },
    "logging": {
        // Any entries will be passed directly to winston
        "file": {
            "transport": "File",
            "filename": "defcon.log",
            "maxsize": 1048576,
            "maxFiles": 3,
            "level": "info",
            "colorize": false
        }
    }
}
'''

