#!/bin/sh
cp src/feednami-client.js releases/$1.js
uglifyjs src/rss-to-bootstrap-carousel.js --mangle --compress > releases/$1.min.js