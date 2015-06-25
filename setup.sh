#!/usr/bin/env bash

if [ -z $(which npm) ]; then
    echo "npm (node package manager) missing. "
    exit 1
fi

if [ -z $(which bower) ]; then
    echo "bower missing. "
    exit 1
fi

npm install
bower install

exit 0