/**
 * Created by Capricorncd
 * https://github.com/capricorncd
 * 2018-10-02 22:48
 */
import CropClass from './crop-class'
import broadcast from '../broadcast'
import calculator from '../calculator'
import dom from '../dom-core'
import util from '../util'
// crop class
let cropClass = null
/**
 * 手动裁剪图片
 * @param info 原始图片数据
 * @param opts 图片裁剪参数
 * @param resolve 成功回调
 * @param reject 失败回调
 */
export function manualCrop (info, opts, resolve, reject) {
  // clipping is cancelled
  broadcast.on('crop-cancel', _ => {
    reject({
      code: 22,
      message: 'Clipping is cancelled'
    })
    broadcast.off('crop-submit')
    broadcast.off('crop-cancel')
  })
  // clipping is submited
  broadcast.on('crop-submit', res => {
    handleCrop(info, res, resolve)
    broadcast.off('crop-submit')
    broadcast.off('crop-cancel')
  })

  // 实例化CropClass
  if (cropClass === null) {
    cropClass = new CropClass(opts)
  } else {
    cropClass.initCropBosPosition(opts)
  }
  cropClass.setImageSrc(info.base64)
}

/**
 * 图片裁剪处理
 * @param params
 * @param info
 */
function handleCrop (info, params, resolve) {
  let $el
  // 旋转图片
  if (params.angle > 0) {
    $el = rotateImage(info.element, params.angle)
    info.width = params.naturalWidth
    info.height = params.naturalHeight
    info.element = $el
  }
  // 等比缩放
  $el = handleScale(info, {width: params.currentWidth})
  const $canvas = dom.createCanvas($el, {
    sx: params.x,
    sy: params.y,
    sw: params.targetWidth,
    sh: params.targetHeight,
    dx: 0,
    dy: 0,
    dw: params.targetWidth,
    dh: params.targetHeight
  })
  let dataType = info.type
  let base64 = $canvas.toDataURL(dataType)
  let blob = util.toBlobData(base64, dataType)

  resolve && resolve({
    element: $canvas,
    type: dataType,
    width: $canvas.width,
    height: $canvas.height,
    blob: blob,
    data: blob,
    url: util.toBlobUrl(blob),
    base64: base64,
    size: blob.size,
    // 原始图片数据
    raw: info
  })
}

/**
 * 图片等比缩放处理
 * @param info
 * @param opts
 * @returns {*}
 */
function handleScale (info, opts) {
  let res = calculator.scaleInfo(opts, info)
  // image/canvas 元素
  let $el = info.element
  // 缩放比例
  let scaling
  let sw = res.sw,
    sh = res.sh
  // 逐级缩放，防止出现像素锯齿
  if (res.scaling > 2) {
    scaling = res.scaling
    do {
      $el = dom.createCanvas($el, {
        dx: 0,
        dy: 0,
        dw: res.dw * scaling,
        dh: res.dh * scaling,
        sx: 0,
        sy: 0,
        sw: sw,
        sh: sh
      })
      sw = res.dw * scaling
      sh = res.dh * scaling
      scaling -= 1
    } while (scaling > 2)
  }
  $el = dom.createCanvas($el, {
    dx: 0,
    dy: 0,
    dw: res.dw,
    dh: res.dh,
    sx: 0,
    sy: 0,
    sw: sw,
    sh: sh
  })
  return $el
}

/**
 * 旋转图片
 * @param $img
 * @param angle
 * @returns {Element}
 */
function rotateImage ($img, angle) {
  const $canvas = document.createElement('canvas')
  const ctx = $canvas.getContext('2d')
  let imgWidth = $img.width
  let imgHeight = $img.height
  $canvas.width = imgWidth
  $canvas.height = imgHeight
  switch(angle) {
    // 旋转90度
    case 90:
      $canvas.width = imgHeight
      $canvas.height = imgWidth
      ctx.rotate(Math.PI / 2)
      // (0, -imgHeight) 从旋转原理图那里获得的起始点
      ctx.drawImage($img, 0, -imgHeight, imgWidth, imgHeight)
      break
    // 旋转180度
    case 180:
      ctx.rotate(Math.PI)
      ctx.drawImage($img, -imgWidth, -imgHeight, imgWidth, imgHeight)
      break;
    case 270:     // 旋转-90(270)度
      $canvas.width = imgHeight
      $canvas.height = imgWidth
      ctx.rotate(3 * Math.PI / 2)
      ctx.drawImage($img, -imgWidth, 0, imgWidth, imgHeight)
      break
    default:
      ctx.drawImage($img, 0, 0, imgWidth, imgHeight)
  }
  return $canvas
}
