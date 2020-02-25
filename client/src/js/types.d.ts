export interface IImageData {
  urls: string;
  width: string;
  height: string;
  alt_description: string
}

export interface IAppState {
  lastPage: number,
  imgCache: IImageData[]
}