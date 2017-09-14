#!/bin/bash

today=`date '+%m-%d-%Y'`

if [ ${PWD##*/} == 'astronomy-picture-of-the-day' ]; then
    cd lib && mkdir pictures && cd ..
    npm install nightmare && pip3 install pylatex
    node firstApod.js
    if [ -f ./lib/pictures/${today}.jpg ]; then
        cd tex
        python3 buildTex.py
        echo 'The initial setup is finished. Use the command `bash script.sh` when you run this program again.'
    else
        echo 'The picture has not been saved yet or there is some error with the scraper.'
        exit 1
    fi
else
    echo 'Wrong directory.'
fi
