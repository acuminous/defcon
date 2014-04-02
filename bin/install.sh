#!/bin/bash

which bower > /dev/null
if [ $? -ne 0 ]; then
    echo "Could not find bower"
    exit 1;
fi

which gulp > /dev/null
if [ $? -ne 0 ]; then
    echo "Could not find gulp"
    exit 1;
fi

bower install
gulp build