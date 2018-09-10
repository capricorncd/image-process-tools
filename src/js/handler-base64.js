/**
 * Created by zx1984 9/9/2018
 * https://github.com/zx1984
 */
import broadcast from './broadcast'
import dom from './dom-core'
import calculator from './calculator'
import { toBlobData } from './convert'
/**
 * 图片base64数据处理
 * @param _this ZxImageProcess
 * @param params 图片裁剪参数
 */
export function handerBase64 (_this, params) {
  let base64 = _this.base64
  let opts = _this.options
  // 预加载图片
  loadImage(base64, _this.file).then(imgInfo => {
    if (params) {
      // 裁剪
      handleCrop(params, imgInfo)
    } else if (opts.width > 0 || opts.height > 0) {
      // 等比缩放
      let $canvas = handleScale(opts, imgInfo)
      successHandler($canvas, imgInfo.type, imgInfo)
    } else {
      // 不处理图片尺寸
      imgInfo.data = _this.file
      imgInfo.base64 = base64
      // 直接返回
      broadcast.emit('success', imgInfo)
    }
  }).catch(err => {
    broadcast.emit('error', err)
  })
}

/**
 * 图片裁剪处理
 * @param params
 * @param info
 */
function handleCrop (params, info) {
  // 等比缩放
  let $el = handleScale({width: params.currentWidth}, info)
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
  successHandler($canvas, info.type, info)
}

/**
 * 图片等比缩放处理
 * @param opts
 * @param info
 * @returns {*}
 */
function handleScale (opts, info) {
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
 * successHandler
 * @param $canvas
 * @param dataType
 * @param info
 */
function successHandler ($canvas, dataType, info) {
  let base64 = $canvas.toDataURL(dataType)
  let data = toBlobData(base64, dataType)

  broadcast.emit('success', {
    element: $canvas,
    type: dataType,
    width: $canvas.width,
    height: $canvas.height,
    data: data,
    base64: base64,
    size: data.size,
    // 原始图片数据
    rawdata: info
  })
}

/**
 * load image
 * @param base64
 * @param file
 * @returns {Promise}
 */
function loadImage (base64, file) {
  const $img = new Image()
  // 创建图片
  $img.src = base64
  $img.setAttribute('alt', file.name)
  return new Promise((resolve, reject) => {
    // 加载图片
    $img.onload = function (e) {
      resolve({
        element: $img,
        width: $img.naturalWidth || $img.width,
        height: $img.naturalHeight || $img.height,
        type: file.type,
        size: file.size
      })
    }

    $img.onerror = function (e) {
      reject({
        code: 8,
        msg: 'Error of loading image data!'
      })
    }
  })
}
