#!/bin/bash

NODE_PID=$(cat server.pid)

sudo kill $NODE_PID
