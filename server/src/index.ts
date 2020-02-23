import fetch from 'node-fetch'

// @ts-ignore
// Fetch API polyfill
global.fetch = fetch

import server from './server'

const port = process.env.PORT || 9090

server.listen(port, () => {
  console.log(`Running at http://localhost:${port}`)
})
