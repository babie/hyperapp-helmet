import { JSDOM } from 'jsdom'
declare var global: any
global.document = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost:3000'
})
global.window = global.document.window
global.navigator = { userAgent: 'node.js' }

import { renderToStream } from '@hyperapp/render'
import express from 'express'

import { App as A } from './App'
import { Html } from './Html'

const server = express()
server.use(express.static('./'))
server.get('/*', (req, res, next) => {
  A.state.location.pathname = req.path
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  renderToStream(Html, A.state, A.actions).pipe(res)
  next()
})

server
  .listen(3000, () => {
    console.log(`Server is running.`)
  })
  .on('error', console.error)
