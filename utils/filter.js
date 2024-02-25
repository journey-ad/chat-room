const FastScanner = require('fastscan')
const banwordList = require('./banword.json')
const regexList = require('./regexlist.json') // 引入正则表达式列表

const scanner = new FastScanner(banwordList)

function filter(word) {
  const list = scanner.search(word)

  if(list && list.length > 0){
    list.forEach(item => {
      const re = new RegExp(item[1], "g")
      word = word.replace(re, '***')
    })
  }

  // 增加基于正则的屏蔽逻辑
  regexList.forEach(regex => {
    const re = new RegExp(regex, "g") // 创建正则表达式对象
    word = word.replace(re, '***') // 替换匹配到的敏感词
  })

  return word
}

module.exports = filter
