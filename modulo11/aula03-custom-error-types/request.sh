#!/bin/sh

echo $'\n\n[requesting: normal request]'
curl -i localhost:3000 -X POST  --data '{"name": "Vingador", "age": "80"}' -H 'Content-Type: application/json'
# curl localhost:3000 -X POST  --data '{"name": "Vingador", "age": "80"}' -H 'Content-Type: application/json'  | jq

echo $'\n\n[requesting: wrong age]'
curl -i localhost:3000 -X POST --data '{"name": "Vingador", "age": "18"}' -H 'Content-Type: application/json'
# curl localhost:3000 -X POST --data '{"name": "Vingador", "age": "18"}' -H 'Content-Type: application/json' | jq

echo $'\n\n[requesting: wrong name]'
curl -i localhost:3000 -X POST --data '{"name": "V", "age": "18"}' -H 'Content-Type: application/json'

echo $'\n\n[requesting: connection error]'
curl -i localhost:3000 -X POST --data '{"connectionError": "V" }' -H 'Content-Type: application/json'