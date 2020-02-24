export interface IImageData {
  urls: string;
  width: string;
  height: string;
  alt_description: string
}

export interface IAppState {
  lastPageFetch: number,
  imgCache: IImageData[]
}