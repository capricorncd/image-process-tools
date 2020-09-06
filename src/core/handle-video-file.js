/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-06 18:22
 */
import { createElement, isUndefined, toBlobUrl, toNumber } from '../utils'
import { handleImageFile } from './handle-image-file'

export function handleVideoFile(file, options) {
  return new Promise((resolve, reject) => {
    const videoUrl = toBlobUrl(file)
    let video = createElement('video', { src: videoUrl, autoplay: true })
    let isCanplay = false
    video.onerror = reject
    video.oncanplay = function () {
      if (isCanplay) return
      isCanplay = true
      const info = {
        videoFile: file,
        videoWidth: video.videoWidth,
        videoHeight: video.videoHeight,
        duration: video.duration,
        currentTime: options.currentTime
      }
      // handle capture
      getVideoCapture(video, info).then(base64 => {
        // The default screenshot size is the same as the video size
        if (!options.width && !options.height) {
          options.width = info.videoWidth
          options.height = info.videoHeight
        }
        handleImageFile(base64, options).then(res => {
          resolve({
            ...info,
            ...res
          })
          video = null
        }).catch(reject)
      }).catch(reject)
    }
  })
}

/**
 * get video capture
 * @param video
 * @param currentTime
 * @param duration
 * @param videoWidth
 * @param videoHeight
 * @returns {Promise<unknown>}
 */
function getVideoCapture(video, { currentTime, duration, videoWidth, videoHeight }) {
  return new Promise((resolve) => {
    // check current time
    currentTime = isUndefined(currentTime)
      // Capture any picture in the video
      ? duration * Math.random()
      : toNumber(currentTime)
    if (currentTime > duration) {
      currentTime = duration
    }
    video.currentTime = currentTime
    // pause video
    video.pause()
    // mime type
    const mimeType = 'image/jpeg'
    // canvas
    const canvas = createElement('canvas')
    const ctx = canvas.getContext('2d')

    canvas.width = videoWidth
    canvas.height = videoHeight

    setTimeout(() => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      resolve(canvas.toDataURL(mimeType))
    }, 500)
  })
}
