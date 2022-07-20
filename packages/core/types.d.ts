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
  // When large images are reduced several times,
  // the pixels are reduced each time
  perResize: number
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
  // A Number between 0 and 1 indicating the image quality to use for image formats that use lossy compression such as image/jpeg and image/webp.
  // If this argument is anything else, the default value for image quality is used. The default value is 0.92. Other arguments are ignored.
  quality: number
  // The `width/height` of the processed image
  width: number
  height: number
  // The size of the longest side. Valid when width and height are `0`.
  longestSide: number
  // Image cropping parameters.
  cropInfo?: OptionsCropInfo
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

// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
export interface OptionsCropInfo {
  // The x-axis coordinate of the top left corner of the sub-rectangle of the source `image` to draw into the destination context. Use the 3- or 5-argument syntax to omit this argument.
  sx: number
  // The y-axis coordinate of the top left corner of the sub-rectangle of the source `image` to draw into the destination context. Use the 3- or 5-argument syntax to omit this argument.
  sy: number
  // The width of the sub-rectangle of the source `image` to draw into the destination context. If not specified, the entire rectangle from the coordinates specified by `sx` and `sy` to the bottom-right corner of the image is used. Use the 3- or 5-argument syntax to omit this argument.
  sw: number
  // The height of the sub-rectangle of the source `image` to draw into the destination context. Use the 3- or 5-argument syntax to omit this argument.
  sh: number
}

export interface DrawImageParams extends OptionsCropInfo {
  enableDevicePixelRatio?: boolean
  // The x-axis coordinate in the destination canvas at which to place the top-left corner of the source `image`.
  dx: number
  // The y-axis coordinate in the destination canvas at which to place the top-left corner of the source `image`.
  dy: number
  // The width to draw the `image` in the destination canvas. This allows scaling of the drawn image. If not specified, the image is not scaled in width when drawn. Note that this argument is not included in the 3-argument syntax.
  dw: number
  // The height to draw the image in the destination canvas. This allows scaling of the drawn image. If not specified, the image is not scaled in height when drawn. Note that this argument is not included in the 3-argument syntax.
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
