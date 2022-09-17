/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/06/11 10:02:14 (GMT+0900)
 */
export * from './src'

/**
 * @type MediaFileHandlerOptions
 * An options of the [handleImageFile](#handleimagefilefile-options)/[handleMediaFile](#handlemediafilefile-options)/[handleVideoFile](#handlevideofilefile-options) function.
 */
export interface MediaFileHandlerOptions {
  // Whether to enable the device pixel ratio, when 2 times, the size of the returned image is x2. Default is `false`.
  enableDevicePixelRatio: boolean
  // Multipurpose Internet Mail Extensions. Default is `image/jpeg`.
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
  mimeType: string
  // When the image width or height is less than the set value,
  // force the target image width or height to be adjusted to the set value.
  // Default is `false`.
  isForce: boolean
  // Reduce the width each time. To prevent jagged edges when scaling an image.
  // Default is `500`.
  perResize: number
  // A Number between 0 and 1 indicating the image quality to use for image formats that use lossy compression such as image/jpeg and image/webp.
  // If this argument is anything else, the default value for image quality is used. The default value is 0.92. Other arguments are ignored.
  // See [toDataURL](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL).
  // Default is `0.9`.
  quality: number
  // The `width` of the processed image. Default is `0`.
  width: number
  // The `height` of the processed image. Default is `0`.
  height: number
  // The size of the longest side. Valid when width and height are `0`. Default is `0`.
  longestSide: number
  // See [OptionsCropInfo](#OptionsCropInfo).
  cropInfo?: OptionsCropInfo
  // The `HTMLMediaElement` interface's `currentTime` property specifies the current playback time in seconds. If it is longer than the video duration, the last frame will be captured. The default is a `random` timestamp in the video duration.
  currentTime?: number
}

/**
 * @type SizeInfo
 * File size information.
 */
export interface SizeInfo {
  // File size as a string, etc. `1.23MiB`.
  text: string
  // Unit of file size, etc. `MiB`.
  unit: string
  // The size of the file as a suitable number, without units, etc. `1.23`.
  value: number
  // What is the size of the image in bytes.
  bytes: number
}

/**
 * @type MediaFileHandlerRawData
 * Raw information of the image file being processed.
 */
export interface MediaFileHandlerRawData {
  // `HTMLImageElement`
  element: HTMLImageElement
  // Image blob data.
  blob: Blob
  // Image base64 data.
  data: string
  // The width of the image.
  width: number
  // The height of the image.
  height: number
  // The type of the image.
  type: string
  // The size information of the image. See [SizeInfo](#SizeInfo).
  size: SizeInfo
  // A blob url of the image.
  url: string
}

/**
 * @type MediaFileHandlerData
 * Data returned of the [handleImageFile](#handleimagefilefile-options)/[handleMediaFile](#handlemediafilefile-options)/[handleVideoFile](#handlevideofilefile-options) function.
 */
export interface MediaFileHandlerData extends MediaFileHandlerRawData {
  element: HTMLImageElement | HTMLCanvasElement
  // Raw information of the image file being processed. See [MediaFileHandlerRawData].(#MediaFileHandlerRawData).
  raw: MediaFileHandlerRawData
  // When taking a screenshot of the video, the original video file information. See [VideoInfo](#VideoInfo).
  videoInfo?: VideoInfo
}

/**
 * ImageProcessResolve
 */
export type ImageProcessResolve = (res: MediaFileHandlerData) => void

/**
 * ImageProcessReject
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export type ImageProcessReject = (err: any) => void

/**
 * @type OptionsCropInfo
 * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
 *
 * > It will be ignored when the value is invalid.
 *
 * ![canvas-drawimage](./docs/canvas-drawimage.jpg)
 */
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

/**
 * DrawImageParams
 */
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

/**
 * @type VideoInfo
 * The original video file information.
 */
export interface VideoInfo {
  // A blob url of the video file.
  url: string
  // The video file object.
  videoFile: File
  // The width of the video.
  videoWidth: number
  // The height of the video.
  videoHeight: number
  // The duration of the video.
  duration: number
  // The time point of the video screenshot.
  currentTime: number
}
