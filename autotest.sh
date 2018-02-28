#!/bin/bash
npm test
while true; do inotifywait src/*.ts && npm test; done
