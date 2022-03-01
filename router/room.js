'use strict'

const db = require('../db')
const record2svg = require('../utils/record2svg')
const express = require('express')
const router = express.Router()

router.get('/@:roomId', (req, res) => {
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
  const { limit=100, offset=0 } = req.query

  const record = await db.getRecord(roomId, limit, offset)

  res.json(record)
})

router.get('/@:roomId/svg', async (req, res) => {
  const { roomId } = req.params
  let { width=500, height=300, limit=20, theme='', title=`${roomId}
  @chat.getloli.com: ~`, fontSize='12' } = req.query

  limit = Math.floor(Math.abs(Math.min(limit, 100) || 20))

  const record = await db.getRecord(roomId, limit)

  const svg = record2svg({ roomId, record, width: Math.abs(width), height: Math.abs(height), limit, theme, title, fontSize: Math.abs(fontSize) })

  res.set({
    'content-type': 'image/svg+xml',
    'cache-control': 'max-age=0, no-cache, no-store, must-revalidate'
  })

  res.send(svg)
})

module.exports = router