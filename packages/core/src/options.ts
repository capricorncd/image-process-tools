/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/07/14 21:12:00 (GMT+0900)
 */
export const DEFAULT_OPTIONS = {
  // Process images according to device pixel ratio
  enableDevicePixelRatio: false,
  // When the image width or height is less than the set value,
  // force the target image width or height to be adjusted to the set value
  isForce: false,
  // Multipurpose Internet Mail Extensions
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
  mimeType: 'image/jpeg',
  // When large images are reduced several times,
  // the pixels are reduced each time
  perResize: 500,
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
  // A Number between 0 and 1 indicating the image quality to use for image formats that use lossy compression such as image/jpeg and image/webp.
  // If this argument is anything else, the default value for image quality is used. The default value is 0.92. Other arguments are ignored.
  quality: 0.9,
  // The width of the processed image
  width: 0,
  height: 0,
  // The value of long edge. Valid when width and height are `0`.
  longEdge: 0,
  // Image cropping parameters
  // cropInfo: {}
}
