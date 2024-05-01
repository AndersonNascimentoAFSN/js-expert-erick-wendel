const http = require('http')
const { User } = require('./database/users')

// const DEFAULT_USER = { username: "AndersonNascimento", password: '123456' }

const routes = {
  '/contact:get': (request, response) => {
    response.write('contact us page')
    return response.end()
  },
  '/login:post': async (request, response) => {
    // response é um iterador!

    for await (const data of request) {
      const user = JSON.parse(data)

      const userFound = await User.getUserByUsername(user.username)

      if (!userFound) {
        response.writeHead(404, {
          'Content-Type': 'text/html'
        })
        response.write('User not found!')
        return response.end()
      }

      if (
        user.password !== userFound?.password || user.username !== userFound.username
      ) {
        response.writeHead(401, {
          'Content-Type': 'text/html'
        })
        response.write('Logging has failed!')
        return response.end()
      }

      response.write('Logging has succeeded!')
      return response.end()
    }
  },
  default: (request, response) => {
    response.write('Hello World!')
    return response.end()
  }
}

const handler = function (request, response) {
  const { url, method } = request

  const routeKey = `${url}:${method.toLowerCase()}`
  const chosen = routes[routeKey] || routes.default
  // response.writeHead(200, {
  //   'Content-Type': 'text/html'
  // })
  return chosen(request, response)
}

const app = http.createServer(handler)
  .listen(3000, () => console.log('app running at', 3000))

module.exports = app