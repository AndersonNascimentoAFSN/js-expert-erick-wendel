import os from "os"
import cluster from "cluster"

import { Server } from './server.js'

(() => {

  // Se não for o processo main, o orquestrador, então pode criar novas cópias
  if (!cluster.isPrimary) {
    Server.initialize()
    return
  }

  const cpusNumber = os.cpus().length

  console.log(`Primary process is running with pid: ${process.pid}`)
  console.log(`Forking server for ${cpusNumber} CPUs\n`)

  for (let index = 0; index < cpusNumber; index++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`Worker ${worker.id} crashed. Starting a new worker...`)
      cluster.fork()
    }
  })

})()