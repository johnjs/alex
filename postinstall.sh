#!/usr/bin/env bash
if [ -z $(which bower) ]; then
    npm install bower
fi

bower install

exit 0