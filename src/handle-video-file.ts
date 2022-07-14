/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-06 18:22
 */
import { createElement, createBlobURL, toNumber } from 'zx-sml'
import { handleImageFile } from './handle-image-file'
import {
  VideoInfo,
  VideoScreenshotOptions,
  VideoScreenshotResult,
} from '../types'
import { DEFAULT_OPTIONS } from './options'

export function handleVideoFile(
  file: File,
  options?: Partial<VideoScreenshotOptions>
): Promise<VideoScreenshotResult> {
  return new Promise((resolve, reject) => {
    const _options = {
      ...DEFAULT_OPTIONS,
      ...options,
    }
    const videoUrl = createBlobURL(file)
    let video: HTMLVideoElement = createElement('video', {
      src: videoUrl,
      autoplay: true,
    })
    let isCanplay = false
    video.onerror = reject
    video.oncanplay = () => {
      if (isCanplay) return
      isCanplay = true
      const duration = video.duration
      const currentTime =
        typeof _options.currentTime === 'undefined'
          ? // Capture any picture in the video
            duration * Math.random()
          : toNumber(_options.currentTime)
      const info: VideoInfo = {
        videoFile: file,
        videoWidth: video.videoWidth,
        videoHeight: video.videoHeight,
        duration,
        currentTime: Math.min(currentTime, duration),
      }
      // handle capture
      getVideoCapture(video, info)
        .then((base64) => {
          // The default screenshot size is the same as the video size
          if (!_options.width && !_options.height) {
            _options.width = info.videoWidth
            _options.height = info.videoHeight
          }
          handleImageFile(base64, options)
            .then((res) => {
              resolve({
                videoInfo: info,
                ...res,
              })
              // @ts-ignore
              video = null
            })
            .catch(reject)
        })
        .catch(reject)
    }
  })
}

function getVideoCapture(
  video: HTMLVideoElement,
  { currentTime, videoWidth, videoHeight }: VideoInfo
): Promise<string> {
  return new Promise((resolve) => {
    video.currentTime = currentTime
    // pause video
    video.pause()
    // mime type
    const mimeType = 'image/jpeg'
    // canvas
    const canvas = createElement<HTMLCanvasElement>('canvas')
    const ctx = canvas.getContext('2d')!

    canvas.width = videoWidth
    canvas.height = videoHeight

    setTimeout(() => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      resolve(canvas.toDataURL(mimeType))
    }, 500)
  })
}
