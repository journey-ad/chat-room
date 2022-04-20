'use strict'

const path = require('path')
const sqlite3 = require('sqlite3')

const db = new sqlite3.Database(path.resolve(__dirname, '../msg.db'))

db.run(`CREATE TABLE IF NOT EXISTS tb_msg (
    id        INTEGER        PRIMARY KEY AUTOINCREMENT
                             NOT NULL
                             UNIQUE,
    name      VARCHAR (32)   NOT NULL,
    room      VARCHAR (32)   NOT NULL,
    uid       VARCHAR (7)    NOT NULL,
    sid       VARCHAR (7)    NOT NULL,
    time      INT (10)       NOT NULL,
    namecolor VARCHAR (7)    NOT NULL,
    msgcolor  VARCHAR (7)    NOT NULL,
    msg       VARCHAR (1000) NOT NULL
);`)

function getRecord(roomId, limit=100, offset=0) {
  return new Promise((resolve, reject) => {
    db.all('SELECT * from tb_msg WHERE `room` = ? ORDER BY `time` DESC LIMIT ? OFFSET ?', roomId, limit, offset, (err, row) => {
      if (err) reject(err)

      resolve(row)
    })
  })
}

function setRecord(msgItem) {
  const { name, room, uid, sid, ts: time, namecolor, msgcolor, msg } = msgItem
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO tb_msg(\`name\`, \`room\`, \`uid\`, \`sid\`, \`time\`, \`namecolor\`, \`msgcolor\`, \`msg\`)
            VALUES($name, $room, $uid, $sid, $time, $namecolor, $msgcolor, $msg);`
      , {
        $name: name,
        $room: room,
        $uid: uid,
        $sid: sid,
        $time: time,
        $namecolor: namecolor,
        $msgcolor: msgcolor,
        $msg: msg
      }
      , (err, row) => {
        if (err) reject(err)

        resolve(row)
      })
  })
}

module.exports = {
  getRecord,
  setRecord
}