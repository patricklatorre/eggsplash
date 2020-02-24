import * as _ from './util'
import * as photos from './photos'

interface ImageData {
  urls: string;
  width: string;
  height: string;
  alt_description: string
}

function createImg(data: any) {
  const el = document.createElement('img')
  el.setAttribute('src', data.src || '#')
  el.setAttribute('width', data.width as string || '400')
  el.setAttribute('height', data.height as string || '400')
  el.setAttribute('alt', data.alt || 'eggs')
  return el
}

async function insertElem(el: Node) {
  document.getElementById('img-list').appendChild(el)
}

photos.getImages(1)
  .then(data => {
    data.results.map((img: ImageData) => {
      const imgElem = createImg({
        src: img.urls.small,
        width: img.width,
        height: '400',
        alt: img.alt_description,
      })
      insertElem(imgElem)
    })
  })
  .catch(err => {
    console.log('An error occured while fetching photos: ' + err)
  })
