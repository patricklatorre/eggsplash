import Unsplash, { toJson } from 'unsplash-js'
import { Request, Response } from 'express'
import { IImageData } from 'types';

// Initialize unsplash lib
const unsplash = new Unsplash({ accessKey: process.env.UNSPLASH_ACCESS_KEY })

const validatePage = async (page: number) => {
  if (page && !isNaN(page) && page > 0)
    return page
  else
    return null
}

export const toImageData = (img: any): IImageData => {
  return {
    src: img.urls.small,
    width: img.width,
    height: '400',
    alt_description: img.alt_description,
  }
}

export const index = async (req: Request, res: Response) => {
  const page = await validatePage(req.query.page as number) || 1
  const picsPerPage = 12

  unsplash.search.photos('eggs', page, picsPerPage)
    .then(toJson)
    .then(json => {
      const results = json.results.map((raw: any) => toImageData(raw))
      res.json({ results })
    })
    .catch(err => {
      console.error(err)
      res.json({ results: [] })
    })
}
