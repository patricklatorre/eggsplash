import Unsplash, { toJson } from 'unsplash-js'

import config from '../config'
import { Request, Response } from 'express'

const unsplash = new Unsplash({ accessKey: config.unsplash.accessKey })

const validatePage = async (page: number) => {
  if (page && !isNaN(page) && page > 0) {
    return page
  } else {
    return null
  }
}

export const index = async (req: Request, res: Response) => {
  const page = await validatePage(req.query.page as number) || 1
  const picsPerPage = 3

  unsplash.search.photos('egg', page, picsPerPage)
    .then(toJson)
    .then(json => {
      res.json(json)
    })
    .catch(err => {
      // TODO Implement unsplash error
    })
}
