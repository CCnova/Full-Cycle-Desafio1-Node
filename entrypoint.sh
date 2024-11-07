#!/bin/sh

dockerize -wait tcp://db:3306 -timeout 20s

npm install

node index.js