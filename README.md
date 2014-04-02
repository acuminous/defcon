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

Since defcon is a container for plugins, it's configuration options are minimal. However the install does 
ship with a basic set of plugins to get you started...
'''js
{
    "server": {
        "host": "0.0.0.0",
        "port": 8080,
        "workers": 1
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
    },
    "plugins": {
        // A list of installed plugins, defcon-rest-gateway and defcon-event-log are installed by default
        "installed": [
            "defcon-rest-gateway",
            "defcon-event-log"
        ],
        // Configuration for the plugins
        "defcon-event-log": {
            "redis": {
                "host": "localhost",
                "port": 6379,
                "db": 0,

                // The following options are passed straight through to the node redis module. 
                // If you need a password, set it here
                "options": {
                    "enable_offline_queue": false
                }
            },
            // pageSize controls the numbrer of events to display in the event-log
            // pages controls the number of pages available for pagination
            // surplus events (those after pageSize * pages) are deleted automatically
            // If you want to retain events for longer install additional plugins, e.g. defcon-logstash-udp
            "pageSize": 14,
            "pages": 10
        }
    }
}
'''