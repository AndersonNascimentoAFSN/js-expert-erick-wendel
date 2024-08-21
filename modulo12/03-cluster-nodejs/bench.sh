#!/bin/sh

URL=localhost:3000

npx autocannon $URL -m POST \
  --warmup [-c 1 -d 3] \
  --connections 500 \
  --pipeline 10 \
  --renderStatusCodes

# cat logs/log.txt | grep 1223879 | wc -l