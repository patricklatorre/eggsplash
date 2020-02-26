import debounce from 'lodash.debounce'
import { IAppState, IImageData } from './types';
import * as photos from './photos'

async function initialize(state: IAppState) {
  await cacheNextImages(state, true)
  await renderFromCache(state)
  cacheNextImages(state)
}

function insertElem(el: Node) {
  document.getElementById('img-list').appendChild(el)
}

async function toggleLoading() {
  document.getElementById('loading-widget').classList.toggle('hidden')
}

async function cacheNextImages(state: IAppState, showLoading?: boolean) {
  if (showLoading) toggleLoading()      // show loading widget
  const nextPage = state.lastPage + 1
  await photos.getImages(nextPage)
    .then(data => {
      if (showLoading) toggleLoading()  // hide loading widget
      state.lastPage = nextPage
      state.imgCache = state.imgCache.concat(data.results)
    })
    .catch(err => {
      $('#logo').text('Please refresh the page.')
    })
}

async function renderFromCache(state: IAppState) {
  state.imgCache
    .splice(0, 12)
    .forEach((imgData: IImageData) => insertElem(photos.toElement(imgData)))
}

async function loadMore() {
  console.log('called')
  const loadingPoint = 1200
  if ($(window).scrollTop() + loadingPoint >= $(document).height() - $(window).height()) {
    renderFromCache(state)
    cacheNextImages(state)
  }
}

/**
 * Async wrapper
 */
async function main() {
  initialize(state)
  window.addEventListener('scroll', debounce(loadMore, 200))
}

// Init state and start app
const state: IAppState = { lastPage: 0, imgCache: [] }
main()