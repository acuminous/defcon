# DEFCON
DEFCON is a highly extensible, multi-scensory information radiator. Out of the box it does nothing, but by installing (or writing) the correct set of plugins it can become a dashboard for events transmitted via any network protocol you want. In addition to displaying these events, it can forward them to other system such as logstash or even another DEFCON instance. There are plugins which play audible alarms when certain events are received.

## Prerequisits
1. [nodejs](http://nodejs.org)

## Installation
```bash
mkdir defcon
cd defcon
npm install defcon
```

## Recommended Plugins
DEFCON is useless without plugins. A basic set is provided via individual npm modules which should be installed (with ```npm install```) from the defcon installiation directory, so that the modules are installed as syblings of defcon rather than children, e.g.

```
/var/opt/defcon$ tree -d -L 2
.
└── node_modules
    ├── defcon
    ├── defcon-event-log
    └── defcon-rest-gateway
```
The recommended plugins are as follows. Please see their README.md files for installation and configuration.

| Plugin | Description |
|--------|-------------|
| [REST Gateway](http://github.com/acuminous/defcon-rest-gateway) | Enables DEFCON to receive events via HTTP |
| [Event Log](http://github.com/acuminous/defcon-event-log) | Displays a paginated, sortable & filterable table of events |
| [Logstash UDP](http://github.com/acuminous/defcon-logstash-udp) | Forwards events to logstash via UDP |

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
1. $INSTALL_DIR/conf/<hostname>.json
1. $INSTALL_DIR/etc/defcon/defcon.json

You can also specify an additional configuration file from the command line, e.g. 
```bash
NODE_ENV=production node node_modules/defcon/server.js --config=/path/to/config.json
```
The final configuration is a merge of the individual configuration files and the command line arguments.

Since defcon is a container for plugins, it's configuration options are minimal. We suggest you add custom settings to /etc/defcon/defcon.json or in a file specified on via the command line, since this is the easiest 
option for upgrades.

```js
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
```

