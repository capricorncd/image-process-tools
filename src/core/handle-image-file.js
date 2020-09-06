/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-06 11:31
 */
import { base64ToBlob, createCanvas, createElement, hasOwn, isObject, readFile, toBlobUrl } from '../utils'
import DEFAULT_OPTIONS from '../constants/options'

/**
 * handle image file
 * @param file
 * @param options
 * @returns {Promise<unknown>}
 */
export function handleImageFile(file, options) {
  return new Promise((resolve, reject) => {
    options = {
      ...DEFAULT_OPTIONS,
      ...options
    }
    // base64
    if (/^data:(.+?);base64/.test(file)) {
      handleImageBase64(file, options, resolve, reject)
    }
    // file
    else {
      readFile(file).then(base64 => {
        handleImageBase64(base64, options, resolve, reject)
      }).catch(reject)
    }
  })
}

/**
 * handle image base64 data
 * @param base64
 * @param options
 * @param resolve
 * @param reject
 */
function handleImageBase64(base64, options, resolve, reject) {
  const blob = base64ToBlob(base64, options.mimeType)
  const img = createElement('img')
  img.onload = function () {
    const raw = {
      element: img,
      base64,
      width: img.naturalWidth || img.width,
      height: img.naturalHeight || img.height,
      type: blob.type,
      size: blob.size
    }
    if (options.width > 0 && options.height > 0) {
      cropImage(raw, options, resolve, reject)
    } else if (options.width > 0 || options.height > 0) {
      proportionalZoom(raw, options, resolve, reject)
    } else {
      resolve({ ...raw, raw })
    }
  }
  img.onerror = reject
  img.src = base64
}

function cropImage(raw, options, resolve, reject) {
  try {
    const cropInfo = isObject(options.cropInfo)
      ? {
        ...options.cropInfo,
        dx: 0,
        dy: 0,
        dw: options.width,
        dh: options.height
      }
      : initCropInfo(raw, options)
    // check enableDevicePixelRatio
    if (!hasOwn(cropInfo, 'enableDevicePixelRatio')) {
      cropInfo.enableDevicePixelRatio = options.enableDevicePixelRatio
    }
    const el = createCanvas(raw.element, {
      enableDevicePixelRatio: options.enableDevicePixelRatio,
      sx: cropInfo.sx,
      sy: cropInfo.sy,
      sw: cropInfo.sw,
      sh: cropInfo.sh,
      dx: 0,
      dy: 0,
      dw: cropInfo.sw,
      dh: cropInfo.sh
    })
    imageProcess(el, raw, options, {
      ...cropInfo,
      sx: 0,
      sy: 0,
      sw: el.width,
      sh: el.height
    }, resolve)
  } catch (err) {
    reject(err)
  }
}

/**
 * proportional zoom image
 * @param raw
 * @param options
 * @param resolve
 * @param reject
 */
function proportionalZoom(raw, options, resolve, reject) {
  try {
    const cropInfo = {
      enableDevicePixelRatio: options.enableDevicePixelRatio,
      sx: 0,
      sy: 0,
      sw: raw.width,
      sh: raw.height,
      dx: 0,
      dy: 0,
      dw: options.width,
      dh: options.height
    }
    if (options.width > 0) {
      // The original image width is smaller than the target cropping width,
      // and don't force the image width
      if (raw.width <= options.width && !options.isForce) {
        resolve({ ...raw, raw })
        return
      }
      cropInfo.dh = raw.height * options.width / raw.width
      options.height = cropInfo.dh
    } else {
      // The original image height is smaller than the target cropping height,
      // and don't force the image height
      if (raw.height <= options.height && !options.isForce) {
        resolve({ ...raw, raw })
        return
      }
      cropInfo.dw = raw.width * options.height / raw.height
      options.width = cropInfo.dw
    }

    imageProcess(raw.element, raw, options, cropInfo, resolve)
  } catch (err) {
    reject(err)
  }
}

function imageProcess(el, raw, options, cropInfo, resolve) {
  let nextScalePx = raw.width > raw.height ? raw.width - cropInfo.dw : raw.height - cropInfo.dh
  if (nextScalePx > options.perResize) {
    const radio = raw.height / raw.width
    while (nextScalePx > options.perResize) {
      nextScalePx -= options.perResize
      // There is a problem with getting the EL width and height value here
      cropInfo.sw = el.width
      cropInfo.sh = el.height
      cropInfo.dw = options.width + nextScalePx
      cropInfo.dh = cropInfo.dw * radio
      el = createCanvas(el, cropInfo)
    }
    cropInfo.sw = el.width
    cropInfo.sh = el.height
    cropInfo.dw = options.width
    cropInfo.dh = options.height
  }

  const canvas = createCanvas(el, cropInfo)
  const mineType = options.mimeType
  const base64 = canvas.toDataURL(mineType, options.quality)
  const blob = base64ToBlob(base64, mineType)

  resolve({
    element: canvas,
    type: mineType,
    width: canvas.width,
    height: canvas.height,
    blob: blob,
    data: blob,
    url: toBlobUrl(blob),
    base64,
    size: blob.size,
    raw
  })
}

function initCropInfo(raw, options) {
  const { width: rw, height: rh } = raw
  const { width, height } = options
  let cropInfo
  const tempWidth = rh * width / height
  if (rw > tempWidth) {
    cropInfo = {
      sx: (rw - tempWidth) / 2,
      sy: 0,
      sw: tempWidth,
      sh: rh
    }
  } else {
    const tempHeight = rw * height / width
    cropInfo = {
      sx: 0,
      sy: (rh - tempHeight) / 2,
      sw: rw,
      sh: tempHeight
    }
  }
  return {
    ...cropInfo,
    dx: 0,
    dy: 0,
    dw: width,
    dh: height
  }
}
