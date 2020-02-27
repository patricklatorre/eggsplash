import { IImageData } from './types';
import config from './config'

export const getImages = async (page: number) => {
  const url = `${config.restEndpoint}?page=${page}`
  const response = await fetch(url, {
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })

  return await response.json(); // Parse json
}

export const toElement = (data: any) => {
  const el = document.createElement('img')
  el.setAttribute('src', data.src || '#')
  el.setAttribute('width', data.width as string || '400')
  el.setAttribute('height', data.height as string || '400')
  el.setAttribute('alt', data.alt_description || 'eggs')
  return el
}

export const toImageData = (img: any): IImageData => {
  return {
    src: img.urls.small as string,
    width: img.width as string,
    height: '400',
    alt_description: img.alt_description as string,
  }
}
