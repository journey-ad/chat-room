const FastScanner = require('fastscan')
const banwordList = require('./banword.json')

const scanner = new FastScanner(banwordList)

function filter(word) {
  const list = scanner.search(word)
  
  if(list && list.length > 0){
    list.forEach(item => {
      const re = new RegExp(item[1], "g")
      word = word.replace(re, '***')
    })
  }

  return word
}

module.exports = filter