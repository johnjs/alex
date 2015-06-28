#!/usr/bin/env bash

if [ -z $(which npm) ]; then
    echo "npm (node package manager) missing. "
    exit 1
fi

if [ -z $(which bower) ]; then
    npm install bower
fi

npm install
bower install

exit 0