$.verbose = false

import { setTimeout } from 'timers/promises'
import isSafe from 'safe-regex'

// await $`docker run --name andersonafsn_nginx -p "8080:80" -d nginx`
// await setTimeout(500)
const req = await $`curl --silent localhost:8080`
console.log(`req\n`, req.stdout)

// const container = await $`docker ps -a --filter "name=andersonafsn_nginx" --format "{{.ID}}"`

const containers = await $`docker ps`
const exp = /(?<containerId>\w+)\W+(?=nginx)/

if (!isSafe(exp))
  throw new Error('unsafe regex!!')

const { groups: { containerId} } = containers.toString().match(exp)

const logs = await $`docker logs ${containerId}`
console.log('logs\n', logs.stdout)

const rm = await $`docker rm -f ${containerId}`
console.log('rm -f\n', rm.stdout)