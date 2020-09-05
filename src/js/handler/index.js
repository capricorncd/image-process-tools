/**
 * Created by Capricorncd
 * https://github.com/capricorncd
 * 2018-10-02 22:05
 */
import util from '../util'
import { handleVideoFile } from './video'
import { handleImageFile } from './image'

/**
 * 处理媒体文件
 * @param file 文件
 * @param opts 处理参数
 * @returns {Promise}
 */
export function handleMediaFile (file, opts) {
  return new Promise((resolve, reject) => {
    // quality
    if (!util.hasOwn(opts, 'quality') || (opts.quality <= 0 || opts.quality > 1)) {
      opts.quality = 0.8
    }
    // check file type
    const fileType = file.type
    if (/^(image|video)/.test(fileType)) {
      _handlerFile(file, RegExp.$1, opts, resolve, reject)
    } else {
      reject(new Error({
        code: 7,
        message: 'Incorrect file type'
      }))
    }
  })
}

/**
 * 处理视频截图或图片
 * @param file
 * @param type
 * @param opts
 * @param resolve
 * @param reject
 * @private
 */
function _handlerFile (file, type, opts, resolve, reject) {
  // check file size
  const fileSize = util.bitToKib(file.size)
  const maxSize = util.int(opts.maxSize) * 1024
  if (maxSize && maxSize < fileSize) {
    reject({
      code: 12,
      message: `The file is too large, exceeding the maximum limit of ${opts.maxSize}M.`
    })
    return
  }
  switch (type) {
    case 'image':
      handleImageFile(file, opts).then(resolve).catch(reject)
      break
    case 'video':
      handleVideoFile(file, opts).then(resolve).catch(reject)
      break
  }
}
