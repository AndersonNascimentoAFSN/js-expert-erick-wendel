'use strict';

const assert = require('assert')

const users = [
  'Anderson, Nascimento',
  'Ana, Mendes',
  'Gabriela, Nascimento'
]

const regex = new RegExp(/^(\w+),\s(\w+)$/gi)

const result = users.map(user => user.replace(regex, '{"firstName": "$1", "lastName": "$2"}'))

assert.deepStrictEqual(JSON.parse(result[0]), { firstName: 'Anderson', lastName: 'Nascimento' })


const text  = 'O [Anderson Nascimento](https://andersonnascimentoafsn.com.br) é desenvolvedor web e você devia seguí-lo no [Github](https://github.com/andersonnascimentoafsn) ou até no [Instagram](https://instagram.com/andersonnascimentoafsn) Ah e você pode pesquisar no [Google](https://google.com) ou no [Yahoo](https://yahoo.com) Vai que vai!'
const markdownLinkRegex = new RegExp(/\[(.*?)]\(([http|https].*?)\)/gi)
const html = text.replace(markdownLinkRegex, '<a href="$2">$1</a>')

assert.equal(html, 'O <a href="https://andersonnascimentoafsn.com.br">Anderson Nascimento</a> é desenvolvedor web e você devia seguí-lo no <a href="https://github.com/andersonnascimentoafsn">Github</a> ou até no <a href="https://instagram.com/andersonnascimentoafsn">Instagram</a> Ah e você pode pesquisar no <a href="https://google.com">Google</a> ou no <a href="https://yahoo.com">Yahoo</a> Vai que vai!')