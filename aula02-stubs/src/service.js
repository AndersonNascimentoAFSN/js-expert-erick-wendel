const https = require('https')

class Service {
  async makeRequest(url) {
    return new Promise((resolve, reject) => {
      https.get(url, response => {
        response.on('data', data => resolve(JSON.parse(data)))
        response.on('error',reject)
      })
    })
  }

  async getCep(url) {
    const result = await this.makeRequest(url)

    return {
      street: result.logradouro,
      city: result.localidade,
      uf: result.uf
    }
  }
}

module.exports = Service
