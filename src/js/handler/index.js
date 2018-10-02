/**
 * Created by Capricorncd
 * https://github.com/capricorncd
 * 2018-10-02 22:05
 */
import util from '../util'
import broadcast from '../broadcast'
import { handleVideoFile } from './video'
import { handleImageFile } from './image'
export function handleMediaFile (file, type, opts) {
  // check file size
  let fileSize = util.bitToKib(file.size)
  let maxSize = util.int(opts.maxSize) * 1024
  if (maxSize && maxSize < fileSize) {
    broadcast.emit('error', {
      code: 12,
      message: `The file is too large, exceeding the maximum limit of ${opts.maxSize}M.`
    })
    return
  }
  switch (type) {
    case 'image':
      handleImageFile(file, opts).then(res => {
        broadcast.emit('success', res)
      }).catch(err => {
        broadcast.emit('error', err)
      })
      break
    case 'video':
      handleVideoFile(file, opts).then(res => {
        broadcast.emit('success', res)
      }).catch(err => {
        broadcast.emit('error', err)
      })
      break
  }
}
