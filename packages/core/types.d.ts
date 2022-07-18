/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/06/11 10:02:14 (GMT+0900)
 */
export * from './src'

export interface MediaFileHandlerOptions {
  // Process images according to device pixel ratio
  enableDevicePixelRatio: boolean
  // Multipurpose Internet Mail Extensions
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
  mimeType: string
  // When the image width or height is less than the set value,
  // force the target image width or height to be adjusted to the set value
  isForce: boolean
  // The width of the processed image
  width: number
  height: number
  // When large images are reduced several times,
  // the pixels are reduced each time
  perResize: number
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
  // A Number between 0 and 1 indicating the image quality to use for image formats that use lossy compression such as image/jpeg and image/webp.
  // If this argument is anything else, the default value for image quality is used. The default value is 0.92. Other arguments are ignored.
  quality: number
  // The size of the longest side. Valid when width and height are `0`.
  longestSide: number
  // Image cropping parameters.
  cropInfo?: Partial<OptionsCropInfo>
  // Video screenshot time position.
  currentTime?: number
}

export interface SizeInfo {
  // etc. 1.23MiB
  text: string
  // MiB
  unit: string
  // 1.23
  value: number
  //
  bytes: number
}

export interface MediaFileHandlerRawData {
  element: HTMLImageElement
  blob: Blob
  data: string
  width: number
  height: number
  type: string
  size: SizeInfo
  url: string
}

export interface MediaFileHandlerData extends MediaFileHandlerRawData {
  element: HTMLImageElement | HTMLCanvasElement
  raw: MediaFileHandlerRawData
  videoInfo?: VideoInfo
}

export type ImageProcessResolve = (res: MediaFileHandlerData) => void
/* eslint-disable @typescript-eslint/no-explicit-any */
export type ImageProcessReject = (err: any) => void

export interface OptionsCropInfo {
  enableDevicePixelRatio?: boolean
  sx: number
  sy: number
  sw: number
  sh: number
  dx: number
  dy: number
  dw: number
  dh: number
}

export interface VideoInfo {
  url: string
  videoFile: File
  videoWidth: number
  videoHeight: number
  duration: number
  currentTime: number
}
