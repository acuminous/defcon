#!/bin/bash
node_modules/.bin/bower install
node_modules/.bin/gulp build
npm install defcon-rest-gateway
npm install defcon-event-log