/**
 * Created by zx1984 9/9/2018
 * https://github.com/zx1984
 */
import broadcast from './broadcast'
import dom from './dom-core'
import calculator from './calculator'
import { toBlobData } from './convert'
import util from "./util";
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
      handleCrop(params, imgInfo)
    } else if (opts.width > 0 || opts.height > 0) {
      handleScale(opts, imgInfo)
    } else {
      imgInfo.data = _this.file
      imgInfo.base64 = base64
      // 直接返回
      broadcast.emit('success', imgInfo)
    }
  }).catch(err => {
    broadcast.emit('error', err)
  })
}

function handleCrop (params, info) {
  // 等比缩放
  let $el = handleScale({width: params.currentWidth}, info)
  let canvasParams = {
    sx: params.x,
    sy: params.y,
    sw: params.targetWidth,
    sh: params.targetHeight,
    dx: 0,
    dy: 0,
    dw: params.targetWidth,
    dh: params.targetHeight
  }
  lastStage($el, canvasParams, info.type, info)
}

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

function lastStage ($el, params, dataType, info) {
  const $canvas = dom.createCanvas($el, params)
  let base64 = $canvas.toDataURL(dataType)
  let data = toBlobData(base64, dataType)

  broadcast.emit('success', {
    code: 0,
    msg: 'Completed',
    element: $canvas,
    type: dataType,
    width: params.dw,
    height: params.dh,
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

// 处理图片数据
function handleImageData (imageInfo, isCrop, setWidth, setHeight, callback) {
  let dataType = imageInfo.type

  // 计算图片缩放或裁剪位置、尺寸
  let res = calculateCropInfo(imageInfo.width, imageInfo.height, isCrop, setWidth, setHeight)

  let canvas = imageInfo.element

  let scaling = 2;
  let sw = res.sw, sh = res.sh;
  let sx = res.sx, sy = res.sy;
  if (res.scaling > scaling) {
    scaling = res.scaling;
    do {
      canvas = createCanvas(canvas, {
        cw: res.cw * scaling,
        ch: res.ch * scaling,
        sx: sx,
        sy: sy,
        sw: sw,
        sh: sh
      });
      sw = canvas.width;
      sh = canvas.height;
      sx = sy = 0;
      scaling -= 1;
    } while (scaling > 2)
  }
  canvas = createCanvas(canvas, {
    cw: res.cw,
    ch: res.ch,
    sx: sx,
    sy: sy,
    sw: sw,
    sh: sh
  })

  let base64 = canvas.toDataURL(dataType)
  let data = toBlobData(base64, dataType)

  callback && callback({
    code: 0,
    msg: 'Completed',
    element: canvas,
    type: dataType,
    width: res.cw,
    height: res.ch,
    data: data,
    base64: base64,
    size: data.size,
    // 原始图片数据
    rawdata: imageInfo
  })
}


/**
 * 计算生成图片裁剪位置及尺寸
 * @param {Number} iw // 原图宽
 * @param {Number} ih // 原图高
 * @param {Object} callback 生成图片尺寸、坐标数据
 */
function calculateCropInfo (iw, ih, isCrop, width, height) {
  // 目标图片尺寸
  let targetWidth = util.int(width)
  let targetHeight = util.int(height)

  // 缩放比列
  let scaling = 1

  // 图片开始裁剪位置 x,y坐标
  let sx = 0, sy = 0
  // canvas 尺寸
  let canvasWidth = iw, canvasHieght = ih
  // 等比缩放后的图片尺寸
  let sw = 0, sh = 0

  // 裁剪图片代码 **********************************
  // 等比缩放到合适大小，在居中裁剪
  if (isCrop) {
    // canvas的尺寸即为裁剪设置尺寸
    canvasWidth = targetWidth
    canvasHieght = targetHeight

    // 按目标宽度调整图片尺寸：图片宽度 === 裁剪框宽
    sw = targetWidth
    sh = Math.floor(targetWidth * ih / iw)

    scaling = ratio(iw, targetWidth)

    // 图片高度超出裁剪框，能正常裁剪
    if (sh >= targetHeight) {
      sx = 0
      sy = util.int((sh - targetHeight) / 2 * scaling)
    }
    // 不满足裁剪需求，需重新缩放：图片高度 === 裁剪框高度
    else {
      scaling = ratio(ih, targetHeight)
      sw = Math.floor(targetHeight * iw / ih)
      sh = targetHeight
      sx = util.int((sw - targetWidth) / 2 * scaling)
      sy = 0
    }

  }
  // 缩放图片代码 **********************************
  // 只设置了宽度
  else if (targetWidth > 0) {
    scaling = ratio(iw, targetWidth)
    canvasWidth = targetWidth
    canvasHieght = Math.floor(targetWidth * ih / iw)
  }
  // 只设置了宽度
  else if (targetHeight > 0) {
    scaling = ratio(ih, targetHeight)
    canvasWidth = Math.floor(targetHeight * iw / ih)
    canvasHieght = targetHeight
  }

  return {
    sx: sx, // 裁剪开始x坐标
    sy: sy, // 裁剪开始y坐标
    sw: util.int(canvasWidth * scaling),
    sh: util.int(canvasHieght * scaling),
    scaling: scaling,
    dw: canvasWidth,
    dh: canvasHieght
  }
}
