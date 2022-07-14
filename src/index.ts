/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-06 18:45
 */
import { handleImageFile } from './handle-image-file'
import { handleVideoFile } from './handle-video-file'
import {
  ImageProcessOptions,
  ImageProcessResult,
  VideoScreenshotOptions,
  VideoScreenshotResult,
} from '../types'
export { createElement } from 'zx-sml'

export function handleMediaFile(
  file: File,
  options?: Partial<ImageProcessOptions | VideoScreenshotOptions>
): Promise<ImageProcessResult | VideoScreenshotResult> {
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
