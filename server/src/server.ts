import path from 'path'
import express from 'express'

import * as photo from './controllers/photo'

const server = express()

server.use(express.json())

server.use(
  express.static(path.join(__dirname, '../../client/dist/'))
)

server.get('/photo', photo.index)

export default server
