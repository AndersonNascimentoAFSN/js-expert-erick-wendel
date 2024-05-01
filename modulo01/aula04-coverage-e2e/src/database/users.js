const fs = require('fs')
const path = require('path')

class User {
  static getUsers() {
    const users = fs.readFileSync(path.join(__dirname, 'users.json'), 'utf8');
    return JSON.parse(users)
  }

  static async getUserByUsername(username) {
    const data = fs.readFileSync(path.join(__dirname, 'users.json'), 'utf8')

    const users = JSON.parse(data)

    const findUser = users.find(user => user.username === username)

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(findUser);
      }, 1000); // 1000 milissegundos equivalem a 1 segundos
    });
  }
}



module.exports = { User }
