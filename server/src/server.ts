import path from 'path'
import express from 'express'

import * as photo from './controllers/photo'

const server = express()

server.use(
  // TODO change to dist @ prod
  express.static(path.join(__dirname, '../../client/src'))
)

server.get('/photos', photo.getPhotos)

export default server
