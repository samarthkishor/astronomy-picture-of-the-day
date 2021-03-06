#!/bin/bash

today=`date '+%m-%d-%Y'`
if [ -f ./lib/pictures/${today}.jpg ]
then
    echo 'The file already exists.'
else
    node apod.js
    if [ -f ./lib/pictures/${today}.jpg ]
    then
        cd tex
        python3 buildTex.py
    else
        echo 'The picture has not been saved yet or there is some error with the scraper.'
        exit 1
    fi
fi
