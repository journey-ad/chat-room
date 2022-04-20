'use strict'

const moment = require('moment')

function record2svg({ roomId, record, width, height, limit, theme, title, fontSize }) {
  let tpl = ''

  record.reverse().forEach(msg => {
    const date = moment.unix(msg.time).add(8, 'hours').format('l LT')
    if(roomId === 'journey-ad.github') msg.msg = msg.msg.replace(/\u53d8\u6001/g, '\u597d\u4eba')
    tpl +=
`<div class="message">
  <span class="nickname"><span class="name" style="color:${processUnsafeHtml(msg.namecolor)}">${processUnsafeHtml(msg.name)}</span>::<span class="uid">${processUnsafeHtml(msg.uid)}</span>::<span class="time">${date}</span>:</span><span class="msg" style="color:${processUnsafeHtml(msg.msgcolor)}">${processUnsafeHtml(msg.msg)}</span>
</div>`
  })

  const svg =
`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${+width}" height="${+height}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <title>${processUnsafeHtml(roomId)}::record - Chat Room</title>
  <foreignObject width="${+width}" height="${+height}">
    <body xmlns="http://www.w3.org/1999/xhtml">
      <style>
        ::selection {
          background: #444;
          color: #fff;
        }

        body {
          margin: 0;;
          padding: 0;
        }

        .container {
          position: absolute;
          bottom: 0;
          font-size: ${+fontSize}px;
        }
        .container.light {
          bottom: auto;
          width: 100%;
          height: 100%;
          background: #fbfbfb;
          border-radius: 5px;
          line-height: 1.4;
          color: #000;
          padding-top: 30px;
          border: 1px solid #d4d4d4;
          box-sizing: border-box;
          overflow: hidden;
        }

        .container.light::before {
          content: "";
          position: absolute;
          background: #fbfbfb;
          width: 100%;
          height: 26px;
          top: 0;
          left: 0;
          z-index: 2;
        }

        .container.light::after {
          content: "";
          position: absolute;
          -webkit-border-radius: 50%;
          border-radius: 50%;
          background: #fc625d;
          width: 12px;
          height: 12px;
          left: 10px;
          margin-top: -24px;
          -webkit-box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;
          box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;
          z-index: 2;
        }

        .container.light .content {
          position: absolute;
          bottom: 0;
          padding: 6px 8px;
        }
        .container.light .content::before {
          color: #21252b;
          content: '${processUnsafeHtml(title.replace(/"/g, '&quot;'))}';
          height: 26px;
          line-height: 26px;
          font-size: 12px;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          font-family: Ubuntu,sans-serif;
          font-weight: 700;
          padding: 0 80px;
          text-align: center;
          z-index: 2;
          box-sizing: border-box;
        }

        .nickname {
          padding-right: 5px;
          color: brown;
          font-family: Consolas, Monaco, monospace;
          white-space: nowrap;
        }
        .name {
          font-weight: bold;
        }
        .uid {
          color: #cc1105;
          font-weight: bold;
        }
        .time {
          color: #6f6f6f;
        }
        .msg {
          font-family: "Helvetica Neue", "PingFang SC", serif;
          word-break: break-all;
        }
      </style>
      <div class="container${theme==='light' ? ' light' : ''}">
        <div class="content">
        ${tpl}
        </div>
      </div>
    </body>
  </foreignObject>
</svg>
`

  return svg
}

function processUnsafeHtml(source) {
  source = source.replace(/&lt;/g,'<').replace(/&gt;/g,'>')
  return source.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
}

module.exports = record2svg