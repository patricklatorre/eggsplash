import { IImageData } from './types';

export const getImages = async (page: number) => {
  const url = `http://localhost:9090/photo?page=${page}`
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
  el.setAttribute('alt', data.alt || 'eggs')
  return el
}

export const toImageData = (img: any) => {
  return {
    src: img.urls.small,
    width: img.width,
    height: '400',
    alt: img.alt_description,
  }
}
