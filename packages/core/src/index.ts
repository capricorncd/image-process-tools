/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * https://github.com/xing1984
 * Date: 2020-09-06 18:45
 *
 * @document image-process
 *
 * <p align="left">
 *   <a href="https://npmcharts.com/compare/image-process?minimal=true"><img src="https://img.shields.io/npm/dm/image-process.svg?sanitize=true" alt="Downloads"></a>
 *   <a href="https://www.npmjs.com/package/image-process"><img src="https://img.shields.io/npm/v/image-process.svg?sanitize=true" alt="Version"></a>
 *   <a href="https://www.npmjs.com/package/image-process"><img src="https://img.shields.io/npm/l/image-process.svg?sanitize=true" alt="License"></a>
 * </p>
 *
 * A Image clipping or scaling, support local or same domain video file screenshot. It's implemented  in canvas.
 *
 * - Image cropping: Just set valid cropping options (See [ImageHandlerOptions](#ImageHandlerOptions)), or set valid width and height, the image will be centered and cropped.
 * - Proportional scaling: Just set the width or height.
 * - Video screenshot: Take a picture according to the set `currentTime` of the [VideoHandlerOptions](#VideoHandlerOptions).
 *
 * [中文文档](./docs)
 *
 * @code ## Usage
 *
 * ```js
 * import { handleMediaFile } from 'image-process'
 *
 * const options = {
 *   mimeType: 'image/jpeg',
 *   width: 600,
 *   height: 400,
 *   quality: 0.8
 * }
 *
 * // Crop image or video screenshot
 * handleMediaFile(file, options)
 *   .then(res => {
 *     console.log(res)
 *   })
 *   .catch (err => {
 *     console.error(err)
 *   })
 * ```
 *
 * @code Use in html
 *
 * ```html
 * <script>
 * imageProcess.handleMediaFile(file, options)
 *   .then(res => console.log(res))
 *   .catch (err => console.error(err))
 * </script>
 * ```
 *
 * ## Demo
 *
 * https://capricorncd.github.io/image-process-tools/demo
 *
 * @code ## Installation
 *
 * ```bash
 * # npm
 * npm install image-process
 * # npm i image-process
 *
 * # yarn
 * yarn add image-process
 *
 * # pnpm
 * pnpm install image-process
 * # pnpm i image-process
 * ```
 */
import { handleImageFile } from './handle-image-file'
import { handleVideoFile } from './handle-video-file'
import { MediaFileHandlerOptions, MediaFileHandlerResult } from '../types'

/**
 * @method handleMediaFile(file, options)
 * Image processing or video screenshot processing function.
 * @param file `File` Image or video file.
 * @param options? `Partial<MediaFileHandlerOptions>` See [MediaFileHandlerOptions](#MediaFileHandlerOptions).
 * @returns `Promise<MediaFileHandlerResult>` See [MediaFileHandlerResult](#MediaFileHandlerResult).
 */
export function handleMediaFile(
  file: File,
  options?: MediaFileHandlerOptions
): Promise<MediaFileHandlerResult> {
  return new Promise((resolve, reject) => {
    // check file type
    const fileType = file.type
    if (/^(image|video)/.test(fileType)) {
      if (RegExp.$1 === 'image') {
        handleImageFile(file, options).then(resolve).catch(reject)
      } else {
        handleVideoFile(file, options).then(resolve).catch(reject)
      }
    } else {
      reject(new Error(`File type[${fileType}] not supported`))
    }
  })
}

export { handleImageFile, handleVideoFile }
export {
  fileToBase64,
  createElement,
  formatBytes,
  splitBase64,
  createBlobURL,
  base64ToBlob,
} from 'zx-sml'
