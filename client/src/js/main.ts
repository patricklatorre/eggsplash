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

async function getNextImages(state: IAppState) {
  toggleLoading()
  const nextPage = state.lastPage + 1
  photos.getImages(nextPage)
    .then(data => {
      toggleLoading()
      state.lastPage = nextPage
      data.results
        .map((imgData: IImageData) => photos.toElement(imgData))
        .forEach((imgElem: Node) => insertElem(imgElem))
    })
    .catch(err => {
      console.log(err)
    })
}

const state: IAppState = {
  lastPage: 0,
  imgCache: []
}

getNextImages(state)

// Init state and start app
const state: IAppState = { lastPage: 0, imgCache: [] }