import Http from 'http'

// curl -i localhost:3000

async function InjectHttpInterceptor() {
  const oldEmit = Http.Server.prototype.emit
  Http.Server.prototype.emit = function (...args) {
    const [eventName, request, response] = args

    if (eventName === 'request') {
      response.setHeader('X-Instrumented-By', 'AndersonNascimento')
    }

    return oldEmit.apply(this, args)
  }
}

export { InjectHttpInterceptor }