'use strict'

const mongoose = require('mongoose');
 
module.exports = new mongoose.Schema({
  name:       { type: String, required: true },
  room:       { type: String, required: true },
  uid:        { type: String, required: true },
  sid:        { type: String, required: true },
  time:       { type: Number, required: true },
  namecolor:  { type: String },
  msgcolor:   { type: String },
  msg:        { type: String, required: true }
}, { collection: 'tb_msg', versionKey: false });