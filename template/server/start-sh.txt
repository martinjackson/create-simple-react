#!/bin/bash

# stop previous if it is running
. ./stop.sh

PROJ=$(pwd)

node  --trace-warnings server.js $PROJ &
echo "$!" >server.pid
