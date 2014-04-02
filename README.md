# DEFCON

## Prerequisits
1. nodejs
1. bower
1. gulp

## Installation
```bash
mkdir defcon
pushd defcon
npm install
pushd node_modules/defcon
bower install
gulp install
popd
```

## Starting
```bash
cd $INSTALL_DIR
NODE_ENV=production node node_modules/defcon/server.js
```
DEFCON starts on localhost:8080 by default. You can over this (and any other configuration) from the command line, e.g.

```bash
NODE_ENV=production node node_modules/defcon/server --server.port=9090
```

### Configuration
Configuration is loaded from the following files if they exist

1. $INSTALL_DIR/conf/default.json
1. $INSTALL_DIR/conf/<environment>.json
1. $INSTALL_DIR/conf/<host>.json
1. $INSTALL_DIR/etc/defcon/defcon.json

You can specify additional configuration by specifying ```--config=path/to/config``` from the command line.