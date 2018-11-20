/**
 * Created by Capricorncd.
 * User: https://github.com/capricorncd
 * Date: 2018/9/28 10:15
 */
import { document } from 'ssr-window'
import util from '../util'
import { handleImageFile } from './image'
/**
 * 文件处理
 * @param file
 * @param opts 缩略图裁剪参数
 * @return promise
 */
export function handleVideoFile (file, opts = {}) {
  let blobUrl = util.toBlobUrl(file)
  let $video = createVideo(blobUrl)
  return new Promise((resolve, reject) => {
    $video.onerror = function (err) {
      reject(err)
      $video = null
    }
    $video.oncanplay = function () {
      let info = {
        videoFile: file,
        videoWidth: $video.videoWidth,
        videoHeight: $video.videoHeight,
        duration: $video.duration
      }
      let { base64, err } = getVideoCapture($video)
      if (err) {
        reject(err)
        $video = null
        return
      }
      // 处理截图
      handleImageFile(base64, opts).then(res => {
        resolve(Object.assign({}, info, res))
      }).catch(err => {
        reject(err)
      })
      $video = null
    }
  })
}

/**
 * 视频截图
 * @param $video
 */
/**
 * 获取视频截图
 * @param $video
 * @param start 开始秒数
 */
function getVideoCapture ($video, start = 0) {
  // 暂停视频
  $video.pause()
  // 生成图片类型
  let dataType = 'image/jpeg'
  // 创建canvas
  let $canvas = document.createElement('canvas')
  let ctx = $canvas.getContext('2d')

  $canvas.width = $video.videoWidth
  $canvas.height = $video.videoHeight

  // ctx.drawImage(video, res.sx, res.sy, res.sw, res.sh, 0, 0, res.cw, res.ch)
  ctx.drawImage($video, 0, 0, $canvas.width, $canvas.height)

  // 图片数据
  let base64 = null
  let err = null
  // 视频文件和当前操作界面不在同一域，则会报错
  try {
    base64 = $canvas.toDataURL(dataType)
  } catch (e) {
    err = {
      code: 13,
      message: '截图失败，视频文件所在域与后台系统不同！',
      data: e
    }
  }
  return {
    base64,
    err
  }
}

/**
 * 创建视频
 * @param url
 * @returns {Element}
 */
function createVideo (url) {
  const $video = document.createElement('video')
  $video.src = url
  $video.autoplay = true
  return $video
}
