/**
 * Created by Capricorncd.
 * User: https://github.com/capricorncd
 * Date: 2018/9/28 10:31
 */
import { document } from 'ssr-window'
import util from '../util'
import calculator from '../calculator'
import { manualCrop } from '../manual-crop/index'

/**
 * 图片文件或base64数据处理
 * @param file 图片文件或base64数据
 * @param opts 裁剪、处理参数
 * @return {Promise}
 */
export function handleImageFile (file, opts = {}) {
  return new Promise((resolve, reject) => {
    // base64数据
    if (/^data:(.+?);base64/.test(file)) {
      handleBase64(file, opts, resolve, reject)
    } else {
      readFile(file).then(base64 => {
        handleBase64(base64, opts, resolve, reject)
      }).catch(err => {
        reject(err)
      })
    }
  })
}

/**
 * 读取文件数据
 * @param file
 * @return {Promise}
 */
function readFile (file) {
  // 实例化FileReader
  const reader = new FileReader()
  // readAsDataURL方法用于读取指定Blob或File的内容。
  // 当读操作完成，readyState变为DONE, loadend被触发，
  // 此时result属性包含数据：URL以base64编码的字符串表示文件的数据。
  reader.readAsDataURL(file)
  return new Promise((resolve, reject) => {
    reader.onload = function () {
      resolve(this.result)
    }
    reader.onerror = function (err) {
      reject(err)
    }
  })
}

/**
 * 处理base64数据
 * @param base64 base64数据
 * @param opts 图片处理参数
 * @param resolve 成功回调
 * @param reject 错误回调
 */
function handleBase64 (base64, opts, resolve, reject) {
  const type = /^data:(.+?);base64/.test(base64) ? RegExp.$1 : 'image/jpeg'
  const blob = util.toBlobData(base64, type)
  const $img = createImage(base64)
  // onload
  $img.onload = function () {
    const info = {
      element: $img,
      base64,
      width: $img.naturalWidth || $img.width,
      height: $img.naturalHeight || $img.height,
      type: blob.type,
      size: blob.size,
      quality: opts.quality
    }
    // 是否裁剪图片
    const isCrop = opts.width > 0 && opts.height > 0
    // 自动裁剪或等比缩放
    if (opts.auto || !isCrop) {
      autoCropImage(info, opts, resolve)
    } else {
      manualCrop(info, opts, resolve, reject)
    }
  }
  // error
  $img.onerror = function (err) {
    reject(err)
  }
}

/**
 * 创建图片对象
 * @param url
 * @return {Element}
 */
function createImage (url) {
  const $image = document.createElement('img')
  $image.src = url
  return $image
}

/**
 * 自动裁剪或等比缩放图片
 * @param info 图片数据及参数
 * @param opts 裁剪缩放参数
 * @param resolve 回调函数
 */
function autoCropImage (info, opts, resolve) {
  let $canvas, scaling, sw, sh, sx, sy
  // 计算图片缩放或裁剪位置、尺寸
  const clipInfo = calculator.autoCropInfo(info.width, info.height, opts)
  // App.log(clipInfo)
  $canvas = info.element
  scaling = 2
  sw = clipInfo.sw
  sh = clipInfo.sh
  sx = clipInfo.sx
  sy = clipInfo.sy
  if (clipInfo.scaling > scaling) {
    scaling = clipInfo.scaling
    do {
      $canvas = createCanvas($canvas, {
        cw: clipInfo.cw * scaling,
        ch: clipInfo.ch * scaling,
        sx: sx,
        sy: sy,
        sw: sw,
        sh: sh
      })
      sw = $canvas.width
      sh = $canvas.height
      sx = sy = 0
      scaling -= 1
    } while (scaling > 2)
  }
  $canvas = createCanvas($canvas, {
    cw: clipInfo.cw,
    ch: clipInfo.ch,
    sx: sx,
    sy: sy,
    sw: sw,
    sh: sh
  })

  const base64 = $canvas.toDataURL(info.type, info.quality)
  const blob = util.toBlobData(base64, info.type)

  resolve({
    element: $canvas,
    type: blob.type,
    width: clipInfo.cw,
    height: clipInfo.ch,
    blob,
    url: util.toBlobUrl(blob),
    base64,
    size: blob.size,
    // 原始图片数据
    raw: info
  })
}

/**
 * 创建Canvas
 * @param elm Image对象或Canvas元素
 * @param p 裁剪参数
 * @returns {Element}
 */
function createCanvas (elm, p) {
  const $canvas = document.createElement('canvas')
  $canvas.width = p.cw
  $canvas.height = p.ch
  const ctx = $canvas.getContext('2d')
  ctx.drawImage(elm, p.sx, p.sy, p.sw, p.sh, 0, 0, $canvas.width, $canvas.height)
  return $canvas
}
