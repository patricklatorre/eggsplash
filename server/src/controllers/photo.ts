import Unsplash, { toJson } from 'unsplash-js'

import config from '../config'
import { Request, Response } from 'express'

const unsplash = new Unsplash({ accessKey: config.unsplash.accessKey })

export const getPhotos = async (req: Request, res: Response) => {
  unsplash.search.photos('egg', 1, 3)
    .then(toJson)
    .then(json => {
      res.json(json)
    })
}
