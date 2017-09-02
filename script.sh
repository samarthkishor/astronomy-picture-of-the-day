#!/bin/bash

cd ~/Documents/Programming/Scrapers/astronomy-picture-of-the-day
node apod.js
cd tex
python3 buildTex.py