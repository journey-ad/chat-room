'use strict'

const db = require('../utils/db')
const record2svg = require('../utils/record2svg')
const express = require('express')
const router = express.Router()

router.get('/@:roomId', (req, res) => {
  console.log(req.app)
  const roomList = req.app.get('roomList')
  const { roomId } = req.params
  const { title } = req.query

  res.render('room', {
    roomId,
    title,
    users: roomList[roomId] || []
  })
})

router.get('/@:roomId/record', async (req, res) => {
  const { roomId } = req.params
  const { limit=100 } = req.query

  const record = await db.getRecord(roomId, limit)

  res.json(record)
})

router.get('/@:roomId/svg', async (req, res) => {
  const { roomId } = req.params
  const { width=500, height=300, limit=20, theme='', title=`${roomId}@chat.getloli.com: ~`, fontSize='12' } = req.query

  const record = await db.getRecord(roomId, limit)

  const svg = record2svg({ roomId, record, width, height, limit, theme, title, fontSize })

  res.set({
    'content-type': 'image/svg+xml',
    'cache-control': 'max-age=0, no-cache, no-store, must-revalidate'
  })

  res.send(svg)
})

module.exports = router