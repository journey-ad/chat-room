'use strict'

const mongoose = require('mongoose')
const schema = require('./schema')

mongoose.connect(process.env.DB_URL)

const Message = mongoose.connection.model('Message', schema)

function getRecord(roomId, limit=100, offset=0) {
  return Message
          .find({ room: roomId }, '-_id -__v')
          .sort({time: 'desc'})
          .limit(+limit)
          .skip(+offset)
          .exec()
}

function setRecord(msgItem) {
  const { name, room, uid, sid, ts: time, namecolor, msgcolor, msg } = msgItem
  
  const m = new Message({
    name,
    room,
    uid,
    sid,
    time,
    namecolor,
    msgcolor,
    msg
  })
  m.save()
}

module.exports = {
  getRecord,
  setRecord
}