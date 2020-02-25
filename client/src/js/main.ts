import debounce from 'lodash.debounce'
import { IAppState, IImageData } from './types'
import * as photos from './photos'

async function initialize(state: IAppState) {
  await cacheNextImages(state, true)
  await renderFromCache(state)
  cacheNextImages(state)
}

function insertElem(el: Node) {
  document.getElementById('img-list').appendChild(el)
}

function toggleLoading() {
  document.getElementById('loading-widget').classList.toggle('hidden')
}

async function cacheNextImages(state: IAppState, showLoading?: boolean) {
  if (showLoading) toggleLoading()
  const nextPage = state.lastPage + 1
  await photos.getImages(nextPage)
    .then(data => {
      if (showLoading) toggleLoading()
      state.lastPage = nextPage
      state.imgCache = state.imgCache.concat(data.results)
    })
    .catch(err => {
      console.log(err)
    })
}

async function renderFromCache(state: IAppState) {
  toggleLoading()
  state.imgCache
    .splice(0, 12)
    .map((imgData: IImageData) => photos.toElement(imgData))
    .forEach((imgElem: Node) => insertElem(imgElem))
  toggleLoading()
}

}

getNextImages(state)

// Init state and start app
const state: IAppState = { lastPage: 0, imgCache: [] }